import React,{useState,useEffect,useCallback} from 'react'
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Card, Typography, ListItem, ListItemIcon, ListItemText, Divider,Button,Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import { red, blue } from "@material-ui/core/colors";
import axios from  'axios'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

toast.configure()

const useStyles = makeStyles((theme) => ({
    root: {
        //maxWidth: 305,
        marginTop: '10px',
        width: '300px',
        padding: '10px',
    },
    warning: {
        color: 'red',
    }
}));

export default  function Status() {

    const classes = useStyles();

    //const notifyWarning = () => {
        //toast.error('ABC Drug is Out of Stock!', { //change these messages
            //position: toast.POSITION.TOP_CENTER, 
            //autoClose:false
        //})
    //};

    //const notifyInfo = () => {
        //toast.info('Type any Message', {
            //position: toast.POSITION.TOP_CENTER, 
            //autoClose:false
        //})
    //};





    const [recordForAlert,setRecordForAlert] =useState([])
    const [recordForAlert1,setRecordForAlert1] =useState([])  //----Alert
    const [open, setOpen] = useState(true);
    const [openD, setOpenD] = React.useState(false);

    const datee=new Date(new Date().toDateString())

   const handleClickListItem=()=>{
       setOpenD(true)
   }


   const handleCancel = () => {
    setOpenD(false);
  };

  const handleOk = () => {
    //onClose(value);
  };
 

    const loadAlert = useCallback(() => {
        axios
        .get("http://localhost:8080/stock/less/10")
        .then((result) => setRecordForAlert(result.data) 
        
        )

               
      }, []);

      const loadAlert1 = useCallback(() => {
       

       axios
        .get("http://localhost:8080/stock/ex/Sun Nov 29 2020")
        .then((result) => setRecordForAlert1(result.data) 
        
        )
        
      }, []);

     useEffect(() => {
        // loadAlert();
         //loadAlert1();
         showAert();
        // console.log(datee)
        // alert(date)
               //}, [loadAlert]); 
       }) 
       useEffect(() => {
        loadAlert1();
        //loadAlert1();
        //showAert();
       // console.log(datee)
       // alert(date)
              //}, [loadAlert]); 
      }, [loadAlert1])

      
      useEffect(() => {
        loadAlert();
        //loadAlert1();
        //showAert();
       // console.log(datee)
       // alert(date)
              //}, [loadAlert]); 
      }, [loadAlert]) 


     
      

      const showAert=()=>{
           if(!recordForAlert.length ){
               setOpen(false)
            }
           else
            {
               setOpen(true)  
            }
        
      }
                                       //------Alert

    return(

        <div>

        <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        //maxWidth="sm"
        //onEntering={handleEntering}
        aria-labelledby="confirmation-dialog-title"
        open={openD}
        
        >
                <DialogTitle id="confirmation-dialog-title"style={{color: '#d32f2f'}}>Warning</DialogTitle>
                <DialogContent dividers>
                                                                   
                          <Grid item xs={12}  container>
                          <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                              <Typography gutterBottom variant="subtitle1">
                                This is a warning alert for  Quantity
                              </Typography >
                              <Typography variant="body2" gutterBottom>
                              <strong>{recordForAlert.map(item=>(<h7>{item.drugName}   has low quantity ! <br/></h7>))}</strong>
                              </Typography>
                              </Grid>

                              <Grid item xs>
                               
                              <Typography gutterBottom variant="subtitle1">
                              This is a warning alert for ExpiryDate
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                              <strong>{recordForAlert1.map(item=>(<h7>{item.drugName}   has expired ! <br/></h7>))}</strong>
                              </Typography>
                             
                            </Grid>
                           </Grid>
                        </Grid>
                       
                 
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} color="primary">
                    Ok
                    </Button>
                   
        </DialogActions>
  </Dialog>
        





































        <Card className={classes.root}>
            <Typography style={{fontWeight:'bold', fontSize:'20px'}}>
                Status
            </Typography>
            <Link to={"/"}  style={{textDecoration: "none", color:"red"}} >   {/*Background color is red because of the Link, don't remove it */}
            <ListItem  button onClick={ handleClickListItem}>
                <ListItemIcon>
                    <WarningIcon style={{ color: red[500] }}/>
                </ListItemIcon>
                <ListItemText primary="Warning"/> {/*Type here the warning*/}
                </ListItem>
            </Link>

            <Divider/>

            <Link to={"/"}  style={{textDecoration: "none", color:"blue"}} >
                <ListItem >
                <ListItemIcon>
                    <InfoIcon style={{ color: blue[500] }}/>
                </ListItemIcon>
                <ListItemText primary="Infomation"/> {/*Type here the warning*/}
                </ListItem>
            </Link>

            <Divider/>

            
            
        </Card>

        </div>
    )
}

//export default Status;