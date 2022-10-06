import { NavLink } from 'react-router-dom';
import styles from './Navigate.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Navigate({ to, content }) {
    return (
        <>
            <NavLink
                to={to}
                className={({ isActive }) => {
                    return isActive ? cx('active') : cx('link');
                }}
            >
                <div>{content}</div>
            </NavLink>
        </>
    );
}

export default Navigate;
