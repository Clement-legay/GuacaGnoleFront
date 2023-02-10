import {Fragment, useContext} from "react";
import {MainContext} from "../../../Context/MainContext";
import {Card, CardContent, Grid} from "@mui/material";
import DataTable from "../PagePart/DataTable";
import HorizontalBarGraph from "../PagePart/HorizontalBarGraph";

const Users = () => {
    const { users, fetchUsers, setRouteName } = useContext(MainContext);

    setRouteName("Users");

    return (
        <Fragment>
            <Grid container style={{padding:"50px"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={10}>
                        <Card sx={{ px: 3, py: 2, mb: 3, borderRadius: "10px" }}>
                            <HorizontalBarGraph data={users} height={300} />

                            <CardContent>
                                <DataTable
                                    data={users}
                                    columns={columns}
                                    fetch={fetchUsers}
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
        label: "User",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: false,
    },
    {
        id: "username",
        label: "Username",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    },
    {
        id: "firstName",
        label: "First Name",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    },
    {
        id: "lastName",
        label: "Last Name",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    },
    {
        id: "email",
        label: "Email",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    },
    {
        id: "phone",
        label: "Phone",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    },
    {
        id: "role",
        label: "Role",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    }
];