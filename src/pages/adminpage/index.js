import React, { useState } from "react";
import "./style.css"
import ChooseManagement from "../../components/adminpage/choosemanagement";
import ManageQuestion from "../../components/adminpage/managequestion";
import ManageSubject from "../../components/adminpage/managesubject";
import ManagePlayer from "../../components/adminpage/manageplayer";
import ManageAdmin from "../../components/adminpage/manageadmin";

const AdminPage = () => {
    const [currentTab, setCurrentTab] = useState('Quản lý câu hỏi');

    const renderTab = () => {
        switch (currentTab) {
            case 'Quản lý chủ đề':
                return <ManageSubject />;
            case 'Quản lý câu hỏi':
                return <ManageQuestion />;
            case 'Quản lý người chơi':
                return <ManagePlayer />;
            case 'Quản lý quản trị viên':
                return <ManageAdmin />;
            default:
                return <ManageQuestion />;
        }
    };

    return (
        <div className="row adminpage-main">
            <ChooseManagement setCurrentTab={setCurrentTab} currentTab={currentTab} />
            {renderTab()}
        </div>
    )
}

export default AdminPage;
