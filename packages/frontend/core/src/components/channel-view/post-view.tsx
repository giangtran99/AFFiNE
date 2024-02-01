import { Avatar } from '@affine/component/ui/avatar';
// import ReactionList from './reaction-list';
/* eslint-disable max-lines */
import { DynamicSizeList } from 'dynamic-virtualized-list';
import { useEffect, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

import MessageWithAdditionalContent from './post-list/message-with-additional-content';
// import PostOptions from './post-options';
import PostTime from './post-time';
// import zulipInit from '@affine/core/zulip-js/src';

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

const PostList = () => {
  const dynamicListStyle = {
    willChange: 'transform',
  };
  const virtListStyles = {
    position: 'absolute',
    bottom: '0',
    maxHeight: '100%',
  };
  const listRef = useRef();
  const postListRef = useRef();
  const [messagesMap, setMessagesMap] = useState({}) as any;
  setMessagesMap([]);
  useEffect(() => {
    // (async () => {
    //   const zulipClient = await zulipInit();
    //   const readParams = {
    //     anchor: 'newest',
    //     num_before: 100,
    //     num_after: 0,
    //     apply_markdown: true,
    //     sender_apply_raw_content: JSON.stringify(['VietISComtor']),
    //     narrow: [
    //       // {operator: "sender", operand: "iago@zulip.com"},
    //       { operator: 'stream', operand: 'design' },
    //       { operator: 'topic', operand: 'wifi' },
    //     ],
    //   };
    //   const response = await zulipClient.messages.retrieve(readParams);
    //   const messagesMap = {} as any;
    //   response.messages.map((message: any) => {
    //     messagesMap[message.id] = message;
    //   });
    //   setMessagesMap(messagesMap);
    //   const params = {
    //     event_types: ['message'],
    //     apply_markdown: 'true',
    //     sender_apply_raw_content: ['VietISComtor'],
    //     client_gravatar: 'true',
    //   };
    //   await zulipClient.callOnEachEvent((event: any) => {
    //     if (event.type !== 'message') return;
    //     setMessagesMap({
    //       ...messagesMap,
    //       [`${event.message.id}`]: event.message,
    //     });
    //   }, params);
    // })();
  }, []);
  console.log('##messageId', messagesMap);

  const renderRow = ({
    /*data, itemId,*/ style,
  }: {
    data: string[];
    itemId: string;
    style: Record<string, string>;
  }) => {
    console.log('##messageId in render', messagesMap);
    return (
      <>
        {Object.keys(messagesMap).map(messageId => (
          <div key={messageId} style={style} className="post-row__padding top">
            <PostListRow message={messagesMap[messageId]} />
          </div>
        ))}
      </>
    );
  };

  const initScrollToIndex = () => {
    return {
      index: 2,
      position: 'center',
    };
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
                itemData={[1, 2, 3]}
                // overscanCountForward={OVERSCAN_COUNT_FORWARD}
                // overscanCountBackward={OVERSCAN_COUNT_BACKWARD}
                // onScroll={this.onScroll}
                initScrollToIndex={initScrollToIndex}
                canLoadMorePosts={() => {}}
                innerRef={postListRef}
                style={{ ...virtListStyles, ...dynamicListStyle }}
                // innerListStyle={postListStyle}
                initRangeToRender={[0, 50]}
                loaderId={PostListRowListIds.OLDER_MESSAGES_LOADER}
                // correctScrollToBottom={this.props.atLatestPost}
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
            <Avatar url={props.message.avatar_url} size={30} />
          </div>
          <div>
            <div
              className="post__header"
              // ref={postHeaderRef}
            >
              <div className="col col__name">
                <button
                  style={{ fontWeight: 600 }}
                  aria-label={props.message.sender_full_name}
                  className="user-popover style--none"
                  // style={userStyle}
                >
                  {props.message.sender_full_name}
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
              <MessageWithAdditionalContent
                content={props.message.content}
                post={'post'}
              />
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
