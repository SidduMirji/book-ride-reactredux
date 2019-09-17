import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const moment = require('moment');
const useStyles = makeStyles(theme => ({
    appBar: {
        position: "relative"
    },
  
    textField: {
        paddingBottom: 15
    },
    ansContainer: {
        width: "98%",
        margin: "0 auto"
    },
    chip: {
        margin: theme.spacing(1)
    },
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

/**
 * BookRide : Provides the utility for book the new ride
 */
export default function BookRide(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        source: '',
        dest: '',
        scheduledDate: ''
    });
   
    // Updates the state values
    const handleValueChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };


    const [selectedDate, setSelectedDate] = React.useState(moment().format('DD-MMM-YYYY'));
    const [selectedTime, setSelectedTime] = React.useState(moment());

    let { error } = props.UI;
  
    if(!error) {
      error = {}
    }else {
      error = error.errors;
    }

    function handleDateChange(date) {
        setSelectedDate(date);
    }

    function handleTimeChange(time) {
        setSelectedTime(time);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const rideData = {
          source: values.source,
          dest: values.dest,
          scheduledDate : moment(selectedDate).format('DD-MMM-YYYY'),
          scheduledTime : moment(selectedTime).format('hh:mm:A'),
          createdAt : moment(),
          
        }
        props.storeUserRide(rideData);
    
      }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Tooltip title="Close">
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.handleDialogClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h6" className={classes.title}>
                        Book New Ride
                     </Typography>


                </Toolbar>
            </AppBar>
            {props.UI.loading && (
                <LinearProgress color="secondary" className="progressBar" />
            )}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <DirectionsCar />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Book Cab
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        
                           
                                <TextField
                                    name="source"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    helperText={error.source}
                                    error={error.source ? true : false}
                                    id="source"
                                    label="Source"
                                    className={classes.textField}
                                    autoFocus
                                    value={values.source}
                                    onChange={handleValueChange("source")}
                                />
                          
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    className={classes.textField}
                                    helperText={error.dest}
                                    error={error.dest ? true : false}
                                    id="dest"
                                    label="Destination"
                                    name="dest"
                                    value={values.dest}
                                    onChange={handleValueChange("dest")}
                                />
                             
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Booking Date"
                                        format="MM/dd/yyyy"
                                        fullWidth
                                        disablePast
                                        helperText={error.scheduledDate}
                                        error={error.scheduledDate ? true : false}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="Booking Time"
                                    fullWidth
                                    disablePast
                                    helperText={error.scheduledTime}
                                    error={error.scheduledTime ? true : false}
                                    value={selectedTime}
                                    onChange={handleTimeChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                                </Grid>
                        </Grid>
                       
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Book
                      </Button>

                    </form>
                </div>
            </Container>

        
        </React.Fragment >
    );
}