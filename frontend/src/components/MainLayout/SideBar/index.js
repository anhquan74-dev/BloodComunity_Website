import Navigate from '../Navigate';

function SideBar({ routes }) {
    return (
        <>
            {routes.map((item, index) => {
                return (
                        <Navigate to={item.to} content={item.content} />
                );
            })}
        </>
    );
}

export default SideBar;
