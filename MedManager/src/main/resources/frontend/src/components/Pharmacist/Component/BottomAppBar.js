import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  
  appBar: {
    top: 'auto',
    bottom: 0,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  typography: {
    // color: '#606264',
    color: 'red',
    alignItems: 'center',
    fontSize: '18px',
    // fontWeight: 'bold',
  },
}));

export default function BottomAppBar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
        <AppBar position="fixed"  className={classes.appBar}>
          <Toolbar variant="dense">
            <Typography className={classes.typography}>
                All Rights Reserved
            </Typography>
          </Toolbar>
        </AppBar>
    </React.Fragment>
  );
}
