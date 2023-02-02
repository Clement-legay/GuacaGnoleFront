import React from 'react';
import requestAPI from "../../Utils/axios";

const DashBoard = () => {
    const appellations = requestAPI("GET", "/Appellation").then((response) => {
        console.log(response.data);
        return response.data;
    });

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Appellations: {appellations}</p>
        </div>
    );
};

export default DashBoard;