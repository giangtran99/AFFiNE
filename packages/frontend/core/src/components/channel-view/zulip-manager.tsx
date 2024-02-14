import { atom } from 'jotai';
import zulipInit from '@affine/core/zulip-js';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import { atomWithStore } from 'jotai-redux';
import { createStore } from 'redux';

const zulipManager = atom(async () => {
  const zulipClient = await zulipInit();
  return zulipClient;
});

export const MESSAGE_ACTION = {
  ADD_NEW_MESSAGE: 'ADD_NEW_MESSAGE',
  GET_MESSAGES: 'GET_MESSAGES',
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case MESSAGE_ACTION.ADD_NEW_MESSAGE:
      const newMessages = {
        ...state.data,
        [action.message.id]: action.message,
      };
      const newKeys = Object.keys(newMessages);
      const newLength = newKeys.length;
      return {
        data: newMessages,
        length: newLength,
        keys: newKeys,
      };
    case MESSAGE_ACTION.GET_MESSAGES:
      const messages = {} as any;
      action.messages.map((message: any) => {
        messages[message.id] = message;
      });
      return {
        data: messages,
        length: action.messages.length,
        keys: Object.keys(messages),
      };
    default:
      return {
        data: [],
        length: 0,
        keys: [],
      };
  }
}

const myStore = createStore(reducer);
export const storeAtom = atomWithStore(myStore);

export const messagesAtom = atom({
  data: [],
  length: 0,
  keys: [],
} as any);

export const useGetMessages = () => {
  const [zulipClient] = useAtom(zulipManager); // This is fine
  const { data, ...args } = useSWR(
    zulipClient ? ['messages', 'retrieve'] : null,
    ([model, methodName]) => {
      const readParams = {
        anchor: 'newest',
        num_before: 20,
        num_after: 20,
        apply_markdown: true,
        sender_apply_raw_content: JSON.stringify(['VietISComtor']),
        narrow: [
          // {operator: "sender", operand: "iago@zulip.com"},
          { operator: 'stream', operand: 'design' },
          { operator: 'topic', operand: 'wifi' },
        ],
      };
      return zulipClient[model][methodName](readParams);
    },
    { suspense: true }
  );

  return { data: data.messages, ...args };
};

export const EVENT_TYPE = {
  STREAM: 'stream',
  MESSAGE: 'message',
  HEART_BEAT: 'heart_beat',
};

const queueIdsAtom = atom({});
export const useListenNewEvent = () => {
  const [zulipClient] = useAtom(zulipManager); // This is fine
  const [queueIdsMap, setQueueIdsMap] = useAtom(queueIdsAtom) as any;
  const params = {
    // event_types: [EVENT_TYPE.MESSAGE],
    apply_markdown: 'true',
    sender_apply_raw_content: ['VietISComtor'],
    client_gravatar: 'true',
    slim_presence: 'true',
  };

  const listenEvent = (callback: any) => {
    zulipClient.callOnEachEvent(
      (event: any) => {
        callback(event);
        // dispatch({ type: MESSAGE_ACTION.ADD_NEW_MESSAGE })
      },
      params,
      (queueId: any) => {
        setQueueIdsMap({ ...queueIdsMap, [queueId]: null });
      }
    );
  };
  const removeListenEvent = () => {
    // let promises = Object.keys(queueIdsMap).map(queueId => {
    //     if (queueId) {
    //         const deregisterParams = {
    //             queue_id: queueId,
    //         };
    //         return zulipClient.queues.deregister(deregisterParams);
    //     }
    // })
    // Promise.all(promises)
  };
  return { listenEvent, removeListenEvent };
};

export const useSendMessage = () => {
  const [zulipClient] = useAtom(zulipManager); // This is fine
  const sendMessage = async (message: any) => {
    let params = {
      to: [8],
      type: 'stream',
      topic: 'wifi',
      content: message,
    };
    console.log(await zulipClient.messages.send(params));
  };
  return { sendMessage };
};
