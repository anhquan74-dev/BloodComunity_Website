import classNames from 'classnames/bind';
import styles from './ManageEvents.module.scss';
import Button from '@mui/material/Button';

const cx = classNames.bind(styles);

function ManageEvents() {
    return (
        <div>
            <h1>Quản lý sự kiện hiến máu</h1>
            <div>
                <div></div>
                <Button variant="contained" color="success">
                    Add new
                </Button>
            </div>
            <div>
                <Button color="secondary">Secondary</Button>

                <Button variant="outlined" color="error">
                    Error
                </Button>
            </div>
        </div>
    );
}

export default ManageEvents;
