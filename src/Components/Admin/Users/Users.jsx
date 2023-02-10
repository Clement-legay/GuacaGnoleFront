import {Fragment, useContext} from "react";
import {MainContext} from "../../../Context/MainContext";
import {Card, CardContent, Grid} from "@mui/material";
import DataTable from "../PagePart/DataTable";
import HorizontalBarGraph from "../PagePart/HorizontalBarGraph";

const Products = () => {
    const { products, fetchProducts, setRouteName } = useContext(MainContext);

    setRouteName("Products");

    return (
        <Fragment>
            <Grid container style={{padding:"50px"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={10}>
                        <Card sx={{ px: 3, py: 2, mb: 3, borderRadius: "10px" }}>
                            <HorizontalBarGraph data={products} height={300} />

                            <CardContent>
                                <DataTable
                                    data={products}
                                    columns={columns}
                                    fetch={fetchProducts}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Products;

const columns = [
    {
        id: "id",
        label: "Product",
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
        id: "alcoholDegree",
        label: "Degree",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    },
    {
        id: "millesime",
        label: "Millesime",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    },
    {
        id: "price",
        label: "Price",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    },
    {
        id: "stock",
        label: "Stock",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    },
    {
        id: "alcoholTypeId",
        label: "Type",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
    }
];