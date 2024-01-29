import classNames from 'classnames';

import AtMentionSuggestion from './at-mention-suggestion';

const SuggestionContainer = (props: any) => {
  return (
    <>
      <div className="suggestion-list__divider">
        <span>
          <span>Channel Members</span>
        </span>
      </div>
      <div
        // ref={ref}
        className={classNames('suggestion-list__item', {
          'suggestion--selected': true,
        })}
        // onClick={handleClick}
        // onMouseMove={handleMouseMove}
        // role={role}
        // tabIndex={tabIndex}
        // {...otherProps}
      >
        {props.children}
      </div>
    </>
  );
};

const SuggestionListComponent = (props: any) => {
  const mainClass = 'suggestion-list suggestion-list--' + 'top';
  const contentClass =
    'suggestion-list__content suggestion-list__content--' + 'top';

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
            <SuggestionContainer>
              <AtMentionSuggestion />
            </SuggestionContainer>
          </div>
        </div>
    );
  };
  return render();
};

export default SuggestionListComponent;
