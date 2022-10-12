import { DataGrid } from '@mui/x-data-grid';
import { hospitalColumns, donorColumns, recipientColumns } from '../../services/data';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './DataTable.scss';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDonor } from '../../redux/actions/donorManage';
import { fetchAllRecipient } from '../../redux/actions/recipientManage';
import { fetchAllHospital } from '../../redux/actions/hospitalManage';

const DataTable = (props) => {
    let columns = [];
    let listUsers = [];

    const dispatch = useDispatch();
    const listHospitals = useSelector((state) => state.users.listHospitals);
    const listDonors = useSelector((state) => state.users.listDonors);
    const listRecipients = useSelector((state) => state.users.listRecipients);

    useEffect(() => {
        switch (props.role) {
            case 'donor':
                dispatch(fetchAllDonor());
                break;
            case 'recipient':
                dispatch(fetchAllRecipient());
                break;
            case 'hospital':
                dispatch(fetchAllHospital());
                break;
            default:
                break;
        }
    }, []);

    switch (props.role) {
        case 'donor':
            listUsers = listDonors;
            columns = donorColumns;
            break;
        case 'recipient':
            listUsers = listRecipients;
            columns = recipientColumns;
            break;
        case 'hospital':
            listUsers = listHospitals;
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
                        <NavLink
                            to={`/admin/manage_${props.role}/viewUser/${params.row.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="viewButton">View</div>
                        </NavLink>
                        <NavLink
                            to={`/admin/manage_${props.role}/editUser/${params.row.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="editButton">Edit</div>
                        </NavLink>
                        <div className="deleteButton">Delete</div>
                    </div>
                );
            },
        },
    ];

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
                rows={listUsers || []}
                columns={columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default DataTable;
