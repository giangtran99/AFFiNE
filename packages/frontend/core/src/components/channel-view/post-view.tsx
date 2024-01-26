import { Avatar } from '@affine/component';

import PostTime from './post-time';

const PostView = () => {
  return (
    <PostList />
  );
};

const PostList = () => {
  const renderRow = () => {
    return <PostListRow />;
  };

  return <>{renderRow()}</>;
};

const PostListRow = () => {
  return (
    <div
        role="application"
        className={`post__content center}`}
        data-testid="postContent"
      >
        <div className="post__img">
          <Avatar url="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/800px-ChatGPT_logo.svg.png" />
        </div>
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
        </div>
      </div>
  );
};

export default PostView;
