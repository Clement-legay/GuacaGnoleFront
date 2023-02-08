import {Card, Grid, Typography} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

const CardsData = [
    {
        name: 'Active Users',
        icon: <TrendingUpIcon/>,
        color: 'success.main',
        amount: 3500,
        prevAmount: 3200,
        unit: "",
    },
    {
        name: 'Transactions',
        icon: <PaidOutlinedIcon/>,
        color: 'error.main',
        amount: 45000,
        prevAmount: 38000,
        unit: '€',
    }
];

const displayingNumbers = (number) => {

    if (number > 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number > 1000) {
        return (number / 1000).toFixed(1) + 'K';
    } else {
        return number;
    }
}

const calculatingPercentages = (amount, prevAmount) => {
    if (prevAmount === 0) {
        return 0;
    } else {
        return Math.round(((amount - prevAmount) / prevAmount) * 100);
    }
}


const StatCards2 = () => {
    return (
        <Grid container spacing={3} sx={{ mb: '24px' }} >
            {CardsData.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                    <Card elevation={2} sx={{p:3}} onClick={() => {
                        console.log(item.name, 'clicked');}
                    }
                    >
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography sx={{color: item.color}}>
                                    {item.icon}
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography sx={{color: item.color}}>
                                    {item.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant={"caption"} sx={{color: item.color, fontSize: "2em"}}>
                                    {displayingNumbers(item.amount) + " " + item.unit}
                                </Typography>
                                <Typography variant={"caption"} sx={{color: item.color, fontSize: "1em"}}>
                                    {" (" + calculatingPercentages(item.amount, item.prevAmount) + "%)"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            ))}
        </Grid>

    );
};

export default StatCards2;
