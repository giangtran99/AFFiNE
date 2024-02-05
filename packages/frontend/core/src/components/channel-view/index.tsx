import ChannelHeader from './channel-header';
import CreatePost from './create-post/create-post';
import PostView from './post-view';

const ChannelView = () => {
  return (
    <div
      // ref={this.channelViewRef}
      id="app-content"
      className="app__content app__body"
    >
      <ChannelHeader />
      <PostView />
      <CreatePost />
    </div>
  );
};
export default ChannelView;
