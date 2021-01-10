import React from 'react';
import AuthService from "../services/auth.service";
import { Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '90px',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width:700,
        marginLeft:60
    },
}));

const Profile = () =>{

const currentUser =AuthService.getCurrentUser();
const classes = useStyles();

    return (
        <Card className={classes.root} elevation={3}>
        <header className="jumbotron">
        <h3 style={{textAlign:'center'}}>
        <FontAwesomeIcon icon={faUser} size="3x" /> 
            <strong style={{marginLeft:'30px'}} >
               {currentUser.username+"  "}
            </strong>
            Profile
        </h3>
    </header>
   <div style={{padding:'30px'}}>
   <p>
    <strong>Id:  </strong>{currentUser.id}
    </p>
    <p>
        <strong>Email:</strong>{currentUser.email}
    </p>
   </div>
</Card>
    )
}

export default Profile;

