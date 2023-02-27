import {Fragment, useContext, useEffect, useState} from "react";
import {MainContext} from "../../../Context/MainContext";
import {Card, CardContent, Grid} from "@mui/material";
import DataTable from "../PagePart/DataTable";
import EchartGraph from "../PagePart/EchartGraph";
import ManageInvoiceDialog from "./Component/ManageInvoiceDialog";

const Invoices = () => {
    const { invoices, fetchInvoices, setRouteName, deleteInvoice } = useContext(MainContext);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setRouteName("Invoices");
    }, [setRouteName]);

    return (
        <Fragment>
            <Grid container style={{padding:"50px"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={10}>
                        <Card sx={{ px: 3, py: 2, mb: 3, borderRadius: "10px" }}>
                            <EchartGraph data={invoices} selected={selected} chartOptions={chartOptions} height={300} />

                            <CardContent>
                                <DataTable
                                    data={invoices}
                                    columns={columns}
                                    fetch={fetchInvoices}
                                    deleteRequest={deleteInvoice}
                                    selected={selected}
                                    setSelected={setSelected}
                                    DialogManage={ManageInvoiceDialog}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Invoices;

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
        id: "invoiceNumber",
        label: "number",
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
        id: "date",
        label: "Date",
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
    }
];

const chartOptions = {
    title: "Invoices",
    type: "pie",
    dataName: "invoiceNumber",
    dataValue: "siret",
};
