import React from 'react';
import SideBar from "../SideBar/SideBar";
import {SLayout, SMain} from "../../Styles/Layout/styles";

const DefaultLayout = ({children}) => {

    return (
        <SLayout>
            <SideBar/>
            <SMain>{children}</SMain>
        </SLayout>


    );
};

export default DefaultLayout;