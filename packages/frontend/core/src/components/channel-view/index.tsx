import { Suspense, useEffect } from 'react';
import { MESSAGE_ACTION, storeAtom, useGetMessages } from './zulip-manager';
import ChannelHeader from './channel-header';
import CreatePost from './create-post/create-post';
import PostView from './post-view';
import { useAtom } from 'jotai';
import { Skeleton } from '@affine/component';

const ChannelView = () => {
  const { data, error, isLoading } = useGetMessages();
  const [_, dispatch] = useAtom(storeAtom);
  console.log('##re render channel view');
  useEffect(() => {
    dispatch({
      type: MESSAGE_ACTION.GET_MESSAGES,
      messages: data || [],
    });
  }, []);

  const render = () => {
    if (error) return <div>Something went wrong</div>;
    if (isLoading)
      return <Skeleton variant="rectangular" width={'80%'} height={'5%'} />;
    return (
      // <Provider store={myStore}>
      <Suspense
        fallback={
          <Skeleton variant="rectangular" width={'80%'} height={'5%'} />
        }
      >
        <div
          // ref={this.channelViewRef}
          id="app-content"
          className="app__content app__body"
        >
          <ChannelHeader />
          <PostView />
          <CreatePost />
        </div>
      </Suspense>
      // </Provider>
    );
  };
  return render();
};
export default ChannelView;
