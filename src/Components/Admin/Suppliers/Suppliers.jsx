import {Fragment, useContext} from "react";
import {MainContext} from "../../../Context/MainContext";
import {Card, CardContent, Grid} from "@mui/material";
import DataTable from "../PagePart/DataTable";
import HorizontalBarGraph from "../PagePart/HorizontalBarGraph";

const Suppliers = () => {
    const { suppliers, fetchSuppliers, setRouteName } = useContext(MainContext);

    setRouteName("Suppliers");

    return (
        <Fragment>
            <Grid container style={{padding:"50px"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={10}>
                        <Card sx={{ px: 3, py: 2, mb: 3, borderRadius: "10px" }}>
                            <HorizontalBarGraph data={suppliers} height={300} />

                            <CardContent>
                                <DataTable
                                    data={suppliers}
                                    columns={columns}
                                    fetch={fetchSuppliers}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Suppliers;

const columns = [
    {
        id: "id",
        label: "Supplier",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: false,
    },
    {
        id: "name",
        label: "Name",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    },
    {
        id: "city",
        label: "City",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    },
    {
        id: "street",
        label: "Street",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    },
    {
        id: "postalCode",
        label: "Postal Code",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    },
    {
        id: "siret",
        label: "Siret Num",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    },
];


