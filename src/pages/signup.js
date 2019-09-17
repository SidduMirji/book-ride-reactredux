import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from 'react-router-dom/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
axios.defaults.baseURL = 'https://us-central1-book-ride-50ae7.cloudfunctions.net/api';
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url( https://i0.wp.com/offerlocation.com/blog/wp-content/uploads/2018/01/ola-bhopal.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    marginLeft: 10
  }
}));

export default function SignUp(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: ''
  });
  const { loading } = props.UI;
  let { error } = props.UI;

  if(!error) {
    error = {}
  }else {
    error = error.errors;
  }
  const handleValueChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const newUserData = {
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      handle: values.handle
    }
    props.signupUser(newUserData, props.history);

  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              helperText={error.email}
              error={error.email ? true : false}
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete='off'
              autoFocus
              value={values.email}
              onChange={handleValueChange("email")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              helperText={error.password}
              error={error.password ? true : false}
              autoComplete="new-password"
              name="password"
              label="Password"
              type="password"
              id="password"
              value={values.password}
              onChange={handleValueChange("password")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoComplete='off'
              helperText={error.confirmPassword}
              error={error.confirmPassword ? true : false}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={handleValueChange("confirmPassword")}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoComplete='off'
              helperText={error.handle}
              error={error.handle ? true : false}
              name="handle"
              label="User ID"
              id="handle"
              value={values.handle}
              onChange={handleValueChange("handle")}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              Sign Up
              {loading &&  <CircularProgress className={classes.progress} color="secondary" size={20} />}
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}