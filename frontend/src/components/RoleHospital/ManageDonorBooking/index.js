import styles from './ManageDonorBooking.module.scss';
import classNames from 'classnames/bind';
import Table from 'react-bootstrap/esm/Table';
import { useState } from 'react';
import { formatDate } from '../../../utils/formatDate';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { DOMAIN_BACKEND } from '../../../config/settingSystem';
import ModalConfirmDonate from './ModalConfirmDonate';

const cx = classNames.bind(styles);

const ManageDonorBooking = () => {
    // const [date, setDate] = useState();
    const [date, setDate] = useState(formatDate());
    const [listDonorBooking, setListDonorBooking] = useState();
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [donorBooking, setDonorBooking] = useState();
    const [statusBooking, setStatusBooking] = useState('S2');

    // new Date(formatDate()).getTime()

    const hospitalId = useSelector((state) => state.auth.login.currentUser.id);

    useEffect(() => {
        const today = new Date(formatDate()).getTime();
        axios
            .get(`${DOMAIN_BACKEND}/api/get-all-booking-by-hospital-id?hospitalId=${hospitalId}&date=${today}`)
            .then((res) => setListDonorBooking(res.data.content))
            .catch((e) => setListDonorBooking(''));
    }, []);

    useEffect(() => {
        const newDate = new Date(date).getTime();
        axios
            .get(`${DOMAIN_BACKEND}/api/get-all-booking-by-hospital-id?hospitalId=${hospitalId}&date=${newDate}`)
            .then((res) => setListDonorBooking(res.data.content))
            .catch((e) => setListDonorBooking(''));
    }, [date]);

    // useEffect(() => {

    // }, [statusBooking]);

    const handleChangeStatus = (date1) => {
        date1 = new Date(Number(date1));
        const newDate = new Date(formatDate(date1)).getTime();
        axios
            .get(`${DOMAIN_BACKEND}/api/get-all-booking-by-hospital-id?hospitalId=${hospitalId}&date=${newDate}`)
            .then((res) => setListDonorBooking(res.data.content))
            .catch((e) => setListDonorBooking(''));
    };

    const handleClose = () => {
        setShowModalConfirm(false);
    };

    const handleShowModalConfirm = (item) => {
        setDonorBooking(item);
        setShowModalConfirm(true);
    };

    console.log(listDonorBooking);

    return (
        <div className={cx('wrapper')}>
            {showModalConfirm && (
                <ModalConfirmDonate
                    handleClose={handleClose}
                    show={showModalConfirm}
                    donorBooking={donorBooking}
                    handleChangeStatus={handleChangeStatus}
                />
            )}
            <h1>Qu???n l?? l???ch h???n hi???n m??u c???a b???nh nh??n</h1>
            <div className={cx('pick-schedule')}>
                <div>
                    <label>Ch???n ng??y</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={date}
                        // min={formatDate()}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </div>
            <div className={cx('list-schedule')}>
                <h2>Danh s??ch b???nh nh??n ?????t l???ch hi???n m??u</h2>
                <div>
                    {/* <input type="text" placeholder="Search by date..." onChange={(e) => setQueryDay(e.target.value)} /> */}
                </div>
                <div className="">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S??? th??? t???</th>
                                <th>Th???i gian</th>
                                <th>H??? v?? t??n</th>
                                <th>?????a ch???</th>
                                <th>Email</th>
                                <th>S??? ??i???n tho???i</th>
                                <th>Nh??m m??u</th>
                                <th>H??nh ?????ng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!listDonorBooking && <>Kh??ng c?? d??? li???u</>}
                            {listDonorBooking &&
                                listDonorBooking.map((item, index) => {
                                    return (
                                        <tr key={`event ${index}`}>
                                            <td>{index + 1}</td>
                                            <td>{item.timeTypeDataDonor.valueVi}</td>
                                            <td>{`${item.donorData.firstName} ${item.donorData.lastName}`}</td>
                                            <td>
                                                {`${item.donorData.address || ''}, ${item.donorData.ward}, ${
                                                    item.donorData.district
                                                }, ${item.donorData.city}`}
                                            </td>
                                            <td>{item.donorData.email}</td>
                                            <td>{item.donorData.phoneNumber}</td>
                                            <td>{item.donorData.groupBlood}</td>
                                            <td>
                                                {item.status !== 'S3' && (
                                                    <Button
                                                        variant="outlined"
                                                        color="success"
                                                        onClick={() => handleShowModalConfirm(item)}
                                                    >
                                                        X??c nh???n
                                                    </Button>
                                                )}
                                                {item.status === 'S3' && (
                                                    <div className={cx('confirm')}>???? hi???n m??u</div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ManageDonorBooking;
