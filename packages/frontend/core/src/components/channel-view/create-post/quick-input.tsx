import AutoSieTextArea from './autosize-textarea';

const QuickInput = (props: any) => {
  return (
    <div className="input-wrapper">
      <AutoSieTextArea textAreaRef={props.textAreaRef} />
    </div>
  );
};

export default QuickInput;
