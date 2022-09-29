import Navigate from '../Navigate';

function SideBar({ routes }) {
    return (
        <>
            {routes.map((item, index) => {
                return (
                    <div>
                        <Navigate to={item.to} content={item.content} />
                    </div>
                );
            })}
        </>
    );
}

export default SideBar;
