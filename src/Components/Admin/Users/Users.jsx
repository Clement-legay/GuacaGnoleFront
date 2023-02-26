import {Fragment, useContext, useEffect, useState} from "react";
import {MainContext} from "../../../Context/MainContext";
import {Card, CardContent, Grid} from "@mui/material";
import DataTable from "../PagePart/DataTable";
import EchartGraph from "../PagePart/EchartGraph";
import ManageUserDialog from "./Component/ManageUserDialog";

const Users = () => {
    const { users, fetchUsers, setRouteName, deleteUser } = useContext(MainContext);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setRouteName("Users");
    }, [setRouteName]);

    return (
        <Fragment>
            <Grid container style={{padding:"50px"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={10}>
                        <Card sx={{ px: 3, py: 2, mb: 3, borderRadius: "10px" }}>
                            <EchartGraph data={users} selected={selected} chartOptions={chartOptions} height={300} />

                            <CardContent>
                                <DataTable
                                    data={users}
                                    columns={columns}
                                    fetch={fetchUsers}
                                    deleteRequest={deleteUser}
                                    selected={selected}
                                    setSelected={setSelected}
                                    DialogManage={ManageUserDialog}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Users;

const columns = [
    {
        id: "id",
        label: "id",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.id - b.id;
                } else {
                    return b.id - a.id;
                }
            });
        },
    },
    {
        id: "roleId",
        label: "Role",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        format: (value) => {
            return value === 1 ? "Admin" : value === 2 ? "User" : "Pro";
        },
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.roleId - b.roleId;
                } else {
                    return b.roleId - a.roleId;
                }
            });
        },
    },
    {
        id: "username",
        label: "Username",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.username.localeCompare(b.username);
                } else {
                    return b.username.localeCompare(a.username);
                }
            });
        },
    },
    {
        id: "firstName",
        label: "First Name",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.firstName.localeCompare(b.firstName);
                } else {
                    return b.firstName.localeCompare(a.firstName);
                }
            });
        },
    },
    {
        id: "lastName",
        label: "Last Name",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.lastName.localeCompare(b.lastName);
                } else {
                    return b.lastName.localeCompare(a.lastName);
                }
            });
        },
    },
    {
        id: "email",
        label: "Email",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.email.localeCompare(b.email);
                } else {
                    return b.email.localeCompare(a.email);
                }
            });
        },
    },
    {
        id: "phone",
        label: "Phone",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.phone.localeCompare(b.phone);
                } else {
                    return b.phone.localeCompare(a.phone);
                }
            });
        },
    },
    {
        id: "role",
        label: "Role",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.role.localeCompare(b.role);
                } else {
                    return b.role.localeCompare(a.role);
                }
            });
        },
    }
];

const chartOptions = {
    title: "Users",
    type: "bar",
    dataName: "username",
    dataValue: "phone",
};