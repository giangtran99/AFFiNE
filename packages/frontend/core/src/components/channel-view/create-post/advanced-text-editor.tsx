import './advanced_text_editor.scss';

import classNames from 'classnames';

import { Separator } from './formatting-bar/formatting-bar';
import SendButton from './send-button';
import TextBox from './text-box';
import TexteditorActions from './text-editor-actions';

const AdvancedTextEditor = () => {
  return (
    <form
      id="create_post"
      // ref={this.topDiv}
      data-testid="create-post"
      className={'center'}
      // onSubmit={this.handleSubmit}
    >
      <div
        className={classNames('AdvancedTextEditor', {
          'AdvancedTextEditor__attachment-disabled': false,
          scroll: false,
          'formatting-bar': false,
        })}
      >
        <div className={'AdvancedTextEditor__body'} disabled={false}>
          <div
            // ref={editorBodyRef}
            role="application"
            id="advancedTextEditorCell"
            data-a11y-sort-order="2"
            // aria-label={ariaLabel}
            tabIndex={-1}
            className="AdvancedTextEditor__cell a11y__region"
          >
            {/* {"Write to Town Square"} */}
            <TextBox />
            {/* {attachmentPreview} */}
            <TexteditorActions
            // ref={"editorActionsRef"}
            // placement='bottom'
            >
              {/* <ToggleFormattingBar
                            onClick={toggleAdvanceTextEditor}
                            active={showFormattingBar}
                            disabled={shouldShowPreview}
                            /> */}
              <Separator />
              {/* {fileUploadJSX} */}
              {/* {emojiPicker} */}
              <SendButton
              // disabled={disableSendButton}
              // handleSubmit={handleSubmit}
              />
            </TexteditorActions>
          </div>
          {/* {showSendTutorialTip && currentChannel && prefillMessage && (
                        <SendMessageTour
                            prefillMessage={prefillMessage}
                            currentChannel={currentChannel}
                            currentUserId={currentUserId}
                            currentChannelTeammateUsername={currentChannelTeammateUsername}
                        />
                    )} */}
        </div>
      </div>
      <div
        id="postCreateFooter"
        role="form"
        className={classNames('AdvancedTextEditor__footer', {
          'AdvancedTextEditor__footer--has-error': 'postError',
        })}
      >
        {/* {postError && (
                    <label className={classNames('post-error', {errorClass})}>
                        {postError}
                    </label>
                )}
                {serverError && (
                    <MessageSubmitError
                        error={serverError}
                        submittedMessage={serverError.submittedMessage}
                        handleSubmit={handleSubmit}
                    />
                )}
                <MsgTyping
                    channelId={channelId}
                    postId={postId}
                /> */}
      </div>
    </form>
  );
};

export default AdvancedTextEditor;
