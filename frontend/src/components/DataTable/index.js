import { DataGrid } from '@mui/x-data-grid';
import { hospitalColumns, userColumns } from '../../services/data';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './DataTable.scss'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllHospital } from '../../redux/actions/actions';

const DataTable = (props) => {

    let columns;
    switch (props.role) {
        case 'user':
            columns = userColumns;
            break;
        case 'hospital':
            columns = hospitalColumns;
            break;
        default:

            break;
    }

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <NavLink to={`/admin/manage_hospital/editUser/${params.row.id}`} style={{ textDecoration: 'none' }}>
                            <div className="viewButton">Edit</div>
                        </NavLink>
                        <div className="deleteButton">
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    const dispatch = useDispatch();
    const listHospitals = useSelector((state) => state.hospital.listHospitals)

    useEffect(() => {
        dispatch(fetchAllHospital());
    }, [])

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New User
                <NavLink to="/admin/manage_hospital/addUser" className="link">
                    Add New
                </NavLink>
                {/* <button className="link" >
                    Add New
                </button> */}
            </div>
            <DataGrid
                className="datagrid"
                rows={listHospitals || []}
                columns={columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default DataTable;
