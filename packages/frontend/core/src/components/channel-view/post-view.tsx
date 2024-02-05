import { Avatar } from '@affine/component/ui/avatar';
// import ReactionList from './reaction-list';
/* eslint-disable max-lines */
import { DynamicSizeList } from './dynamic-size-list';
import { useMemo, useEffect, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

import MessageWithAdditionalContent from './post-list/message-with-additional-content';
// import PostOptions from './post-options';
import PostTime from './post-time';
import zulipInit from '@affine/core/zulip-js';

export const PostListRowListIds = {
  // DATE_LINE: PostListUtils.DATE_LINE,
  // START_OF_NEW_MESSAGES: PostListUtils.START_OF_NEW_MESSAGES,
  CHANNEL_INTRO_MESSAGE: 'CHANNEL_INTRO_MESSAGE',
  OLDER_MESSAGES_LOADER: 'OLDER_MESSAGES_LOADER',
  NEWER_MESSAGES_LOADER: 'NEWER_MESSAGES_LOADER',
  LOAD_OLDER_MESSAGES_TRIGGER: 'LOAD_OLDER_MESSAGES_TRIGGER',
  LOAD_NEWER_MESSAGES_TRIGGER: 'LOAD_NEWER_MESSAGES_TRIGGER',
};

const PostView = () => {
  return (
    <div id="post-list" role="main">
      <div className="post-list-holder-by-time">
        <div className="post-list__table">
          <div id="virtualizedPostListContent" className="post-list__content">
            <PostList />
          </div>
        </div>
      </div>
    </div>
  );
};

const dynamicListStyle = {
  willChange: 'transform',
};
const virtListStyles = {
  position: 'absolute',
  bottom: '0',
  maxHeight: '100%',
};

const OVERSCAN_COUNT_BACKWARD = 80;
const OVERSCAN_COUNT_FORWARD = 80;

const PostList = () => {
  const listRef = useRef() as any;
  const postListRef = useRef() as any;
  const [messagesMap, setMessagesMap] = useState({}) as any;
  const [queueId, setQueueId] = useState() as any;
  const [scrollIsBottom, setScrollIsBottom] = useState(true);
  useEffect(() => {
    (async () => {
      const zulipClient = await zulipInit();
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
      const response = await zulipClient.messages.retrieve(readParams);
      const messagesMap = {} as any;
      response.messages.map((message: any) => {
        messagesMap[message.id] = message;
      });
      setMessagesMap(messagesMap);
      const params = {
        event_types: ['message'],
        apply_markdown: 'true',
        sender_apply_raw_content: ['VietISComtor'],
        client_gravatar: 'true',
        slim_presence: 'true',
      };
      await zulipClient.callOnEachEvent((event: any) => {
        handleEvent(event);
      }, params);
    })();

    return () => {
      // (async () => {
      //   const client = await zulipInit();
      //   // Register a queue
      //   // Delete a queue
      //   const deregisterParams = {
      //     queue_id: queueId,
      //   };
      //   console.log(await client.queues.deregister(deregisterParams));
      // })()
      // Your component will unmount logic here
      console.log('Component is unmounted');
      // Perform any cleanup or additional actions here
    };
  }, []);

  const handleEvent = (event: any) => {
    switch (event.type) {
      case 'stream':
        break;
      case 'message':
        setMessagesMap((oldMessagesMap: any) => ({
          ...oldMessagesMap,
          [event.message.id]: event.message,
        }));
        break;
      case 'heartbeat':
        setQueueId(event.queue_id);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (scrollIsBottom) {
      listRef.current?.scrollToItem(0, 'end');
    }
  }, [Object.keys(messagesMap).length]);

  const renderRow = ({
    /*data,*/ itemId,
    style,
  }: {
    data: string[];
    itemId: string;
    style: Record<string, string>;
  }) => {
    return (
      <div key={itemId} style={style} className="post-row__padding top">
        <PostListRow message={messagesMap[itemId]} />
      </div>
    );
  };

  const initScrollToIndex = () => {
    return {
      index: 0,
      position: 'center',
    };
  };

  const onScroll = ({
    scrollDirection,
    scrollOffset,
    scrollUpdateWasRequested,
    clientHeight,
    scrollHeight,
  }: {
    scrollDirection: string;
    scrollOffset: number;
    scrollUpdateWasRequested: boolean;
    clientHeight: number;
    scrollHeight: number;
  }) => {
    console.log(
      '##scrollOffset + clientHeight',
      scrollOffset,
      clientHeight,
      scrollHeight
    );
    setScrollIsBottom(
      scrollOffset + clientHeight >= scrollHeight - 1 &&
        scrollOffset + clientHeight <= scrollHeight + 1
    );
  };

  return (
    <div className="post-list-holder-by-time" key={'postlist-' + 'channelId'}>
      <div className="post-list__table">
        <div id="postListContent" className="post-list__content">
          <AutoSizer>
            {({ height, width }) => (
              <DynamicSizeList
                ref={listRef}
                height={height}
                width={width}
                className="post-list__dynamic"
                itemData={Object.keys(messagesMap)}
                overscanCountForward={OVERSCAN_COUNT_FORWARD}
                overscanCountBackward={OVERSCAN_COUNT_BACKWARD}
                onScroll={onScroll}
                initScrollToIndex={initScrollToIndex}
                canLoadMorePosts={() => {}}
                innerRef={postListRef}
                style={{ ...virtListStyles, ...dynamicListStyle }}
                // innerListStyle={postListStyle}
                initRangeToRender={[0, 50]}
                // loaderId={PostListRowListIds.NEWER_MESSAGES_LOADER}
                // correctScrollToBottom={true}
                // onItemsRendered={this.onItemsRendered}
                // scrollToFailed={this.scrollToFailed}
              >
                {renderRow}
              </DynamicSizeList>
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  );
};

const PostListRow = (props: any) => {
  const { avatar_url, content, sender_full_name } = props.message;
  return (
    <div
      role="application"
      className={`post__content center`}
      data-testid="postContent"
    >
      <div className="post">
        <div
          role="application"
          className={`post__content center`}
          data-testid="postContent"
        >
          <div className="post__img">
            <Avatar className="avatar" url={avatar_url} size={32} />
          </div>
          <div>
            <div
              className="post__header"
              // ref={postHeaderRef}
            >
              <div className="col col__name">
                <button
                  style={{ fontWeight: 600 }}
                  aria-label={sender_full_name}
                  className="user-popover style--none"
                  // style={userStyle}
                >
                  {sender_full_name}
                </button>
              </div>

              <div className="col d-flex align-items-center">
                <PostTime />

                {/* {visibleMessage} */}
              </div>
              {/* {!'props.isPostBeingEdited' && (
                <PostOptions
                // {...props}
                // teamId={teamId}
                // handleDropdownOpened={handleDropdownOpened}
                // handleCommentClick={handleCommentClick}
                // hover={hover || a11yActive}
                // removePost={props.actions.removePost}
                // handleJumpClick={handleJumpClick}
                // isPostHeaderVisible={getPostHeaderVisible()}
                />
              )} */}
            </div>
            <div className={'post__body'} id={`${'post.id'}_message`}>
              <MessageWithAdditionalContent content={content} post={'post'} />
              {/* {post.file_ids && post.file_ids.length > 0 &&
                  <FileAttachmentListContainer
                    post={post}
                    compactDisplay={props.compactDisplay}
                    handleFileDropdownOpened={handleFileDropdownOpened}
                  />
                } */}
              <div className="post__body-reactions-acks">
                {/* {props.isPostAcknowledgementsEnabled && post.metadata?.priority?.requested_ack && (
                    <PostAcknowledgements
                      authorId={post.user_id}
                      isDeleted={post.state === Posts.POST_DELETED}
                      postId={post.id}
                    />
                  )} */}
                {/* {"showReactions" && <ReactionList post={"post"} />} */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="post__img">
\          </div>
          <div>
            <div
              className="post__header"
            // ref={postHeaderRef}
            >
              <div className="col col__name">{'username'}</div>
              <div className="col d-flex align-items-center">
                <PostTime />
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default PostView;
