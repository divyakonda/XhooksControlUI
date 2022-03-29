import React, { useRef, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Xarrow from 'react-xarrows';
import Draggable from 'react-draggable';
import Button from '@mui/material/Button';
import { useForm } from '../../components/hooks';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '../../components/formsy';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import { createSmartContract, testSmartContract } from '../../store/smartContractSlice';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // margin: '20px'
    minHeight: '100%'
  },
  fileGen: {
    marginLeft: '10px'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(0)
  },
  connectPoint: {
    opacity: 0.2
  },
  'connectPoint:hover': {
    opacity: 0.6
  }
}));

const connectPointStyle = {
  position: 'absolute',
  width: 15,
  height: 15,
  borderRadius: '50%',
  background: 'black'
};

const connectPointOffset = {
  left: { left: 0, top: '50%', transform: 'translate(-50%, -50%)' },
  right: { left: '100%', top: '50%', transform: 'translate(-50%, -50%)' },
  top: { left: '50%', top: 0, transform: 'translate(-50%, -50%)' },
  bottom: { left: '50%', top: '100%', transform: 'translate(-50%, -50%)' }
};

const ConnectPointsWrapper = (props) => {
  const { boxId, handler, dragRef, boxRef } = props;
  const ref1 = useRef();
  const classes = useStyles();
  const theme = useTheme();
  const open = useSelector(({ auth }) => auth.user.open);

  const [position, setPosition] = useState({});
  const [beingDragged, setBeingDragged] = useState(false);
  return (
    <React.Fragment>
      <Box
        className={classes.connectPoint}
        sx={{
          ...connectPointStyle,
          ...connectPointOffset[handler],
          ...position
        }}
        draggable
        onMouseDown={(e) => e.stopPropagation()}
        onDragStart={(e) => {
          setBeingDragged(true);
          e.dataTransfer.setData('arrow', boxId);
        }}
        onDrag={(e) => {
          const { offsetTop, offsetLeft } = boxRef.current;
          const { x, y } = dragRef.current.state;
          setPosition({
            position: 'fixed',
            left: e.clientX - x - offsetLeft - (open ? 250 : 0),
            top: e.clientY - y - offsetTop - (open ? 8 : 0),
            transform: 'none',
            opacity: 0
          });
        }}
        ref={ref1}
        onDragEnd={() => {
          setPosition({});
          setBeingDragged(false);
        }}></Box>
      {beingDragged ? <Xarrow color={theme.palette.primary.main} start={boxId} end={ref1} /> : null}
    </React.Fragment>
  );
};

