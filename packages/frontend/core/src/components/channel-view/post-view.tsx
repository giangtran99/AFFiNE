// import ReactionList from './reaction-list';
/* eslint-disable max-lines */
import { DynamicSizeList } from './dynamic-size-list';
import Avatar from './avatar';
import { useEffect, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useAtom } from 'jotai';
import MessageWithAdditionalContent from './post-list/message-with-additional-content';
// import PostOptions from './post-options';
import PostTime from './post-time';
import {
  EVENT_TYPE,
  MESSAGE_ACTION,
  storeAtom,
  useListenNewEvent,
} from './zulip-manager';

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

const postListStyle = {
  padding: '14px 0px 7px',
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
  const { listenEvent, removeListenEvent } = useListenNewEvent();
  const [messages, dispatch] = useAtom(storeAtom);
  useEffect(() => {
    listenEvent((event: any) => {
      // cause flicker
      if (event.type === EVENT_TYPE.MESSAGE) {
        dispatch({
          type: MESSAGE_ACTION.ADD_NEW_MESSAGE,
          message: event.message,
        });
      }
    });
    return () => {
      removeListenEvent();
    };
  }, []);

  const renderRow = ({
    /*data,*/
    itemId,
    style,
  }: {
    data: string[];
    itemId: string;
    style: Record<string, string>;
  }) => {
    return (
      <div style={style} className="post-row__padding top">
        <PostListRow message={messages.data?.[itemId]} />
      </div>
    );
  };

  const initScrollToIndex = () => {
    return {
      index: 0,
      position: 'center',
    };
  };

  const render = () => {
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
                  itemData={messages.keys}
                  overscanCountForward={OVERSCAN_COUNT_FORWARD}
                  overscanCountBackward={OVERSCAN_COUNT_BACKWARD}
                  // onScroll={onScroll}
                  initScrollToIndex={initScrollToIndex}
                  canLoadMorePosts={() => {}}
                  innerRef={postListRef}
                  style={{ ...virtListStyles, ...dynamicListStyle }}
                  innerListStyle={postListStyle}
                  initRangeToRender={[0, messages.length - 1]}
                  loaderId={messages.keys[messages.length - 1]}
                  correctScrollToBottom={true}
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
  return render();
};

const PostListRow = (props: any) => {
  const { avatar_url, content, sender_full_name, timestamp } = props.message;
  console.log('##lai di', props.message);
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
            <Avatar
              username={sender_full_name}
              size={'md'}
              url={avatar_url}
              tabIndex={-1}
            />
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
                <PostTime timestamp={timestamp} />

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
