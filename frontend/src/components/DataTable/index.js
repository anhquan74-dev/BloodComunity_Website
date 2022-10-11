import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../services/data';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './DataTable.scss'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'

const DataTable = () => {
    const [data, setData] = useState(userRows);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: 'none' }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    const showToast = () => {
        toast.success('Thanh cong!')
    }

    const dispatch = useDispatch();
    const listHospitals = useSelector((state) => state.hospital.listHospitals)

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New User
                {/* <Link to="/users/new" className="link">
                    Add New
                </Link> */}
                <button className="link" onClick={showToast}>
                    Add New
                </button>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default DataTable;
