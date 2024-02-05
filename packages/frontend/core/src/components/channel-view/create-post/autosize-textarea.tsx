import zulipInit from '@affine/core/zulip-js';
import { useRef, useState } from 'react';

const AutoSieTextArea = () => {
  const inputRef = useRef('') as any;
  const onKeyDown = async (e: any) => {
    if (e.keyCode === 13 && inputRef.current.value) {
      const client = await zulipInit();
      // Send a stream message
      let params = {
        to: [8],
        type: 'stream',
        topic: 'wifi',
        content: inputRef.current.value,
      };
      console.log(await client.messages.send(params));
      inputRef.current.value = '';
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
          style={{ visibility: 'visible', height: 60, width: '100%' }}
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
