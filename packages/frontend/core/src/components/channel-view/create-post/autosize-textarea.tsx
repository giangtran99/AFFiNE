const AutoSieTextArea = () => {
  return (
    <>
      <div>
        <textarea
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
