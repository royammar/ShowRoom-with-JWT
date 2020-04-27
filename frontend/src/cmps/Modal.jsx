import React, { Component } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp(props) {

  const { enqueueSnackbar } = useSnackbar();
  const {msg } = props

  msg.length>0 && handleClickVariant("default")

  function handleClickVariant(variant) {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(`${msg}`, { variant })
  };


  return (
    <React.Fragment>
    </React.Fragment>
  );
}

export default class IntegrationNotistack extends Component {

  render() {

    return (
      <SnackbarProvider msg={this.props.msg} maxSnack={1}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MyApp msg={this.props.msg} ></MyApp>
      </SnackbarProvider>
    );
  }

}

