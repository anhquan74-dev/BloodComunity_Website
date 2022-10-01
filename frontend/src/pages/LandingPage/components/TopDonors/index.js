import styles from './TopDonors.module.scss';
import classNames from 'classnames/bind';
import { topDonors } from '../../../../services/data';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const cx = classNames.bind(styles);

function TopDonors() {
    // const fetchTop4Donors = async () => {
    //     const res = await axios.get('http://localhost:8080/');
    //     const data = res && res.data ? res.data : [];
    //     console.log(data);
    // };

    return (
        <div id="top-donors" className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2>Các cá nhân nổi bật</h2>
                <div className={cx('donors')}>
                    {topDonors.map((donor, index) => {
                        return (
                            <motion.div whileHover={{ scale: 1.07 }} className={cx('donor-item')}>
                                <div className={cx('donor-avatar')}>
                                    <img src={donor.image} alt="donor-image" />
                                    <span>
                                        <FontAwesomeIcon icon={faStar} />
                                    </span>
                                </div>
                                <div className={cx('donor-name')}>
                                    <h2>{donor.fullname}</h2>
                                    <h3>{donor.gender}</h3>
                                    <p>
                                        {donor.district}, {donor.city}
                                    </p>
                                </div>
                                <div className={cx('donor-numOfDonate')}>Số lần hiến máu: {donor.numberOfDonation}</div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default TopDonors;
