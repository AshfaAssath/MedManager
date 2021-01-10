import React,{ useState,useEffect } from 'react';
import UserService from "../services/user.service";
import { Paper, Typography } from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: '50px',
        marginTop: '120px',
        marginLeft: '100px',
        // marginRight: '50px',
        // alignItems: 'center',
        width:600
    },
    typography: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
}));

const Home =() => {

    const classes = useStyles();

    const[content,setContent] = useState("");

    useEffect(()=>{
        UserService.getPublicContent().then(
            (response) =>{
                setContent(response.data);
            },
            (error) =>{
                const _content=
                (error.response && error.response.data) ||
                error.message ||
                error.toString();

                setContent(_content);
            }
        );
    },[]);

    return (
        <Paper className={classes.root}>
            <Typography className={classes.typography}>
                <h1>Welcome to MedManager</h1>
            </Typography>
            <Typography className={classes.typography} style={{color: '#606264'}}>
                <p>Medical Center, University of Ruhuna.</p>
            </Typography>
        </Paper>
    )
}

export default Home;
