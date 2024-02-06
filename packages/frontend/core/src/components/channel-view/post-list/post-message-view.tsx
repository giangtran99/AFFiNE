import ShowMore from './show-more';

const PostMessageView = (props: any) => {
  const formatJSONMessage = (message: any) => {
    try {
      const formatedMessage = JSON.parse(message) as any;
      return `English: ${formatedMessage.translated_data.english}</br>Vietnamese: ${formatedMessage.translated_data.vietnamese}</br>Japanese: ${formatedMessage.translated_data.japanese}`;
    } catch (e) {
      return message;
    }
  };
  return (
    <ShowMore
    // checkOverflow={this.state.checkOverflow}
    // text={message}
    // overflowType={overflowType}
    // maxHeight={maxHeight}
    >
      <div
        tabIndex={0}
        id={'id'}
        className="post-message__text"
        dir="auto"
        // onClick={this.handleFormattedTextClick}
      >
        <div
          dangerouslySetInnerHTML={{ __html: formatJSONMessage(props.content) }}
        />
        {/* <PostMarkdown
                        message={message}
                        imageProps={this.imageProps}
                        options={options}
                        post={post}
                        channelId={post.channel_id}
                        showPostEditedIndicator={this.props.showPostEditedIndicator}
                    /> */}
      </div>
      {/* <Pluggable
                    pluggableName='PostMessageAttachment'
                    postId={post.id}
                    onHeightChange={this.handleHeightReceived}
                /> */}
    </ShowMore>
  );
};

export default PostMessageView;
