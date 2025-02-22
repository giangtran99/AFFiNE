import { SendIcon } from '@blocksuite/icons';
import type React from 'react';
import { memo } from 'react';
import styled from 'styled-components';

const SendButtonContainer = styled.button`
  display: flex;
  height: 32px;
  padding: 0 16px;
  border: none;
  background: var(--button-bg);
  border-radius: 4px;
  color: var(--button-color);
  cursor: pointer;
  place-content: center;
  place-items: center;
  transition: color 150ms;

  &--disabled,
  &[disabled] {
    background: rgba(var(--center-channel-color-rgb), 0.08);

    svg {
      fill: rgba(var(--center-channel-color-rgb), 0.32);
    }
  }

  .android &,
  .ios & {
    display: flex;
  }
`;

const SendButton = ({ disabled, handleSubmit }: any) => {
  const sendMessage = (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <SendButtonContainer
      data-testid="SendMessageButton"
      tabIndex={0}
      // aria-label={formatMessage({
      //     id: 'create_post.send_message',
      //     defaultMessage: 'Send a message',
      // })}
      disabled={disabled}
      onClick={sendMessage}
    >
      <SendIcon
      // size={18}
      // color='currentColor'
      // aria-label={formatMessage({
      //     id: t('create_post.icon'),
      //     defaultMessage: 'Create a post',
      // })}
      />
    </SendButtonContainer>
  );
};

export default memo(SendButton);
