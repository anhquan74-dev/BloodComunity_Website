import styles from './ManageDonateSchedule.module.scss';
import classNames from 'classnames/bind';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';

const cx = classNames.bind(styles);

const ModalDeleteBooking = ({ show, handleClose, donorBooking }) => {
    console.log(donorBooking);
    const handleDeleleBooking  = () => {
        
    }
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
