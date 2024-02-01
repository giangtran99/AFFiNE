import { Avatar } from '@affine/component/ui/avatar';
import { AiIcon } from '@blocksuite/icons';

const AtMentionSuggestion = (props: any) => {
  return (
    <>
      <span className="status-wrapper style--none">
        <span className="profile-icon">
          <Avatar url={props.member.avatar_url} size={25} />
        </span>
      </span>
      <span className="suggestion-list__ellipsis">
        <span className="suggestion-list__main">
          {'@' + props.member.full_name}
        </span>
        {<AiIcon />}
        {props.member.email}
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
