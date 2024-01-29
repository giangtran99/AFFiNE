import QuickInput from '../quick-input';
import SuggestionListComponent from './suggestion-list-component';

const SuggestionBox = () => {
  return (
    <>
      <div
        // ref={this.suggestionReadOut}
        aria-live="polite"
        role="alert"
        className="sr-only"
      />
      <QuickInput />
      <SuggestionListComponent open={false} />
    </>
  );
};

export default SuggestionBox;
