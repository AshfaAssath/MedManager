import React from 'react';

import Ruhuna from './images/Ruhuna.jpg';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         padding: '50px',
//         marginTop: '25px',
//         marginLeft: '70px',
//         marginRight: '70px',
//         alignItems: 'center',
//     },
//     typography: {
//         textAlign: 'center',
//         fontWeight: 'bold',
//     },
// }));


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 240,
        minHeight: 240,
        padding: '3%',
        marginTop: '40px',
        marginLeft: '40px',
        //marginRight: '5%',
        //marginBottom: '20px',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    typography: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
  }));

export default function Welcome() {

    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={3}>
            <CardActionArea>
                <CardMedia

                component="img"
                alt="University of Ruhuna"
                height="400"
                image={Ruhuna}
                title="University of Ruhuna"
                />
                <CardContent>
                <Typography gutterBottom  className={classes.typography}>
                    <h1>Welcome to MedManager</h1>
                </Typography>
                <Typography className={classes.typography} style={{color: '#606264'}}>
                    Medical Center, University of Ruhuna
                </Typography>
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions> */}
        </Card>
    );
}



{/*<Paper className={classes.root}>
             <Typography className={classes.typography}>
                <h1>Welcome to MedManager</h1>
            </Typography>
            <Typography className={classes.typography} style={{color: '#606264'}}>
                <p>Medical Center, University of Ruhuna.</p>
            </Typography> 
        </Paper>*/}