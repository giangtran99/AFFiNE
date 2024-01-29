import PostBodyAdditionalContent from './post-body-with-additional-content';
import PostMessageView from './post-message-view';

const MessageWithAdditionalContent = () => {
  const messageWrapper = <PostMessageView post={'post'} />;
  return (
    <PostBodyAdditionalContent>{messageWrapper}</PostBodyAdditionalContent>
  );
};

export default MessageWithAdditionalContent;
