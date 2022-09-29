import { NavLink } from 'react-router-dom';

function Navigate({ to, content }) {
    return (
        <>
            <NavLink to={to}>{content}</NavLink>
        </>
    );
}

export default Navigate;
