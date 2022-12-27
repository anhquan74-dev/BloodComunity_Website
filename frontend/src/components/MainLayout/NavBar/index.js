import styles from './NavBar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Buffer } from 'buffer';
import { logout } from '../../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { DOMAIN_BACKEND } from '../../../config/settingSystem';
Buffer.from('anything', 'base64');

const cx = classNames.bind(styles);
const ENDPOINT = DOMAIN_BACKEND;
var socket;
socket = io(ENDPOINT);

function NavBar() {
  const dispatch = useDispatch();
  const [openNotify, setOpenNotify] = useState(false);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  let previewImage = require('../../../assets/images/default_avatar.png');
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([])
  if (currentUser?.image) {
    previewImage = new Buffer(currentUser.image, 'base64').toString('binary');
  }
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('welcome')}>
        <h2>Welcome to Blood Community!</h2>
        <p>
          Hello{' '}
          {currentUser &&
            currentUser.firstName &&
            currentUser.lastName &&
            `${currentUser.firstName} ${currentUser.lastName}`}
          , welcome back!
        </p>
      </div>
      <div className={cx('profile')}>
        <Tooltip title={<p className={cx('tooltip')}>Tin nhắn</p>} placement="bottom">
          <div className={cx('message')}>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
        </Tooltip>
        <Tooltip title={<p className={cx('tooltip')}>Thông báo</p>} placement="bottom">
          <div className={cx('notification')} onClick={() => setOpenNotify(!openNotify)}>
            <FontAwesomeIcon icon={faBell} />
            <div className={cx('counter')}>2</div>
          </div>
        </Tooltip>
        {openNotify && (
          <div className={cx('notifications')}>
            <div className={cx('notify')}>
              <span>ajksdhfajshdjfagsjkdfgkajsdfagsdf</span>
              <span>2ajksdhfajshdjfagsjkdfgkajsdfagsdf</span>
              <span>3ajksdhfajshdjfagsjkdfgkajsdfagsdf</span>
            </div>
          </div>
        )}

        {/* style={{ zIndex: '999' }} */}
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <>
              <Tooltip title={<p className={cx('tooltip')}>Tài khoản</p>} placement="bottom">
                <div
                  className={cx('profile-manage')}
                  // onClick={handleClick}
                  {...bindTrigger(popupState)}
                >
                  <img
                    src={previewImage || require('../../../assets/images/default_avatar.png')}
                    alt="avatar"
                  />
                  <div className={cx('arrow-button')}>
                    <KeyboardArrowDownIcon />
                  </div>
                  <div className={cx('layer')}></div>
                </div>
              </Tooltip>

              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <div className={cx('acc-popper')}>
                  <div className={cx('myacc')}>
                    <div>
                      <img
                        src={
                          previewImage || require('../../../assets/images/default_avatar.png')
                        }
                        alt="avatar"
                      />
                    </div>
                    <div>
                      {currentUser &&
                        currentUser.firstName &&
                        currentUser.lastName &&
                        `${currentUser.firstName} ${currentUser.lastName}`}
                    </div>
                  </div>
                  <hr />
                  <div className={cx('another')}>
                    <div className={cx('item')}>Cài đặt tài khoản</div>
                    <div className={cx('item')}>Lịch sử</div>
                    <div className={cx('item')} onClick={handleLogout}>
                      Đăng xuất
                    </div>
                  </div>
                </div>
              </Popover>
            </>
          )}
        </PopupState>
      </div>
    </div>
  );
}

export default NavBar;
