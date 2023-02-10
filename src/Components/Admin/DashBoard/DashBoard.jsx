import {Card, Grid, Typography} from '@mui/material';
import {Fragment, useContext} from 'react';
import Campaigns from './Shared/Campaigns';
import DoughnutChart from './Shared/Doughnut';
import StatCards from './Shared/StatCards';
import StatCards2 from './Shared/StatCards2';
import TopSellingTable from './Shared/TopSellingTable';
import {useTheme} from "@mui/material/styles";
import {MainContext} from "../../../Context/MainContext";

const DashBoard = () => {
    const { palette } = useTheme();
    const { setRouteName } = useContext(MainContext);

    setRouteName("DashBoard");


    return (
        <Fragment>
            <Grid container style={{padding:"50px"}}>
                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <StatCards />
                        <TopSellingTable />
                        <StatCards2 />

                        {/*<H4>Ongoing Projects</H4>*/}
                        {/*<RowCards />*/}
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card sx={{ px: 3, py: 2, mb: 3 }}>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                                Traffic Sources
                            </Typography>
                            <Typography variant="body2" sx={{ color: palette.grey[500] }}>
                                Last 30 days
                            </Typography>

                            <DoughnutChart
                                height="300px"
                                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
                            />
                        </Card>
                        <Campaigns />
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default DashBoard;
