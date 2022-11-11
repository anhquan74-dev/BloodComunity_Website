import { DataGrid } from '@mui/x-data-grid';
import { hospitalColumns, donorColumns, recipientColumns } from '../../services/data';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './DataTable.scss';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDonor } from '../../redux/actions/donorManage';
import { fetchAllRecipient } from '../../redux/actions/recipientManage';
import { deleteUser, fetchAllHospital, fetchHospitalById } from '../../redux/actions/hospitalManage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BeatLoader from 'react-spinners/BeatLoader';

const DataTable = (props) => {
    let columns = [];
    let listUsers = [];
    let title = '';

    const dispatch = useDispatch();
    const listHospitals = useSelector((state) => state.users.listHospitals);
    const listDonors = useSelector((state) => state.users.listDonors);
    const listRecipients = useSelector((state) => state.users.listRecipients);
    const isLoading = useSelector((state) => state.users.isLoading);
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
            title = 'thông tin người hiến máu';
            listUsers = listDonors;
            columns = donorColumns;
            break;
        case 'recipient':
            title = 'thông tin người nhận máu';
            listUsers = listRecipients;
            columns = recipientColumns;
            break;
        case 'hospital':
            title = 'thông tin bệnh viện';
            listUsers = listHospitals;
            columns = hospitalColumns;
            break;
        default:
            break;
    }
    console.log(listUsers);

    const handleDelete = (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xoá!`) === true) {
            dispatch(deleteUser(id));
        }
    };

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
                            <div className="viewButton">
                                <VisibilityIcon />
                            </div>
                        </NavLink>
                        <NavLink
                            to={`/admin/manage_${props.role}/editUser/${params.row.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="editButton">
                                <EditIcon />
                            </div>
                        </NavLink>
                        <div
                            className="deleteButton"
                            onClick={() => {
                                handleDelete(params.row.id);
                            }}
                        >
                            <DeleteIcon />
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Quản lý {title}
                {props.role === 'hospital' && (
                    <NavLink to="/admin/manage_hospital/addUser" className="link">
                        Thêm mới
                    </NavLink>
                )}
            </div>
            {isLoading ? (
                <div className="datatable-spinner">
                    <BeatLoader color="#36d7b7" size={10} aria-label="Loading Spinner" data-testid="loader" />
                </div>
            ) : (
                <DataGrid
                    className="datagrid"
                    rows={listUsers || []}
                    columns={columns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                />
            )}
        </div>
    );
};

export default DataTable;
