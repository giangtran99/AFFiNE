import ChannelView from '@affine/core/components/channel-view/index';
import { InboxIcon } from '@blocksuite/icons';

import type { EditorExtension } from '../types';

const ChatCollaborationPanel = () => {
  return <ChannelView />;
};

export const chatCollaborationExtension: EditorExtension = {
  name: 'chat-collaboration',
  icon: <InboxIcon />,
  Component: ChatCollaborationPanel,
};
