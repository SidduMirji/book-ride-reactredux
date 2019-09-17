import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Avatar from '@material-ui/core/Avatar';
import LocalShipping from '@material-ui/icons/LocalShipping';
import LocalTaxi from '@material-ui/icons/LocalTaxi';
import BookRide from '../components/BookRide';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import store from '../redux/store';
import { TOGGLE_ADD_RIDE } from '../redux/types';

const moment = require('moment');
const styles = (theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    orangeAvatar: {
        display: 'inline-flex',
        margin: '0px 15px',
        width: 47,
        height: 37,
        backgroundColor: '#e04168'
    },
    dataTimeAvatar: {
        width: 115,
        height: 60,
        margin: 11,
        backgroundColor: `#1c1e56`,
        fontSize: 16,
        borderRadius: 5,
        textAlign: 'center'
    },

});



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Home extends Component {

    constructor(props) {
        super()
    }

    handleAddClickOpen() {
        store.dispatch({ type: TOGGLE_ADD_RIDE, payload: true });
    }

    handleClose() {
        store.dispatch({ type: TOGGLE_ADD_RIDE, payload: false });
    }


    componentDidMount() {
        this.props.loadUserRides();
    }
    render() {
        const {
            classes,
            rides,
            UI: { showAddDialog }
        } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />

                <Typography className={classes.text} variant="h5" gutterBottom>
                    {rides.rides.length > 0 ? 'Your Rides' : 'No Rides Found'}
                </Typography>
                <List className={classes.list}>
                    {rides.rides.map(({ rideId, source, dest, createdAt, scheduledDate, scheduledTime }) => (
                        <React.Fragment key={rideId}>
                            <ListItem button>
                                <ListItemAvatar>

                                    <Avatar className={classes.dataTimeAvatar}>{scheduledTime} <br />{scheduledDate}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <Typography component="h5" variant="h5">
                                        {source}   <Avatar className={classes.orangeAvatar}><LocalShipping /></Avatar> {dest}
                                    </Typography>

                                } secondary=
                                    {moment(createdAt).fromNow()} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>
                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar>

                        <Fab onClick={() => this.handleAddClickOpen()} color="secondary" aria-label="add" className={classes.fabButton}>
                            <LocalTaxi />
                        </Fab>
                        <div className={classes.grow} />


                    </Toolbar>
                </AppBar>

                <Dialog
                    fullScreen
                    open={showAddDialog}
                    onClose={() => this.handleClose()}
                    TransitionComponent={Transition}
                >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <BookRide handleDialogClose={() => this.handleClose()} {...this.props} />
                    </MuiPickersUtilsProvider>
                </Dialog>

            </React.Fragment>
        )
    }
}

export default (withStyles(styles)(Home));
