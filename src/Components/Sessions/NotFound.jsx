import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {IMG, JustifyBox, NotFoundRoot} from "../../Styles/Sessions/NotFound";


const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundRoot>
      <JustifyBox>
        <IMG src="/assets/img/illustrations/404.svg" alt="" />

        <Button
          color="primary"
          variant="contained"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </JustifyBox>
    </NotFoundRoot>
  );
};

export default NotFound;
