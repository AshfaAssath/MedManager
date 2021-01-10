import { Card } from '@material-ui/core';
import React from 'react'

import { Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '90px',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
}));

function ProfileView() {

    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={3}>

        </Card>
    )
}

export default ProfileView;
