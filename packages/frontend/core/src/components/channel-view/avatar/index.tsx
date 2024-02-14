import classNames from 'classnames';
import './avatar.scss';

const Avatar = ({ url, username, size = 'md', ...attrs }) => {
  const classes = classNames(`Avatar Avatar-${size}`, attrs.className);
  return (
    <img
      tabIndex={0}
      className={classes}
      alt={`${username || 'user'} profile image`}
      src={url}
    />
  );
};

export default Avatar;
