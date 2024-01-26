import { InboxIcon } from '@blocksuite/icons';

import type { EditorExtension } from '../types';

const ChatCollaborationPanel = () => {
  return (
    <iframe
      style={{ height: '100%' }}
      src="http://10.1.7.109:9991/"
      scrolling="auto"
    ></iframe>
  );
};

export const chatCollaborationExtension: EditorExtension = {
  name: 'chat-collaboration',
  icon: <InboxIcon />,
  Component: ChatCollaborationPanel,
};
