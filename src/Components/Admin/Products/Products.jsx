import {Fragment, useContext, useEffect, useState} from "react";
import {MainContext} from "../../../Context/MainContext";
import {Card, CardContent, Grid} from "@mui/material";
import DataTable from "../PagePart/DataTable";
import EchartGraph from "../PagePart/EchartGraph";
import ManageProductDialog from "./Component/ManageProductDialog";

const Products = () => {
    const { products, fetchProducts, setRouteName, deleteProduct } = useContext(MainContext);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setRouteName("Products");
    }, [setRouteName]);

    return (
        <Fragment>
            <Grid container style={{padding:"50px"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={10}>
                        <Card sx={{ px: 3, py: 2, mb: 3, borderRadius: "10px" }}>
                            <EchartGraph data={products} selected={selected} chartOptions={chartOptions} height={300} />

                            <CardContent>
                                <DataTable
                                    data={products}
                                    columns={columns}
                                    fetch={fetchProducts}
                                    deleteRequest={deleteProduct}
                                    selected={selected}
                                    setSelected={setSelected}
                                    DialogManage={ManageProductDialog}
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
        id: "imageUrl",
        label: "Image",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: false,
        format: (url) => {
            return <img src={url} alt="offer" style={{width: "50px", height: "50px"}}/>
        }
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
        id: "alcoholDegree",
        label: "Degree",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        format: (value) => {
            return value + "%";
        },
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.alcoholDegree - b.alcoholDegree;
                } else {
                    return b.alcoholDegree - a.alcoholDegree;
                }
            });
        },
    },
    {
        id: "millesime",
        label: "Millesime",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.millesime - b.millesime;
                } else {
                    return b.millesime - a.millesime;
                }
            });
        },
    },
    {
        id: "price",
        label: "Price",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        format: (value) => {
            return value + "€";
        },
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
        },
    },
    {
        id: "stock",
        label: "Stock",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.stock - b.stock;
                } else {
                    return b.stock - a.stock;
                }
            });
        },
    },
    {
        id: "alcoholTypeId",
        label: "Type",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.alcoholTypeId - b.alcoholTypeId;
                } else {
                    return b.alcoholTypeId - a.alcoholTypeId;
                }
            });
        },
    },
    // {
    //     id: "appellationId",
    //     label: "Appellation",
    //     minWidth: 50,
    //     align: "left",
    // },
    // {
    //     id: "domainId",
    //     label: "Domain",
    //     minWidth: 50,
    //     align: "left",
    // },
    // {
    //     id: "furnisherId",
    //     label: "Supplier",
    //     minWidth: 50,
    //     align: "left",
    // },
    // {
    //     id: "productId",
    //     label: "Product",
    //     minWidth: 50,
    //     align: "left",
    // },
    // {
    //     id: "reference",
    //     label: "Reference",
    //     minWidth: 50,
    //     align: "left",
    // },
    // {
    //     id: "regionId",
    //     label: "Region",
    //     minWidth: 50,
    //     align: "left",
    // },
];

const chartOptions = {
    title: "Products",
    type: "bar",
    dataName: "name",
    dataValue: "stock",
};


