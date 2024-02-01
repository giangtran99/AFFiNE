// import zulipInit from '@affine/core/zulip-js/src';
// import { useState } from 'react';

const AutoSieTextArea = (props: any) => {
  // const [value, setValue] = useState('');
  return (
    <>
      <div>
        <textarea
          // onKeyDown={async e => {
          //   // if (e.keyCode === 13) {
          //   //   const client = await zulipInit();
          //   //   // Send a stream message
          //   //   let params = {
          //   //     to: 8,
          //   //     type: 'stream',
          //   //     topic: 'wifi',
          //   //     content: value,
          //   //   };
          //   //   console.log(await client.messages.send(params));
          //   // }
          // }}
          // onChange={e => {
          //   setValue(e.target.value);
          // }}
          ref={props.textAreaRef}
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
