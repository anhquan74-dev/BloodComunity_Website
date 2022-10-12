import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import HospitalPage from './pages/HospitalPage';
import DonorPage from './pages/DonorPage';
import RecipientPage from './pages/RecipientPage';
import Dashboard from './components/RoleAdmin/Dashboard';
import ManageHospital from './components/RoleAdmin/ManageHospital';
import ManageDonor from './components/RoleAdmin/ManageDonor';
import ManageRecipient from './components/RoleAdmin/ManageRecipient';
import ManageAdmin from './components/RoleAdmin/ManageAdmin';
import ManageSchedule from './components/RoleHospital/ManageSchedule';
import ManageEvents from './components/RoleHospital/ManageEvents';
import Account from './components/RoleHospital/Account';
import ViewBloodRequest from './components/RoleDonor/ViewBloodRequest';
import Donate from './components/RoleDonor/Donate';
import ManageDonateSchedule from './components/RoleDonor/ManageDonateSchedule';
import DonateEvents from './components/RoleDonor/DonateEvents';
import DonorRank from './components/DonorRank';
import BloodRequest from './components/RoleRecipient/BloodRequest';
import ManageBloodRequest from './components/RoleRecipient/ManageBloodRequest';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditHospital from './components/RoleAdmin/ManageHospital/EditHospital';
import AddNewHospital from './components/RoleAdmin/ManageHospital/AddNewHospital';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" exact element={<LandingPage />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/admin" element={<AdminPage />}>
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="manage_hospital" element={<ManageHospital />} />
                        <Route path="manage_hospital/editUser/:id" element={<EditHospital />} />
                        <Route path="manage_hospital/addUser" element={<AddNewHospital />} />
                        <Route path="manage_donor" element={<ManageDonor />} />
                        <Route path="manage_recipient" element={<ManageRecipient />} />
                        <Route path="manage_admin" element={<ManageAdmin />} />
                    </Route>
                    <Route path="/hospital" element={<HospitalPage />}>
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="manage_schedule" element={<ManageSchedule />} />
                        <Route path="manage_events" element={<ManageEvents />} />
                        <Route path="account" element={<Account />} />
                    </Route>
                    <Route path="/donor" element={<DonorPage />}>
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="blood_request" element={<ViewBloodRequest />} />
                        <Route path="donate" element={<Donate />} />
                        <Route path="manage_schedule" element={<ManageDonateSchedule />} />
                        <Route path="events" element={<DonateEvents />} />
                        <Route path="reward" element={<DonorRank />} />
                        <Route path="account" element={<Account />} />
                    </Route>
                    <Route path="/recipient" element={<RecipientPage />}>
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="blood_request" element={<BloodRequest />} />
                        <Route path="manage_request" element={<ManageBloodRequest />} />
                        <Route path="reward" element={<DonorRank />} />
                        <Route path="account" element={<Account />} />
                    </Route>
                </Routes>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;
