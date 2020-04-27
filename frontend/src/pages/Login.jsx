import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { login } from '../actions/UserActions'
import InnerNavBar from '../cmps/InnerNavBar';

// import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
class Login extends Component {

    state = {
        msg: '',
        loginCred: {
            email: '',
            password: ''
        }
    }


    doLogin = async (ev) => {
        ev.preventDefault()

        const { email, password } = this.state.loginCred;
        if (!email || !password) {
            return this.setState({ msg: 'Please enter user/password' });
        }
        const userCreds = { email, password };
        await this.props.login(userCreds);
        this.setState({ loginCred: { email: '', password: '' } });
        (sessionStorage.getItem('user')) ? this.props.history.push('./item') : this.setState({ msg: 'Wrong email or password' })
    }

    loginHandleChange = ev => {
        const { name, value } = ev.target;
        this.setState(prevState => ({
            loginCred: {
                ...prevState.loginCred,
                [name]: value
            }
        }));
    };

    
    
  useStyles =()=> makeStyles(theme => ({
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
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),

    },
  }));

    render() {
        const classes = this.useStyles();
     
        return (
            <React.Fragment>
        <InnerNavBar></InnerNavBar>
            
            <Container className="login-main " component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={this.state.loginCred.email}
                    onChange={this.loginHandleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.loginCred.password}
                    onChange={this.loginHandleChange}
                  />
                  <button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="btn1 login-submit"
                    onClick={this.doLogin}
                  >
                    Sign In
                  </button>
                  <Grid container>
                    <Grid item>
                    <p>Do not have an account yet?
              <Link to={`/signUp`}> <span>Signup</span></Link>
            </p>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={8}>
              {this.state.msg}
              </Box>
            </Container>
            </React.Fragment>
          )
    }

}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser,
    };
};

const mapDispatchToProps = {
    login
};





export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