const BoxComponent = ({ text, handler, addArrow, setArrows, boxId, setFormData, setFormData1 }) => {
  const dragRef = useRef();
  const boxRef = useRef();
  const initialFields = {
    account_number: '',
    secret_key: '',
    condition: '1'
  };
  const { form, handleChange } = useForm(initialFields);
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);
  const [isFormValid1, setIsFormValid1] = useState(false);
  const formRef1 = useRef(null);
  const theme = useTheme();
  const loading1 = useSelector(({ loading }) => loading.loading1);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [status, setStatus] = useState(false);
  const [status1, setStatus1] = useState(false);
  const [toAccount, setToAccount] = useState('rfCarbonVNTuXckX6x2qTMFmFSnm6dEWGX');

  const disableButton = () => {
    setIsFormValid(false);
  };

  const enableButton = () => {
    setIsFormValid(true);
  };

  const closeFun = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    setOpenDialog(false);
    setFormData({ ...form });
    // setFormData1({ to_account: toAccount });
  };

  const disableButton1 = () => {
    setIsFormValid1(false);
  };

  const enableButton1 = () => {
    setIsFormValid1(true);
  };

  const handleSubmit1 = () => {
    setOpenDialog1(false);
    // setFormData({ ...form });
    setFormData1({ to_account: toAccount });
  };

  return (
    <>
      <Draggable
        ref={dragRef}
        onDrag={() => {
          // console.log(e);
          setArrows((arrows) => [...arrows]);
        }}>
        <Box
          sx={{
            p: 2,
            position: 'relative',
            border: '1px solid grey',
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            borderRadius: 3,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
              color: '#ffffff'
            }
          }}
          id={boxId}
          ref={boxRef}
          onClick={() => {
            if (status && boxId === 'box2_2') {
              setOpenDialog(true);
            } else if (status1 && boxId === 'box2_3') {
              setOpenDialog1(true);
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            if (e.dataTransfer.getData('arrow') === boxId) {
              // console.log(e.dataTransfer.getData('arrow'), boxId);
            } else {
              const refs = { start: e.dataTransfer.getData('arrow'), end: boxId };
              addArrow(refs);
              // console.log('droped!', refs);
              if (refs.start === 'box2_1' && refs.end === 'box2_2') {
                setStatus(true);
                setOpenDialog(true);
              } else if (refs.start === 'box2_2' && refs.end === 'box2_3') {
                setStatus1(true);
                setOpenDialog1(true);
              }
            }
          }}>
          {text}
          <ConnectPointsWrapper {...{ boxId, handler, dragRef, boxRef }} />
        </Box>
      </Draggable>
      <Dialog
        open={openDialog}
        fullWidth
        maxWidth="md"
        disableEscapeKeyDown={true}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: 'rounded-8'
        }}>
        <Toolbar>
          <Typography variant="h5" color="primary">
            From Account
          </Typography>
        </Toolbar>
        <Formsy
          onValidSubmit={handleSubmit}
          onValid={enableButton}
          onInvalid={disableButton}
          ref={formRef}
          name="registerForm">
          <Box
            sx={{
              '& .MuiTextField-root': { mb: 1, mt: 0.9 },
              '& .react-tel-input.focused': { borderColor: theme.palette.primary.main },
              ml: 1.5,
              mb: 1.5,
              mr: 1.5
            }}>
            <Paper sx={{ width: '100%', mb: 1, p: 3 }}>
              <TextFieldFormsy
                label="Account Number"
                id="account_number"
                name="account_number"
                value={form.account_number}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                // focused
                InputLabelProps={{
                  shrink: true
                }}></TextFieldFormsy>
              <TextFieldFormsy
                label="Secret Key"
                id="secret_key"
                name="secret_key"
                value={form.secret_key}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                // focused
                InputLabelProps={{
                  shrink: true
                }}></TextFieldFormsy>

              <TextFieldFormsy
                label="Condtion (%)"
                id="condition"
                name="condition"
                value={form.condition}
                onChange={handleChange}
                variant="outlined"
                required
                type="number"
                fullWidth
                disabled
                helperText={'Ex: 1%'}
                // focused
                InputLabelProps={{
                  shrink: true
                }}></TextFieldFormsy>
            </Paper>

            <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 0.5, px: 6 }}
                  type="submit"
                  // fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!isFormValid || loading1}
                  aria-label="Register"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  {loading1 ? <CircularProgress size={24} olor="inherit" /> : 'Save'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 0.5, px: 6 }}
                  // fullWidth
                  variant="contained"
                  onClick={() => closeFun()}
                  color="warning"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Formsy>
      </Dialog>
      <Dialog
        open={openDialog1}
        fullWidth
        maxWidth="md"
        disableEscapeKeyDown={true}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: 'rounded-8'
        }}>
        <Toolbar>
          <Typography variant="h5" color="primary">
            To Account
          </Typography>
        </Toolbar>
        <Formsy
          onValidSubmit={handleSubmit1}
          onValid={enableButton1}
          onInvalid={disableButton1}
          ref={formRef1}
          name="registerForm1">
          <Box
            sx={{
              '& .MuiTextField-root': { mb: 1, mt: 0.9 },
              '& .react-tel-input.focused': { borderColor: theme.palette.primary.main },
              ml: 1.5,
              mb: 1.5,
              mr: 1.5
            }}>
            <Paper sx={{ width: '100%', mb: 2, p: 3 }}>
              <TextFieldFormsy
                label="Account Number"
                id="toAccount"
                name="toAccount"
                disabled
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                variant="outlined"
                required
                fullWidth
                // focused
                InputLabelProps={{
                  shrink: true
                }}></TextFieldFormsy>
            </Paper>

            <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 0.5, px: 6 }}
                  type="submit"
                  // fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!isFormValid1}
                  aria-label="Register"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  {'Save'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 0.5, px: 6 }}
                  // fullWidth
                  variant="contained"
                  onClick={() => setOpenDialog1(false)}
                  color="warning"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Formsy>
      </Dialog>
    </>
  );
};

