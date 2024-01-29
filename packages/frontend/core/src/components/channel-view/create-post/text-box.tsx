import classNames from 'classnames';

import PostMarkdown from './post-markdown';
import SuggestionBox from './suggestion-box/suggestion-box';

const TextBox = () => {
  return (
    <div
        // ref={this.wrapper}
        className={classNames('textarea-wrapper')}
      >
        <div
          // tabIndex={this.props.tabIndex || 0}
          // ref={this.preview}
          className={classNames(
            'form-control custom-textarea textbox-preview-area',
            { 'textarea--has-labels': ' this.props.hasLabels' }
          )}
          // onKeyPress={this.props.onKeyPress}
          // onKeyDown={this.handleKeyDown}
          // onBlur={this.handleBlur}
        >
          <PostMarkdown
          // message={this.props.value}
          // channelId={this.props.channelId}
          // imageProps={{hideUtilities: true}}
          />
        </div>
        <SuggestionBox />
      </div>
  );
};

export default TextBox;
