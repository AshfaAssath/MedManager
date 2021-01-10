import React from 'react'
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Card, Typography, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import { red, blue } from "@material-ui/core/colors";

toast.configure()

const useStyles = makeStyles((theme) => ({
    root: {
        //maxWidth: 305,
        marginTop: '25px',
        width: '300px',
        padding: '10px',
    },
    warning: {
        color: 'red',
    }
}));

function Status() {

    const classes = useStyles();

    const notifyWarning = () => {
        toast.error('ABC Drug is Out of Stock!', { //change these messages
            position: toast.POSITION.TOP_CENTER, 
            autoClose:false
        })
    };

    const notifyInfo = () => {
        toast.info('Type any Message', {
            position: toast.POSITION.TOP_CENTER, 
            autoClose:false
        })
    };

    return(
        <Card className={classes.root}>
            <Typography style={{fontWeight:'bold', fontSize:'20px'}}>
                Status
            </Typography>
            <Link to={"/"}  style={{textDecoration: "none", color:"red"}} >   {/*Background color is red because of the Link, don't remove it */}
                <ListItem button onClick={notifyWarning}>
                <ListItemIcon>
                    <WarningIcon style={{ color: red[500] }}/>
                </ListItemIcon>
                <ListItemText primary="Warning"/> {/*Type here the warning*/}
                </ListItem>
            </Link>

            <Divider/>

            <Link to={"/"}  style={{textDecoration: "none", color:"blue"}} >
                <ListItem button onClick={notifyInfo}>
                <ListItemIcon>
                    <InfoIcon style={{ color: blue[500] }}/>
                </ListItemIcon>
                <ListItemText primary="Infomation"/> {/*Type here the warning*/}
                </ListItem>
            </Link>

            <Divider/>

            <Link to={"/"}  style={{textDecoration: "none", color:"red"}} >
                <ListItem button onClick={notifyWarning}>
                <ListItemIcon>
                    <WarningIcon style={{ color: red[500] }}/>
                </ListItemIcon>
                <ListItemText primary="Warning"/> {/*Type here the warning*/}
                </ListItem>
            </Link>

            <Divider/>

            <Link to={"/"}  style={{textDecoration: "none", color:"blue"}} >
                <ListItem button onClick={notifyInfo}>
                <ListItemIcon>
                    <InfoIcon style={{ color: blue[500] }}/>
                </ListItemIcon>
                <ListItemText primary="Infomation"/> {/*Type here the warning*/}
                </ListItem>
            </Link>
            
        </Card>
    )
}

export default Status;