const SmartContract = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const loading3 = useSelector(({ loading }) => loading.loading3);
  const loading1 = useSelector(({ loading }) => loading.loading1);
  const loading2 = useSelector(({ loading }) => loading.loading2);
  const [arrows, setArrows] = useState([]);
  const addArrow = ({ start, end }) => {
    setArrows([...arrows, { start, end }]);
  };
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [carbonStatus, setCarbonStatus] = useState('');
  const initialFields = {
    transfer_account: '',
    transfer_amount: ''
  };
  const { form, handleChange } = useForm(initialFields);
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [testStatus, setTestStatus] = useState(false);
  const [runStatus, setRunStatus] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const setFormData = (state) => {
    setData(state);
  };

  const setFormData1 = (state) => {
    setData1(state);
  };

  useEffect(() => {}, []);

  const disableButton = () => {
    setIsFormValid(false);
  };

  const enableButton = () => {
    setIsFormValid(true);
  };

  const handleSubmit = () => {
    const target = { ...data, ...data1, type: carbonStatus, name: name, desc: desc };
    // console.log(target);
    dispatch(createSmartContract({ ...target, secret: target.secret_key })).then((res) => {
      if (res.payload.status) {
        setTestStatus(true);
        setRunStatus(true);
      }
    });
  };

  const handleTransfer = () => {
    setOpenDialog(true);
  };

  const handleSubmitTest = () => {
    const target = { ...form, ...data, ...data1 };
    const target1 = {
      ...data,
      ...data1,
      secret: target.secret_key,
      xrp_amount: target.transfer_amount,
      acc_address: target.transfer_account,
      type: carbonStatus,
      name: name,
      desc: desc
    };
    // console.log(target1);
    dispatch(testSmartContract(target1)).then((res) => {
      // console.log(res);
      if (res.payload.status) {
        setOpenDialog(false);
        setTestStatus(true);
      }
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          height: 64,
          backgroundColor: 'primary.dark'
        }}>
        <Grid container direction="row" sx={{ p: 2 }}>
          <Grid item>
            <Typography color="primary.contrastText" variant="h6" fontWeight={'bold'}>
              Create Smart Contract
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {loading3 && <LinearProgress color="warning" />}
      {carbonStatus === '' && (
        <Box>
          <Box sx={{ p: 5 }}>
            <TextField
              label="Name"
              sx={{ mb: 2 }}
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              required
              fullWidth
              // focused
              InputLabelProps={{
                shrink: true
              }}></TextField>
            <TextField
              label="Description"
              multiline
              rows={3}
              id="desc"
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              variant="outlined"
              fullWidth
              // focused
              InputLabelProps={{
                shrink: true
              }}></TextField>
          </Box>
          <RadioGroup
            row
            sx={{ mt: 2 }}
            margin="normal"
            type="radio"
            id="carbonStatus"
            name="carbonStatus"
            value={carbonStatus}
            onChange={(e) => setCarbonStatus(e.target.value)}
            variant="outlined">
            <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
              <Grid item>
                <FormControlLabel
                  value={'Carbon'}
                  control={<Radio />}
                  disabled={name === ''}
                  label={<Typography noWrap>{'Forward (Carbon)'}</Typography>}
                  sx={{ textTransform: 'capitalize' }}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value={'Firewall'}
                  control={<Radio />}
                  disabled
                  label={<Typography noWrap>{'Firewall'}</Typography>}
                  sx={{ textTransform: 'capitalize' }}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value={'Others'}
                  control={<Radio />}
                  disabled
                  label={<Typography noWrap>{'Others'}</Typography>}
                  sx={{ textTransform: 'capitalize' }}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </Box>
      )}
      {carbonStatus === 'Carbon' && (
        <>
          <Grid
            container
            direction="row"
            justifyContent={'space-evenly'}
            alignItems={'baseline'}
            spacing={5}
            sx={{ height: 200, mt: 6 }}>
            <Grid item>
              <BoxComponent
                text="Root"
                {...{
                  addArrow,
                  setArrows,
                  handler: 'right',
                  boxId: 'box2_1',
                  setFormData,
                  setFormData1
                }}
              />
            </Grid>
            <Grid item>
              <BoxComponent
                text="Forward"
                {...{
                  addArrow,
                  setArrows,
                  handler: 'left',
                  boxId: 'box2_2',
                  setFormData,
                  setFormData1
                }}
              />
            </Grid>
            <Grid item>
              <BoxComponent
                text="Account"
                {...{
                  addArrow,
                  setArrows,
                  handler: 'left',
                  boxId: 'box2_3',
                  setFormData,
                  setFormData1
                }}
              />
            </Grid>
            {arrows.map((ar) => (
              <Xarrow
                color={theme.palette.primary.main}
                start={ar.start}
                end={ar.end}
                key={ar.start + '-.' + ar.start}
              />
            ))}
            <br />
            <br />
          </Grid>
          <Box
            sx={{
              width: '100%'
            }}>
            <Grid container direction="row" justifyContent={'space-between'} sx={{ px: 3, py: 2 }}>
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 0.5, px: 4 }}
                  type="button"
                  color="inherit"
                  // fullWidth
                  onClick={() => setCarbonStatus('')}
                  variant="contained"
                  aria-label="Register"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  Back
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 0.5, px: 4 }}
                  type="button"
                  // fullWidth
                  onClick={() => handleSubmit()}
                  variant="contained"
                  color="primary"
                  disabled={!data || !data1 || loading1}
                  aria-label="Register"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  {loading1 ? <CircularProgress size={24} olor="inherit" /> : 'Deploy'}
                </Button>
                <Button
                  sx={{ mt: 1, mb: 0.5, px: 6, ml: 2 }}
                  type="button"
                  // fullWidth
                  onClick={() => handleTransfer()}
                  variant="contained"
                  color="primary"
                  disabled={!data || !data1 || loading2 || !runStatus}
                  aria-label="Register"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  {loading2 ? <CircularProgress size={24} olor="inherit" /> : 'Run'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {carbonStatus && testStatus && (
        <>
          <Box sx={{ pr: 3, pt: 2, pl: 3, pb: 3, border: '1px solid grey', mx: 3 }}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <Grid item>
                <Typography color="primary.main" variant="h5" fontWeight={'bold'}>
                  Transaction Successfull
                </Typography>
              </Grid>
            </Grid>
            <Typography color="secondary.main" variant="h6" fontWeight={'bold'}>
              Test Results:
            </Typography>
            <Typography
              variant="body2"
              component={'a'}
              target="_blank"
              href={`https://hooks-testnet-explorer.xrpl-labs.com/${data.account_number}`}>
              {`https://hooks-testnet-explorer.xrpl-labs.com/${data.account_number}`}
            </Typography>
          </Box>
        </>
      )}
      <Dialog
        open={openDialog}
        fullWidth
        maxWidth="md"
        disableEscapeKeyDown={true}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: 'rounded-8'
        }}>
        <Toolbar>
          <Typography variant="h5" color="primary">
            Transfer Amount
          </Typography>
        </Toolbar>
        <Formsy
          onValidSubmit={handleSubmitTest}
          onValid={enableButton}
          onInvalid={disableButton}
          ref={formRef}
          name="registerForm">
          <Box
            sx={{
              '& .MuiTextField-root': { mb: 1, mt: 0.9 },
              '& .react-tel-input.focused': { borderColor: theme.palette.primary.main },
              ml: 1.5,
              mb: 1.5,
              mr: 1.5
            }}>
            <Paper sx={{ width: '100%', mb: 1, p: 3 }}>
              <TextFieldFormsy
                label="Transfer Account"
                id="transfer_account"
                name="transfer_account"
                value={form.transfer_account}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                // focused
                InputLabelProps={{
                  shrink: true
                }}></TextFieldFormsy>
              <TextFieldFormsy
                label="Transfer Amount"
                id="transfer_amount"
                name="transfer_amount"
                value={form.transfer_amount}
                onChange={handleChange}
                variant="outlined"
                type="number"
                required
                fullWidth
                // focused
                InputLabelProps={{
                  shrink: true
                }}></TextFieldFormsy>
            </Paper>

            <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 0.5, px: 6 }}
                  type="submit"
                  // fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!isFormValid || loading2}
                  aria-label="Register"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  {loading2 ? <CircularProgress size={24} olor="inherit" /> : 'Save'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 0.5, px: 6 }}
                  // fullWidth
                  type="button"
                  variant="contained"
                  onClick={() => setOpenDialog(false)}
                  color="warning"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Formsy>
      </Dialog>
    </div>
  );
};

export default SmartContract;
