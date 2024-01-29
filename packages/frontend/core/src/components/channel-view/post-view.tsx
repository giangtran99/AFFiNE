import { Avatar } from '@affine/component/ui/avatar';
// import ReactionList from './reaction-list';
/* eslint-disable max-lines */
import { DynamicSizeList } from 'dynamic-virtualized-list';
import { useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

import MessageWithAdditionalContent from './post-list/message-with-additional-content';
// import PostOptions from './post-options';
import PostTime from './post-time';
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

  const renderRow = ({
    /*data, itemId,*/ style,
  }: {
    data: string[];
    itemId: string;
    style: Record<string, string>;
  }) => {
    return (
      <div style={style} className="post-row__padding top">
        <PostListRow />
      </div>
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
                  itemData={['1', '2', '3']}
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

const PostListRow = () => {
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
              url="blob:https://www.facebook.com/f0ba2632-fe3e-4c48-b39a-2c17dd616401"
              size={30}
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
                  aria-label={'giangth'}
                  className="user-popover style--none"
                  // style={userStyle}
                >
                  {'giangth'}
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
              <MessageWithAdditionalContent post={'post'} />
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
