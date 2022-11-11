import { Link, Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import NavBar from './NavBar';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

function MainLayout({ routes }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('logo')}>
                    <div className={cx('logo-side')}>
                        {/* <Link to={'/'}> */}
                            <img src={require('../../assets/images/BC_logo1.png')} alt="BC_LOGO" />
                        {/* </Link> */}
                    </div>
                    <div>
                        <span>Blood</span>
                        <span>Comunity</span>
                    </div>
                </div>
                <div className={cx('navlink')}>
                    <SideBar routes={routes} />
                </div>
                <div className={cx('image')}>
                    <img src={require('../../assets/images/Quan_png_0.png')} alt="" />
                </div>
            </div>
            <div className={cx('navbar')}>
                <NavBar />
            </div>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
