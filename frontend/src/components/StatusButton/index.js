import styles from './StatusButton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function StatusButton({ status, handleOnclick }) {
    let stt = '';
    if (status === 'confirm') {
        stt = 'Xác nhận';
    } else if (status === 'reject') {
        stt = 'Từ chối';
    } else if (status === 'pending') {
        stt = 'Đang tiến hành';
    }
    return <div className={cx(`button-${status}`, 'button')}>{stt}</div>;
}

export default StatusButton;
