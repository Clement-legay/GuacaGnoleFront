import React from 'react';
import {BsArrowLeftCircleFill} from "react-icons/bs";

const NavBar = () => {
    return (
        <div className={"flex"}>
            <div className={"bg-dark-blue h-screen p-5 pt-8 w-52 relative"}>
                <BsArrowLeftCircleFill className={"bg-white text-dark-purple text-3xl rounded-full absolute "}/>
            </div>
            <div className={"p-7"}>
                <h1 className={"text-3xl font-bold"}>Dashboard</h1>
            </div>
        </div>
    );
};

export default NavBar;