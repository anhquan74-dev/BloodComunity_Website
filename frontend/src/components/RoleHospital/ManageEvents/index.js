import classNames from 'classnames/bind';
import styles from './ManageEvents.module.scss';
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from '../../../redux/actions/hospitalServices';
import Button from '@mui/material/Button';

const cx = classNames.bind(styles);

function ManageEvents() {
    const dispatch = useDispatch();
    const listEvents = useSelector((state) => state.hospital.listEvents);
    console.log(listEvents);

    useEffect(() => {
        // axios
        //     .get('http://localhost:8080/api/get-all-events')
        //     .then((res) => console.log(res))
        //     .catch((e) => console.log(e));
        dispatch(fetchAllEvents());
    }, []);

    return (
        <>
            <h1>Quản lý sự kiện hiến máu</h1>
            <Button variant="contained" color="success">
                Thêm sự kiện
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Tên sự kiện</th>
                        <th>Nơi tổ chức</th>
                        <th>Ngày tổ chức</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listEvents &&
                        listEvents.map((event, index) => {
                            return (
                                <tr key={`event ${index}`}>
                                    <td>{event.id}</td>
                                    <td>{event.nameEvent}</td>
                                    <td>{event.location}</td>
                                    <td>{event.date}</td>
                                    <td>{event.description}</td>
                                    <td>
                                        <Button variant="outlined">Sửa</Button>

                                        <Button variant="outlined" color="error">
                                            Xoá
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </>
    );
}

export default ManageEvents;
