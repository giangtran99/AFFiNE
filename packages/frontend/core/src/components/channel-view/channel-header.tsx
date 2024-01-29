import { ArrowDownSmallIcon } from '@blocksuite/icons';
import classNames from 'classnames';

const ChannelHeader = () => {
  return (
    <div
      id="channel-header"
      aria-label={'ariaLabelChannelHeader'}
      role="banner"
      tabIndex={-1}
      data-channelid={`${'channel.id'}`}
      className="channel-header alt a11y__region"
      data-a11y-sort-order="8"
    >
      <div className="flex-parent">
        <div className="flex-child">
          <div id="channelHeaderInfo" className="channel-header__info">
            <div className="channel-header__title dropdown">
              <div>
                <ChannelHeaderTitle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChannelHeaderTitle = () => {
  return (
    <div className="MenuWrapper">
        <div id="channelHeaderDropdownButton" className="channel-header__top">
          <button
            className={classNames('channel-header__trigger style--none', {
              active: false,
            })}
            // aria-label={intl.formatMessage({id: 'channel_header.menuAriaLabel', defaultMessage: 'Channel Menu'}).toLowerCase()}
          >
            <strong
              role="heading"
              aria-level={2}
              id="channelHeaderTitle"
              className="heading"
            >
              <span>
                {/* {archivedIcon} */}
                {'Town Square'}
                {/* {sharedIcon} */}
              </span>
            </strong>
            <span
              id="channelHeaderDropdownIcon"
              className="icon icon-chevron-down header-dropdown-chevron-icon"
            >
              <ArrowDownSmallIcon />
            </span>
          </button>
        </div>
      </div>
  );
};
export default ChannelHeader;
