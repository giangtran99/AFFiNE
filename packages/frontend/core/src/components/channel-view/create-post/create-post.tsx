import AdvancedTextEditor from './advanced-text-editor';

const CreatePost = () => {
  return (
    <div
      id="post-create"
      data-testid="post-create"
      className="post-create__container AdvancedTextEditor__ctr"
    >
      <AdvancedTextEditor />
    </div>
  );
};

export default CreatePost;
