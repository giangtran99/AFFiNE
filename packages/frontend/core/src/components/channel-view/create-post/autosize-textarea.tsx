import { useRef } from 'react';
import { useSendMessage } from '../zulip-manager';

const AutoSieTextArea = () => {
  const inputRef = useRef('') as any;
  const { sendMessage } = useSendMessage();
  const onKeyDown = async (e: any) => {
    if (e.keyCode === 13 && inputRef.current.value) {
      e.preventDefault();
      const message = inputRef.current.value;
      inputRef.current.value = '';
      // Send a stream message
      await sendMessage(message);
    }
  };
  return (
    <>
      <div>
        <textarea
          onKeyDown={onKeyDown}
          ref={inputRef}
          // ref={setTextareaRef}
          data-testid={'post_textbox'}
          className="form-control custom-textarea textbox-edit-area custom-textarea--emoji-picker"
          id={'post_textbox'}
          aria-label="write to rown square"
          style={{ visibility: 'visible', height: 60, width: '80%' }}
          // {...heightProps}
          // {...otherProps}
          role="textbox"
          dir="auto"
          // disabled={disabled}
          // onChange={onChange}
          // onInput={onInput}
          // value={value}
          // defaultValue={defaultValue}
        />
      </div>
      {/* .textarea-wrapper.textarea-wrapper-preview .textbox-edit-area */}
    </>
  );
};

export default AutoSieTextArea;
