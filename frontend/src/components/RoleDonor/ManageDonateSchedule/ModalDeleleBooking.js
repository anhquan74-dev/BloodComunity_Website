import styles from './ManageDonateSchedule.module.scss';
import classNames from 'classnames/bind';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import axios from 'axios';

const cx = classNames.bind(styles);

const ModalDeleteBooking = ({ show, handleClose, donorBooking }) => {
    console.log(donorBooking);
    const handleDeleleBooking = () => {
        axios
            .delete('http://localhost:8080/api/delete-booking-by-id', {
                data: {
                    id: 16,
                },
            })
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Xoá đơn đăng ký</Modal.Title>
            </Modal.Header>
            <Modal.Body>Đơn đăng ký sẽ bị xóa khỏi hệ thống</Modal.Body>
            <Modal.Footer>
                <Button variant="outlined" onClick={handleClose}>
                    Huỷ
                </Button>
                <Button variant="outlined" color="success" onClick={handleDeleleBooking}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDeleteBooking;
