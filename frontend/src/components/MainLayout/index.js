import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import NavBar from './NavBar';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

function MainLayout({ routes }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('logo')}>Logo</div>
                <div className={cx('navlink')}>
                    <SideBar routes={routes} />
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('navbar')}>
                    <NavBar />
                </div>
                <div className={cx('content')}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
