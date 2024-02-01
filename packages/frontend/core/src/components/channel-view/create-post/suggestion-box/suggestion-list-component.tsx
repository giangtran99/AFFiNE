import classNames from 'classnames';
import { useEffect, useState } from 'react';

import AtMentionSuggestion from './at-mention-suggestion';
// import zulipInit from '@affine/core/zulip-js/src';

const SuggestionContainer = (props: any) => {
  return (
    <div
      // ref={ref}
      className={classNames('suggestion-list__item', {
        'suggestion--selected': false,
      })}
      // onClick={handleClick}
      // onMouseMove={handleMouseMove}
      // role={role}
      // tabIndex={tabIndex}
      // {...otherProps}
    >
      {props.children}
    </div>
  );
};

const SuggestionListComponent = (props: any) => {
  const [members, setMembers] = useState([]);
  const mainClass = 'suggestion-list suggestion-list--' + 'top';
  const contentClass =
    'suggestion-list__content suggestion-list__content--' + 'top';
  setMembers([]);
  console.log('##textAreaRef', props.textAreaRef?.current?.value);

  useEffect(() => {
    // (async () => {
    //   const zulipClient = await zulipInit();
    //   const response = await zulipClient.users.retrieve();
    //   setMembers(response.members);
    // })();
  }, []);

  const render = () => {
    if (!props.open) return null;
    return (
      <div
        // ref={this.wrapperRef}
        className={mainClass}
      >
        <div
          id="suggestionList"
          role="list"
          // ref={this.contentRef}
          // style={{
          //     maxHeight: this.maxHeight,
          //     ...this.getTransform(),
          // }}
          className={contentClass}
          // onMouseDown={this.props.preventClose}
        >
          <div className="suggestion-list__divider">
            <span>
              <span>Channel Members</span>
            </span>
          </div>
          {members.map((member: any, index: any) => (
            <SuggestionContainer
              memberName={member.full_name}
              textAreaRef={props.textAreaRef}
              key={index}
            >
              <AtMentionSuggestion member={member} />
            </SuggestionContainer>
          ))}
        </div>
      </div>
    );
  };
  return render();
};

export default SuggestionListComponent;
