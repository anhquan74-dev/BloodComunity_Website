import styles from './DonorRank.module.scss';
import classNames from 'classnames/bind';
import Top3Donor from './Top3Donor/Top3Donor';
import { rankBg } from '../../assets/svg/Rank';
import RestDonor from './RestDonor';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTopDonors } from '../../redux/actions/statisticAction';

const cx = classNames.bind(styles);

function DonorRank() {
    // const top3Donor = [
    //     {
    //         id: 1,
    //         fullname: 'Team C1SE.14',
    //         gender: 'Nam',
    //         district: 'Hải Châu',
    //         city: 'Đà Nẵng',
    //         numberOfDonation: 10,
    //         image: require('../../assets/images/aboutus.jpeg'),
    //     },
    //     {
    //         id: 2,
    //         fullname: 'Team C1SE.14',
    //         gender: 'Nam',
    //         district: 'Hải Châu',
    //         city: 'Đà Nẵng',
    //         numberOfDonation: 8,
    //         image: require('../../assets/images/aboutus.jpeg'),
    //     },
    //     {
    //         id: 3,
    //         fullname: 'Team C1SE.14',
    //         gender: 'Nữ',
    //         district: 'Hải Châu',
    //         city: 'Đà Nẵng',
    //         numberOfDonation: 7,
    //         image: require('../../assets/images/aboutus.jpeg'),
    //     },
    // ];

    // const restDonor = [
    //     {
    //         id: 4,
    //         fullname: 'Team C1SE.14',
    //         gender: 'Nam',
    //         district: 'Hải Châu',
    //         city: 'Đà Nẵng',
    //         numberOfDonation: 6,
    //         image: require('../../assets/images/aboutus.jpeg'),
    //     },
    //     {
    //         id: 5,
    //         fullname: 'Team C1SE.14',
    //         gender: 'Nam',
    //         district: 'Hải Châu',
    //         city: 'Đà Nẵng',
    //         numberOfDonation: 5,
    //         image: require('../../assets/images/aboutus.jpeg'),
    //     },
    //     {
    //         id: 6,
    //         fullname: 'Team C1SE.14',
    //         gender: 'Nữ',
    //         district: 'Hải Châu',
    //         city: 'Đà Nẵng',
    //         numberOfDonation: 5,
    //         image: require('../../assets/images/aboutus.jpeg'),
    //     },
    //     {
    //         id: 7,
    //         fullname: 'Team C1SE.14',
    //         gender: 'Nữ',
    //         district: 'Hải Châu',
    //         city: 'Đà Nẵng',
    //         numberOfDonation: 4,
    //         image: require('../../assets/images/aboutus.jpeg'),
    //     },
    //     {
    //         id: 8,
    //         fullname: 'Team C1SE.14',
    //         gender: 'Nữ',
    //         district: 'Hải Châu',
    //         city: 'Đà Nẵng',
    //         numberOfDonation: 4,
    //         image: require('../../assets/images/aboutus.jpeg'),
    //     },
    //     {
    //         id: 9,
    //         fullname: 'Team C1SE.14',
    //         gender: 'Nữ',
    //         district: 'Hải Châu',
    //         city: 'Đà Nẵng',
    //         numberOfDonation: 4,
    //         image: require('../../assets/images/aboutus.jpeg'),
    //     },
    //     {
    //         id: 10,
    //         fullname: 'Team C1SE.14',
    //         gender: 'Nữ',
    //         district: 'Hải Châu',
    //         city: 'Đà Nẵng',
    //         numberOfDonation: 3,
    //         image: require('../../assets/images/aboutus.jpeg'),
    //     },
    // ];

    const dispatch = useDispatch();
    const topDonors = useSelector((state) => state.statistic.topDonors);
    const restDonor = [];
    topDonors.forEach((item, index) => {
        if (index >= 3) {
            restDonor.push(item);
        }
    });
    console.log(restDonor);
    useEffect(() => {
        dispatch(getTopDonors());
    }, []);

    console.log(topDonors);

    return (
        <div className={cx('wrapper')}>
            <h2>Bảng xếp hạng người hiến máu</h2>
            <div className={cx('content')}>
                <div
                    className={cx('top3')}
                    style={{
                        backgroundImage: `url(${rankBg})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }}
                >
                    {topDonors.map((item, index) => {
                        if (index < 3) {
                            return <Top3Donor top={index + 1} donor={item} />;
                        }
                        return <></>;
                    })}
                </div>
                <div className={cx('rest')}>
                    {restDonor.map((item, index) => {
                        return <RestDonor donor={item} top={index + 4} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default DonorRank;
