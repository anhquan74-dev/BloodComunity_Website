import styles from './NavBar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip from '@mui/material/Tooltip';
import Popper from '@mui/material/Popper';
import { useState } from 'react';

const cx = classNames.bind(styles);

function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('welcome')}>
                <h2>Welcome to Blood Community!</h2>
                <p>Hello, Quan Tran, welcome back!</p>
            </div>
            <div className={cx('profile')}>
                <Tooltip title={<p className={cx('tooltip')}>Tin nhắn</p>} placement="bottom">
                    <div className={cx('message')}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                </Tooltip>
                <Tooltip title={<p className={cx('tooltip')}>Thông báo</p>} placement="bottom">
                    <div className={cx('notification')}>
                        <FontAwesomeIcon icon={faBell} />
                    </div>
                </Tooltip>
                <Tooltip title={<p className={cx('tooltip')}>Tài khoản</p>} placement="bottom">
                    <div className={cx('profile-manage')} onClick={handleClick}>
                        <img src={require('../../../assets/images/aboutus.jpeg')} alt="avatar" />
                        <div className={cx('arrow-button')}>
                            <KeyboardArrowDownIcon />
                        </div>
                        <div className={cx('layer')}></div>
                    </div>
                </Tooltip>
                <Popper id={id} open={open} anchorEl={anchorEl} style={{ zIndex: '999' }} placement="bottom-end">
                    <div className={cx('acc-popper')}>
                        <div className={cx('myacc')}>
                            <div>
                                <img src={require('../../../assets/images/aboutus.jpeg')} alt="avatar" />
                            </div>
                            <div>Trần Anh Quân</div>
                        </div>
                        <hr />
                        <div className={cx('another')}>
                            <div className={cx('item')}>Cài đặt tài khoản</div>
                            <div className={cx('item')}>Lịch sử</div>
                            <div className={cx('item')}>Đăng xuất</div>
                        </div>
                    </div>
                </Popper>
            </div>
        </div>
    );
}

export default NavBar;
