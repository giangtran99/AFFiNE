import events from './resources/events';
import queues from './resources/queues';

function sleep(ms) {
  // TODO add jitter.
  return new Promise(resolve => setTimeout(resolve, ms));
}

function eventsWrapper(config) {
  const z = {
    queues: queues(config),
    events: events(config),
  };

  function logError(error) {
    console.log('zulip-js: Error while communicating with server:', error); // eslint-disable-line no-console
  }

  async function registerQueue(params) {
    let res;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        res = await z.queues.register(params); // eslint-disable-line no-await-in-loop
        if (res.result === 'error') {
          logError(res.msg);
          await sleep(1000); // eslint-disable-line no-await-in-loop
        } else {
          return {
            queueId: res.queue_id,
            lastEventId: res.last_event_id,
          };
        }
      } catch (e) {
        logError(e);
      }
    }
  }

  async function callOnEachEvent(callback, params, callbackQueueId) {
    let queueId = null;
    let lastEventId = -1;

    const handleEvent = event => {
      lastEventId = Math.max(lastEventId, event.id);
      callback(event);
    };
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (!queueId) {
        const queueData = await registerQueue(params); // eslint-disable-line no-await-in-loop
        queueId = queueData.queueId;
        lastEventId = queueData.lastEventId;
      }
      try {
        callbackQueueId(queueId);
        // eslint-disable-next-line no-await-in-loop
        const res = await z.events.retrieve({
          queue_id: queueId,
          last_event_id: lastEventId,
          dont_block: false,
          client_gravatar: true,
          slim_presence: true,
        });
        if (res.events) {
          res.events.forEach(handleEvent);
        }
      } catch (e) {
        logError(e);
      }
      await sleep(1000); // eslint-disable-line no-await-in-loop
    }
  }

  return callOnEachEvent;
}

export default eventsWrapper;
