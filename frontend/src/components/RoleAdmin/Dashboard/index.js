import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Dashboard() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('item', 'item1')}>item1</div>
            <div className={cx('item', 'item2')}>item2</div>
            <div className={cx('item', 'item3')}>item3</div>
            <div className={cx('item', 'item4')}>item4</div>
            <div className={cx('item', 'item5')}>item5</div>
            <div className={cx('item', 'item6')}>item6</div>
            <div className={cx('item', 'item7')}>item7</div>
            <div className={cx('item', 'item8')}>item8</div>
            <div className={cx('item', 'item9')}>item9</div>
        </div>
    );
}

export default Dashboard;
