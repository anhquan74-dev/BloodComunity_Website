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

const cx = classNames.bind(styles);

const ManageDonorBooking = () => {
    // const [date, setDate] = useState();
    const [date, setDate] = useState(formatDate());
    const [listDonorBooking, setListDonorBooking] = useState();

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

    return (
        <div className={cx('wrapper')}>
            <h1>Quản lý lịch hẹn hiến máu của bệnh nhân</h1>
            <div className={cx('pick-schedule')}>
                <div>
                    <label>Chọn ngày</label>
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
                <h2>Danh sách bệnh nhân đặt lịch hiến máu</h2>
                <div>
                    {/* <input type="text" placeholder="Search by date..." onChange={(e) => setQueryDay(e.target.value)} /> */}
                </div>
                <div className="">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Số thứ tự</th>
                                <th>Thời gian</th>
                                <th>Họ và tên</th>
                                <th>Địa chỉ</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Nhóm máu</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!listDonorBooking && <>Không có dữ liệu</>}
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
                                                <Button
                                                    variant="outlined"
                                                    color="success"
                                                    // onClick={() => handleShowModalDelete(item)}
                                                >
                                                    Xác nhận
                                                </Button>
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
