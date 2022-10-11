import { Routes, Route } from "react-router-dom";
import DataTable from "../../DataTable";
import DonorRank from "../../DonorRank";

function ManageDonor() {
    return (
        <>
            <Routes>
                <Route path="/admin/manage_donor/profile" element={<DonorRank />}>

                </Route>
            </Routes>
            <DataTable />
        </>
    );
}

export default ManageDonor;
