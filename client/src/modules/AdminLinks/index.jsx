import React from 'react';
import {Link} from 'react-router-dom';
import './AdminLinks.css';
import Redirect from 'react-router';

const AdminLinks = () => {
    if(localStorage.getItem("admin") !== "true")  {
        return <Redirect to={"/login"}/>
    }
    return (
        <div className="adminLinksBlock">
            <h1>Admin: {localStorage.getItem('login')}</h1>
            <Link className="adminLinks" to={"/admin/events/new"}>Создать событие</Link>
            <Link className="adminLinks" to={"/"}>Просмотреть зарегистрированных пользователей</Link>
            <Link className="adminLinks" to={"/"}>Просмотреть все актуальные ставки пользователей</Link>
        </div>
    );
};

export default AdminLinks;