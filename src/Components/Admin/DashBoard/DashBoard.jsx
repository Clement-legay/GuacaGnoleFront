import { Card, Grid, useTheme } from '@mui/material';
import {Fragment} from 'react';
import { ContentBox, Title, SubTitle } from '../../../Styles/Admin/Dashboard/DashBoard';
import Campaigns from './Shared/Campaigns';
import DoughnutChart from './Shared/Doughnut';
import StatCards from './Shared/StatCards';
import StatCards2 from './Shared/StatCards2';
import TopSellingTable from './Shared/TopSellingTable';

const DashBoard = () => {
    const { palette } = useTheme();
    return (
        <Fragment>
            <ContentBox className="analytics">
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
                            <Title>Traffic Sources</Title>
                            <SubTitle>Last 30 days</SubTitle>

                            <DoughnutChart
                                height="300px"
                                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
                            />
                        </Card>
                        <Campaigns palette={palette} />
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    );
};

export default DashBoard;
