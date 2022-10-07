import styles from './ViewBloodRequest.module.scss';
import classNames from 'classnames/bind';
import StatusButton from '../../StatusButton';
import { requests } from '../../../services/data';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ViewBloodRequest() {
    // const [status, setStatus] = useState();

    return (
        <div className={cx('wrapper')}>
            <h2>Yêu cầu nhận máu từ người cần máu</h2>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <p>Người nhận máu</p>
                    <p>Địa chỉ</p>
                    <p>Số điện thoại</p>
                    <p>Nhóm máu</p>
                    <p>Hành động</p>
                </div>
                <div className={cx('body')}>
                    {requests.map((request, index) => {
                        return (
                            <div className={cx('item')} key={index}>
                                <div>
                                    <div>
                                        <img src="" alt="" />
                                    </div>
                                    <div>{request.name}</div>
                                </div>
                                <div>{request.address}</div>
                                <div>{request.phone}</div>
                                <div>{request.bloodGroup}</div>
                                <div>
                                    <div>
                                        <StatusButton status="confirm" />
                                    </div>
                                    <div>
                                        <StatusButton status="reject" />
                                    </div>
                                    {/* <div>
                                <StatusButton status="pending" />
                            </div> */}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ViewBloodRequest;
