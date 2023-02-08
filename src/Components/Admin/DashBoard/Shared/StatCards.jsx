import {Box, Card, Grid, styled} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Small } from '../../PagePart/Typography';

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  const cardList = [
    { name: 'New Leads', amount: 3050, icon: <InventoryIcon/> },
    { name: 'This week Sales', amount: '$80,500', icon: <AttachMoneyIcon/> },
    { name: 'Inventory Status', amount: '8.5% Stock Surplus', icon: <StoreIcon/> },
    { name: 'Orders to deliver', amount: '305 Orders', icon: <ShoppingCartIcon/> },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Card elevation={2} sx={{p:3}} onClick={() => {
            console.log(item.name, 'clicked');}
          }>
            <ContentBox>
              {item.icon}
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
