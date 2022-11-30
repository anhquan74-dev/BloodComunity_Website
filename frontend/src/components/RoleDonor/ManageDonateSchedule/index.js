import styles from './ManageDonateSchedule.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fecthNewestDonorBooking } from '../../../redux/actions/hospitalServices';
import { fetchHospitalById } from '../../../redux/actions/hospitalManage';
import QRCode from 'react-qr-code';

const cx = classNames.bind(styles);

function ManageDonateSchedule() {
    const newestDonorBooking = useSelector((state) => state.hospital.newestDonorBooking);
    const user = useSelector((state) => state.auth.login.currentUser);
    const hospital = useSelector((state) => state.users.hospital);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fecthNewestDonorBooking(user));
    }, []);
    useEffect(() => {
        dispatch(fetchHospitalById(newestDonorBooking?.hospitalId));
    }, [newestDonorBooking]);

    const date = new Date(Number(newestDonorBooking?.date));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const value = `${user?.firstName} ${user?.lastName} | ${user?.phoneNumber} | ${user?.email} | ${hospital?.hospitalName} | ${newestDonorBooking?.timeType} | ${day}/${month}/${year}`;
    console.log(value);

    const downloadQRCode = () => {
        const svg = document.getElementById('QRCode');
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            // name of image
            downloadLink.download = 'BloodCommunity-QRCode';
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };
    return (
        <div>
            <h1>Thông tin đăng ký hiến máu</h1>
            <div>
                <div>
                    <div style={{ height: 'auto', margin: '0 auto', maxWidth: 64, width: '100%' }}>
                        <QRCode value={value} id="QRCode" />
                    </div>
                    <button onClick={downloadQRCode}>Tải mã qr</button>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default ManageDonateSchedule;
