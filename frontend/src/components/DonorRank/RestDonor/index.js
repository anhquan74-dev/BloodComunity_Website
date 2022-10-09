import styles from './RestDonor.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function RestDonor({ ...props }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('rank')}>{props.top}</div>
            <div className={cx('content')}>
                <div className={cx('info')}>
                    <div className={cx('image')}>
                        <img src={props.donor.image} alt="avatar" />
                    </div>
                    <div className={cx('name')}>
                        <div>{props.donor.fullname}</div>
                        <div>{props.donor.gender}</div>
                    </div>
                </div>
                <div className={cx('quantity')}>
                    <FontAwesomeIcon icon={faHandHoldingMedical} /> {props.donor.numberOfDonation}
                </div>
            </div>
        </div>
    );
}

export default RestDonor;
