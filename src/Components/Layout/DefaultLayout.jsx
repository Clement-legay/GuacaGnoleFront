import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const DefaultLayout = ({children}) => {

    return (
        <div className={'h-screen w-screen flex'}>
            <NavBar/>
            {children}
        </div>


    );
};

export default DefaultLayout;