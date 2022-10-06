import styles from './NavBar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const cx = classNames.bind(styles);

function NavBar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('welcome')}>
                <h2>Welcome to Blood Community!</h2>
                <p>Hello, Quan Tran, welcome back!</p>
            </div>
            <div className={cx('profile')}>
                <div className={cx('message')}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className={cx('notification')}>
                    <FontAwesomeIcon icon={faBell} />
                </div>
                <div className={cx('profile-manage')}>
                    <img src={require('../../../assets/images/aboutus.jpeg')} alt="avatar" />
                    <div className={cx('arrow-button')}>
                        <KeyboardArrowDownIcon />
                    </div>
                    <div className={cx('layer')}></div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
