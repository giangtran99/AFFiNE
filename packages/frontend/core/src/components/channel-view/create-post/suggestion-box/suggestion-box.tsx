import { useRef } from 'react';

import QuickInput from '../quick-input';
import SuggestionListComponent from './suggestion-list-component';

const SuggestionBox = () => {
  const textAreaRef = useRef(null);
  return (
    <>
      <div
        // ref={this.suggestionReadOut}
        aria-live="polite"
        role="alert"
        className="sr-only"
      />
      <QuickInput textAreaRef={textAreaRef} />
      <SuggestionListComponent open={false} textAreaRef={textAreaRef} />
    </>
  );
};

export default SuggestionBox;
