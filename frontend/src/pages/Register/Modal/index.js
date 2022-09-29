import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Modal() {
    return (
        <div className={cx('overlay')}>
            <div className={cx('modal')}>
                <p className={cx('modal-icon')}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                </p>
                <hr />
                <h2 className={cx('modal-header')}>Tạo tài khoản thành công!</h2>
                <p className={cx('modal-desc')}>Hãy sử dụng thông tin đã đăng ký để đăng nhập vào hệ thống!</p>

                <NavLink className={cx('modal-button')} to="/login">
                    Đăng nhập
                </NavLink>
            </div>
        </div>
    );
}

export default Modal;
