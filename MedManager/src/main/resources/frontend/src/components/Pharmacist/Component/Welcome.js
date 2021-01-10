import { Paper, Typography } from '@material-ui/core';
import React from 'react'

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '50px',
        marginTop: '30px',
        marginLeft: '60px',
        marginRight: '50px',
        alignItems: 'center',
    },
    typography: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
}));

export default function Welcome() {

    const classes = useStyles();

    return (
        <Paper className={classes.root} >
            <Typography className={classes.typography}>
                <h1>Welcome to MedManager</h1>
            </Typography>
            <Typography className={classes.typography} style={{color: '#606264'}}>
                <p>Medical Center, University of Ruhuna.</p>
            </Typography>
        </Paper>
    )
}

//export default Welcome;
