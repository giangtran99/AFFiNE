import { InboxIcon } from '@blocksuite/icons';

import type { EditorExtension } from '../types';
const ChatCollaborationPanel = () => {
  return <div></div>;
};

export const chatCollaborationExtension: EditorExtension = {
  name: 'chat-collaboration',
  icon: <InboxIcon />,
  Component: ChatCollaborationPanel,
};
