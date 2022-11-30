import styles from './BookingHistory.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const BookingHistory = () => {
    const listBookings = [];
    return (
        <div>
            <h2>Lịch sử đặt hẹn</h2>
            <div>
                {/* {listBookings &&
                    listBookings.map((item, index) => {
                        return ( */}
                <div className={cx('schedule')}>
                    <div className={cx('info')}>
                        <div className={cx('image')}>
                            {/* <img src={require('../../../assets/svg/giotmau.svg')} alt="giotmau" /> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="53.506"
                                height="65.771"
                                viewBox="0 0 53.506 65.771"
                            >
                                <path
                                    id="IcRoundWaterDrop"
                                    d="M32.96,3.16a3.4,3.4,0,0,0-4.448,0Q4.033,24.73,4,40.681C4,57.335,16.708,68.1,30.753,68.1S57.506,57.335,57.506,40.681Q57.506,24.73,32.96,3.16ZM16.808,41.35a2.511,2.511,0,0,1,2.475,2.073,11.33,11.33,0,0,0,12.173,9.6,2.511,2.511,0,1,1,.234,5.016A16.3,16.3,0,0,1,14.333,44.26a2.508,2.508,0,0,1,2.475-2.909Z"
                                    transform="translate(-4 -2.332)"
                                    fill="#ed2e2e"
                                ></path>
                            </svg>
                            <span>Hiến máu</span>
                        </div>
                        <div className={cx('detail')}>
                            <h3>Hội bảo trợ bệnh nhân nghèo TPHCM</h3>
                            <p>24 Nguyễn Thị Diệu, Phường Võ Thị Sáu, Quận 3, Tp Hồ Chí Minh</p>
                            <p className={cx('timeType')}>09:00 đến 10:00 - 30/11/2022</p>
                        </div>
                    </div>
                    <div className={cx('booking')}>
                        <p
                            className={cx('status', {
                                done: true,
                                inprogress: false,
                            })}
                        >
                            {true ? 'Đã hiến máu' : 'Đã hẹn lịch'}
                        </p>
                        <a href="#">Xem chi tiết</a>
                    </div>
                </div>
                {/* );
                    })} */}
            </div>
        </div>
    );
};

export default BookingHistory;