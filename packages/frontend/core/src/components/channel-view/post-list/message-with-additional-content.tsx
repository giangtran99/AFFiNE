import PostBodyAdditionalContent from './post-body-with-additional-content';
import PostMessageView from './post-message-view';

const MessageWithAdditionalContent = (props: any) => {
  const messageWrapper = (
    <PostMessageView content={props.content} post={'post'} />
  );
  return (
    <PostBodyAdditionalContent>{messageWrapper}</PostBodyAdditionalContent>
  );
};

export default MessageWithAdditionalContent;
