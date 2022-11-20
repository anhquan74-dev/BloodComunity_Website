import styles from './DonationEvents.module.scss';
import classNames from 'classnames/bind';
import { events } from '../../../../services/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from '../../../../redux/actions/hospitalServices';

const cx = classNames.bind(styles);

function DonationEvents() {
    const dispatch = useDispatch();
    const listEvents = useSelector((state) => state.hospital.listEvents);
    
    console.log(listEvents);

    useEffect(() => {
        dispatch(fetchAllEvents());
    }, []);
    return (
        <div id="events" className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2>Các hoạt động hiến máu nhân đạo</h2>
                <div className={cx('events')}>
                    {listEvents && listEvents.map((event, index) => {
                        return (
                            <motion.div
                                key={index}
                                className={cx('item')}
                                whileHover={{
                                    translateY: '-6px',
                                    transition: { duration: 0.1 },
                                }}
                            >
                                <div className={cx('image')}>
                                    <img src='https://static.giotmauvang.org.vn/ihpstatic/BTH/2.png' alt="hospitalImage" />
                                </div>
                                <div className={cx('content')}>
                                    <h2>{event.nameEvent}</h2>
                                    <p>{event.description}</p>
                                    <div className={cx('location')}>
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                                <div className={cx('date')}>{event.date}</div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default DonationEvents;
