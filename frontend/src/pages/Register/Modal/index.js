import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const cx = classNames.bind(styles);

function Modal({ toggleModal }) {
    return (
        <motion.div
            className={cx('overlay')}
            onClick={toggleModal}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
        >
            <motion.div
                className={cx('modal')}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                initial={{
                    scale: 0,
                }}
                animate={{
                    scale: 1,
                }}
            >
                <motion.span whileHover={{ scale: 1.1 }} className={cx('modal-cancel')} onClick={toggleModal}>
                    <FontAwesomeIcon icon={faXmark} />
                </motion.span>
                <p className={cx('modal-icon')}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                </p>
                <hr />
                <h2 className={cx('modal-header')}>Tạo tài khoản thành công!</h2>
                <p className={cx('modal-desc')}>Hãy sử dụng thông tin đã đăng ký để đăng nhập vào hệ thống!</p>

                <NavLink className={cx('modal-button')} to="/login">
                    Đăng nhập
                </NavLink>
            </motion.div>
        </motion.div>
    );
}

export default Modal;
