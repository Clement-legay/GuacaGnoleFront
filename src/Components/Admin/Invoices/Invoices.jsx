import {Fragment, useContext, useEffect, useState} from "react";
import {MainContext} from "../../../Context/MainContext";
import {Card, CardContent, Grid, Button} from "@mui/material";
import DataTable from "../PagePart/DataTable";
import EchartGraph from "../PagePart/EchartGraph";
import ManageInvoiceDialog from "./Component/ManageInvoiceDialog";

const Invoices = () => {
    const { invoices, fetchInvoices, setRouteName, deleteInvoices, fetchInvoicePdf } = useContext(MainContext);
    const [selected, setSelected] = useState([]);
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
            label: "InvoiceNumber",
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
            id: "invoicesFurnisherProduct",
            label: "Products",
            minWidth: 50,
            align: "center",
            disablePadding: false,
            format: (text) => {
                return text.length > 0 ? text.map((product, index) => {
                    return <div key={index}>{product.product.name}</div>
                }) : "No products";
            }
        },
        {
            id: "furnisherId",
            label: "furnisherId",
            minWidth: 50,
            align: "center",
            disablePadding: false
        },
        {
            id: "date",
            label: "date",
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
            id: "id",
            label: "PDF",
            field: "button",
            format: (id) => {
                return (
                    <Button onClick={(event) => {
                        event.stopPropagation();
                        fetchInvoicePdf(id);                    
                    }}
                    variant="contained">
                       pdf
                    </Button>
                )
            }
        }
    
    ];

    useEffect(() => {
        setRouteName("Invoices");

    }, [setRouteName]);
    console.log("logloglog ", fetchInvoices());
    return (
        <Fragment>
            <Grid container style={{padding:"50px"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={10}>
                        <Card sx={{ px: 3, py: 2, mb: 3, borderRadius: "10px" }}>
                            {/* <EchartGraph data={invoices} selected={selected} height={300} /> */}

                            <CardContent>
                                <DataTable
                                    data={invoices}
                                    columns={columns}
                                    fetch={fetchInvoices}
                                    deleteRequest={deleteInvoices}
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


const chartOptions = {
    title: "Invoices",
    type: "pie",
    dataName: "number",
    dataValue: "siret",
};
