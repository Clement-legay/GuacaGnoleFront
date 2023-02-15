import {Fragment, useContext, useEffect, useState} from "react";
import {MainContext} from "../../../Context/MainContext";
import {Card, CardContent, Grid} from "@mui/material";
import DataTable from "../PagePart/DataTable";
import EchartGraph from "../PagePart/EchartGraph";
import ManageSupplierDialog from "./Component/ManageSupplierDialog";

const Offers = () => {
    const { suppliers, fetchSuppliers, setRouteName, deleteSupplier } = useContext(MainContext);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setRouteName("Suppliers");
    }, [setRouteName]);

    return (
        <Fragment>
            <Grid container style={{padding:"50px"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={10}>
                        <Card sx={{ px: 3, py: 2, mb: 3, borderRadius: "10px" }}>
                            <EchartGraph data={suppliers} selected={selected} chartOptions={chartOptions} height={300} />

                            <CardContent>
                                <DataTable
                                    data={suppliers}
                                    columns={columns}
                                    fetch={fetchSuppliers}
                                    deleteRequest={deleteSupplier}
                                    selected={selected}
                                    setSelected={setSelected}
                                    dialogCreate={ManageSupplierDialog}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Offers;

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
        id: "name",
        label: "Name",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });
        },
    },
    {
        id: "city",
        label: "City",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.city.localeCompare(b.city);
                } else {
                    return b.city.localeCompare(a.city);
                }
            });
        },
    },
    {
        id: "street",
        label: "Street",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: false,
    },
    {
        id: "postalCode",
        label: "Postal Code",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.postalCode - b.postalCode;
                } else {
                    return b.postalCode - a.postalCode;
                }
            });
        },
    },
    {
        id: "siret",
        label: "Siret Num",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: false,
    },
];

const chartOptions = {
    title: "Suppliers",
    type: "pie",
    dataName: "name",
    dataValue: "siret",
};
