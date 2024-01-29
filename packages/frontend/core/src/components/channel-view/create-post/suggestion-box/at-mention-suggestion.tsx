import { Avatar } from '@affine/component/ui/avatar';
import { AiIcon } from '@blocksuite/icons';

const AtMentionSuggestion = () => {
  return (
    <>
      <span className="status-wrapper style--none">
        <span className="profile-icon">
          <Avatar
            url="blob:https://www.facebook.com/f0ba2632-fe3e-4c48-b39a-2c17dd616401"
            size={25}
          />
        </span>
      </span>
      <span className="suggestion-list__ellipsis">
        <span className="suggestion-list__main">{'@' + 'giangth'}</span>
        {<AiIcon />}
        {'giangth@vietis.com.vn'}
        {/* {"youElement"}
                {"customStatus"}
                {"sharedIcon"} */}
        {/* {<ClientIcon />} */}
      </span>
      {/* {"countBadge"} */}
    </>
  );
};

export default AtMentionSuggestion;
