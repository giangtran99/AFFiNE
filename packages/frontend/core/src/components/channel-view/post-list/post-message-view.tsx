import ShowMore from './show-more';

const PostMessageView = () => {
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
          {
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }
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
