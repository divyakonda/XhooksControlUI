import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
// useDispatch
// import { getSmartContractList } from '../../store/smartContractSlice';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px'
    // minHeight: '100vh',
    // window.innerHeight
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(0)
  }
}));

const Home = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const list = useSelector(({ smartContract }) => smartContract.smartContractList);

  console.log(list);
  useEffect(() => {
    // dispatch(getSmartContractList());
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid
        container
        direction="row"
        sx={{ mb: 2, p: 2 }}
        justifyContent="space-between"
        alignItems="baseline">
        <Grid xs={12} md={4} item></Grid>
        <Grid xs={12} md={4} item></Grid>
        <Grid xs={12} md={4} sx={{ mt: 1 }} item></Grid>
      </Grid>
    </div>
  );
};

export default Home;
