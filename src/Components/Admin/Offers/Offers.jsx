import {Fragment, useContext, useEffect, useState} from "react";
import {MainContext} from "../../../Context/MainContext";
import {Card, CardContent, Grid} from "@mui/material";
import DataTable from "../PagePart/DataTable";
import EchartGraph from "../PagePart/EchartGraph";
import ManageOfferDialog from "./Component/ManageOfferDialog";

const Offers = () => {
    const { offers, fetchOffers, setRouteName, deleteOffer } = useContext(MainContext);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setRouteName("Offers");
    }, [setRouteName]);

    return (
        <Fragment>
            <Grid container style={{padding:"50px"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={10}>
                        <Card sx={{ px: 3, py: 2, mb: 3, borderRadius: "10px" }}>
                            <EchartGraph data={offers} selected={selected} chartOptions={chartOptions} height={300} />

                            <CardContent>
                                <DataTable
                                    data={offers}
                                    columns={columns}
                                    fetch={fetchOffers}
                                    deleteRequest={deleteOffer}
                                    selected={selected}
                                    setSelected={setSelected}
                                    DialogManage={ManageOfferDialog}
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
        id: "description",
        label: "Description",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        format: (text) => {
            return text.length > 50 ? text.substring(0, 50) + "..." : text;
        },
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.description.localeCompare(b.description);
                } else {
                    return b.description.localeCompare(a.description);
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
        format: (text) => {
            return text + " €";
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
        id: "productOffers",
        label: "Products",
        minWidth: 70,
        align: "center",
        disablePadding: false,
        sortable: false,
        format: (text) => {
            return text.length > 0 ? text.map((product, index) => {
                return <div key={index}>{product.product.name}</div>
            }) : "No products";
        }
    },
    {
        id: "deadline",
        label: "Deadline",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        format: (text) => {
            return new Date(text).toLocaleDateString();
        },
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return new Date(a.deadline) - new Date(b.deadline);
                } else {
                    return new Date(b.deadline) - new Date(a.deadline);
                }
            });
        },
    },
    {
        id: "isB2B",
        label: "B2B",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        format: (text) => {
            return text ? "Yes" : "No";
        },
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.isB2B - b.isB2B;
                } else {
                    return b.isB2B - a.isB2B;
                }
            });
        },
    },
    {
        id: "isDraft",
        label: "Draft",
        minWidth: 50,
        align: "center",
        disablePadding: false,
        sortable: true,
        format: (text) => {
            return text ? "Yes" : "No";
        },
        sortFunction: (data, order) => {
            return data.sort((a, b) => {
                if (order === "asc") {
                    return a.isDraft - b.isDraft;
                } else {
                    return b.isDraft - a.isDraft;
                }
            });
        },
    }
];

const chartOptions = {
    title: "Offers",
    type: "bar",
    dataName: "name",
    dataValue: "price",
};

