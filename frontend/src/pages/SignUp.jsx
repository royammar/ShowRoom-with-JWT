import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'


import { signup } from '../actions/UserActions';
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
import CloudinaryService from '../services/CloudinaryService';

class SignUp extends Component {

    state = {
        msg: '',
        signupCred: {
            email: '',
            password: '',
            username: '',
            fullName: "",
            wishlist: [],
            imgUrl:'',
            shopId: ''
        }
    }

    signupHandleChange = ev => {
        const { name, value } = ev.target;
        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                [name]: value
            }
        }));
    };


    doSignup = async ev => {
        ev.preventDefault();
        const { email, password, username, fullName, wishlist,imgUrl, shopId } = this.state.signupCred;
        if (!email || !password || !fullName) {
            return this.setState({ msg: 'All inputs are required!' });
        }
        const signupCreds = { email, password, username, fullName, wishlist,imgUrl, shopId };
        console.log(signupCreds)
        this.props.signup(signupCreds);
        this.setState({ signupCred: { email: '', password: '', username: '', fullName: '', wishlist: [],imgUrl, shopId: '' } });
        this.props.history.push('/item')
    };


    handleImageUpload=async(ev)=>{
 
      const res = await CloudinaryService.uploadImg(ev);
      let value = res.url;
      let name='imgUrl'
      this.setState(prevState => ({
        signupCred: {
            ...prevState.signupCred,
            [name]: value
        }
    }));
    
    }


        
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
                  Sign Up
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    autoComplete="fullName"
                    autoFocus
                    value={this.state.signupCred.fullName}
                    onChange={this.signupHandleChange}
                  />
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
                    value={this.state.signupCred.email}
                    onChange={this.signupHandleChange}
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
                    value={this.state.signupCred.password}
                    onChange={this.signupHandleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="imgUrl"
                    // label="Upload your Image"
                    type="file"
                    id="imgUrl"
                    // value={this.state.signupCred.imgUrl}
                    onChange={this.handleImageUpload}
                  />
                  <button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="btn1 login-submit"
                    onClick={this.doSignup}
                  >
                    Sign Up
                  </button>
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
        //state
    };
};

const mapDispatchToProps = {
    signup
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);





