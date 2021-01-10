import React ,{useState, useEffect,useCallback} from 'react'
import MedicineForm from './MedicineForm'
import MedicineForm2 from './MedicineForm2'
import {DialogContentText,Typography,List,ListItem,ListItemText,Table, TableHead,Paper,TextField,makeStyles, TableBody, Grid,TableRow, TableCell,Toolbar, InputAdornment,Button} from '@material-ui/core'
import useTable from '../../Component/useTable';
import Popup from '../../Component/Popup';
import {Search,AddIcon} from '@material-ui/icons';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TableContainer from '@material-ui/core/TableContainer';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Mservice from '../../Services/Mservice'
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
//import {BrowserRouter,Switch,Route,Link} from 'react-router-dom';
//import AddIcon from '@material-ui/icons/Add'
import TablePagination from '@material-ui/core/TablePagination'
import Moment from 'react-moment';
//import Alert from '@material-ui/lab/Alert';
//import AlertTitle from '@material-ui/lab/AlertTitle';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
//import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Status from '../Wel/Status'
import Seearch from '../Wel/Search'
import { Card, ListItemIcon,  Divider } from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import { red, blue } from "@material-ui/core/colors";
import { Link } from 'react-router-dom';
import SearchStudent from '../../Component/SearchStudent';
import authHeader from '../../../../services/auth.service';
import PharmacistService from '../../../../services/pharmacist.service';


 const useStyles=makeStyles(theme=>({

    table: {
        //marginTop: '100',
        // marginTop: theme.spacing(3),
        minWidth: 650,
        size:'small',
        '& thead th': {
            fontWeight:'600',
            //color: theme.palette.primary.main,
            color:'#b71c1c',
            backgroundColor:  '#FEF2D1',

        },
        '&  tbody td': { 
            fontWeight:'300',
        },

        '& tbody tr:hover':{
            backgroundColor: '£fffbf2',
            cursor:'pointer',
        },
        // root: {
        //     width: '100%',
        //   },
          heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
          },

        
    },

    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    pageContent:{
        
            width:'100%',
           // margin:theme.spacing(5),
            // padding:theme.spacing(3),
            marginTop:20,
            marginLeft:10

        },
        searchInput:{
            width:'50%'
        },
        rootC: {
          //maxWidth: 305,
          marginTop: '10px',
          width: '300px',
          padding: '10px',
      },
      warning: {
          color: 'red',
      }
    }
))
  
const headCells=[
    {id:'id',label:'ID'},
    {id:'drugCode',label:'Drug Code'},
    // {id:'name',label:'Medicine Name'},
   
    // {id:'category',label:'Category'},
    {id:'quantity',label:'Quantity'},
    {id:'entryDate',label:'Entry Date'},
    {id:'expiryDate',label:'Expire Date'},
    {id:'action',label:'Action'},
    //{id:'action',label:'Action'}
    

    
]

export default function Medicine() {

    const classes=useStyles();
    const [records,setRecords] = useState([]);
    //const [fillterFn,setFillterFn]=useState();
    const [openPopup,setOpenPopup]=useState(false);
    const [recordForEdit,setRecordForEdit]=useState(null);
    const [recordForSearch,setRecordForSearch]=useState('');

    const pages =[4,10,15]
    const [page, setPage] =useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);


    const [recordForAlert,setRecordForAlert] =useState([])
    const [recordForAlert1,setRecordForAlert1] =useState([])  //----Alert
    const [open, setOpen] = useState(true);
    const [openD, setOpenD] = React.useState(false);

    const  [condition,setCondition]=useState(true);       //for two button to  medicine form     
   
    const datee=new Date(new Date().toDateString())

    const addNewMed=()=>{
      setOpenPopup(true )                 //for two button to  medicine form
      setCondition(true)
    }

    const addExMed=()=>{
      setOpenPopup(true )
      setCondition(false) 
    }                                      //for two button to  medicine form




   const handleClickListItem=()=>{
       setOpenD(true)
   }


   const handleCancel = () => {
    setOpenD(false);
  };

  const handleOk = () => {
    //onClose(value);
  };
 

     const loadAlert = useCallback(() => {                     //Warning

        PharmacistService.getQuantityLow().then((result)=>{
          setRecordForAlert(result.data) ;
        })
        //  axios
        //  .get("http://localhost:8080/api/test/pharmacist/stock/low",{headers:authHeader() })
        //  .then((result) => setRecordForAlert(result.data) 
        
        // )
               
      }, []);  


      const loadAlert1 = useCallback(() => {


      PharmacistService.getExpireDate().then((result)=>{
        setRecordForAlert1(result.data);
      })

      //  axios
      //   .get("http://localhost:8080/api/test/pharmacist/stock/ex/2020-11-29",{headers:authHeader() })
      //   .then((result) => setRecordForAlert1(result.data) 
        
      //   )
        
      }, []);
      

     useEffect(() => {
        
         showAert();
        
       }) 
       useEffect(() => {
         loadAlert1();
       
       }, [loadAlert1])

      
       useEffect(() => {
         loadAlert();
       
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


                                       const generatReport=()=>{
                                        axios
                                        .get("http://localhost:8080/stock/report/pdf")
                                        .then((result) => {
                                            //Reload the doggies to show also the new one
                                            //loadMedicine();
                                            // alert(result)
                                          })
                                    }
                                




//pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const recordafterPaging=()=>{
      return records.slice(page*rowsPerPage,(page+1)*rowsPerPage)
  }  

//pagination

const loadMedicine = useCallback(() => {

PharmacistService.getAllstock().then((result)=>{
    setRecords(result.data);
})
/*
  axios
  .get("http://localhost:8080/api/test/pharmacist/stock/viewAll",{headers:authHeader()})
  .then(result => 
    console.log(result.data))
    // setRecords(result.data));
    */
}, []);


useEffect(() => {
  loadMedicine();
  
}, [loadMedicine]);

 // const handleChange = e =>{
       // let target=e.target;
       // setFillterFn({
            //fn:items=>{
                //if(target.value=='')
                    //return items;
                //else
                   // return items.fillter(x=>x.name.includes(target.value))
            //}
        //})
    //}


    //searching
   const handleChange = e =>{

    setRecordForSearch(e.target.value)
   
    }
    
  
   const search=()=>{
    if(recordForSearch!=null){
    axios
    .get("http://localhost:8080/api/test/pharmacist/stock/save/"+recordForSearch,{headers:authHeader() })
    .then(result => setRecords(result.data));
    }
   }

    const reload=()=>{
    // loadMedicine();
    setRecordForSearch('');

   }

   //searching



   //adding and updating
    const addOrEdit=(medicine)=>{
        if(medicine.id==0){ 
             axios
             .post("http://localhost:8080/api/test/pharmacist/stock/save",medicine,{headers:authHeader() })
             .then((result) => {
               //Reload the doggies to show also the new one
                loadMedicine();
             })

            // PharmacistService.saveStock(medicine).then((res)=>{
            //   loadMedicine();
            // })
          setOpenPopup(false)
     }
        else{

          // PharmacistService.updateAndSaveStock(medicine.id,medicine).then((res)=>{
          //   loadMedicine();
          // })

        // axios        
        //   .put("http://localhost:8080/api/test/pharmacist/stock/save/"+ medicine.id,medicine,{headers:authHeader() })
        //   .then((result) => {
        //     //Reload the doggies to show also the new one
        //     // loadMedicine();
        //   })
      
        setOpenPopup(false)
           }
        
    }

    const addEx=(medicinee)=>{
   
        
      axios
          .post("http://localhost:8080/api/test/pharmacist/stock/saveE/"+ medicinee.drugCode,medicinee,{headers:authHeader() })
          .then((result) => {
            //Reload the doggies to show also the new one
            // loadMedicine();
          })
          setOpenPopup(false)
    }

                                                             //adding and updating
        
   
        
const openInPopup=(item) =>{
   
    setRecordForEdit(item)
    setOpenPopup(true)
}

const onDelete=(item)=>{
    axios
    .delete("http://localhost:8080/api/test/pharmacist/stock/save/"+ item.id,{headers:authHeader() })
    .then((result) => {
        //Reload the doggies to show also the new one
        // loadMedicine();
      })
    
}
    return (
                      
        <div>
                <div className={classes.root}>
               {/* <Collapse in={open}>
                <Alert style={{width:'15%',height:'60%',right:800}}severity="warning"  >                               
                               {/*action={
                                    <IconButton
                                      aria-label="close"
                                      color="inherit"
                                      size="small"
                                      onClick={() => {
                                        setOpen(false);
                                      }}
                                    >
                                      <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                  }
                                 
                <AlertTitle> 
                    <List style={{bottom:15}}>
                           <ListItem
                            button
                            divider
                            aria-haspopup="true"
                           // aria-controls="ringtone-menu"
                            aria-label="Warning"
                           onClick={handleClickListItem}
                           //secondary={value}
                            role="listitem"
                            >
                                 <ListItemText primary="Warning" style={{color: '#d32f2f'}} />
                            </ListItem>
                                </List>
                                



                       {/* <div className={classes.root}>
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography className={classes.heading}>Warning</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                This is a warning alert for Quantity— <strong>{recordForAlert.map(item=>(<h7>{item.drugName}   has low quantity  <br/></h7>))}</strong>
                               
                                </AccordionDetails>

                                <AccordionDetails>
                                This is a warning alert for Expiry Date — <strong>{recordForAlert1.map(item=>(<h7>{item.drugName}   has expired  <br/></h7>))}</strong>
                                </AccordionDetails>
                            </Accordion>
    
                        </div>
                              
                </AlertTitle>
                       
                       
                </Alert>
                
                            </Collapse>
s                          
                */}
                </div>



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
                                          <strong>{recordForAlert.map(item=>(<h7>{item.drugCode}   has low quantity ! <br/></h7>))}</strong>
                                          </Typography>
                                          </Grid>

                                          <Grid item xs>
                                           
                                          <Typography gutterBottom variant="subtitle1">
                                          This is a warning alert for ExpiryDate
                                          </Typography>
                                          <Typography variant="body2" gutterBottom>
                                          <strong>{recordForAlert1.map(item=>(<h7>{item.drugCode}   has expired ! <br/></h7>))}</strong>
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
                    







          <Grid container spacing={3} direction="row" justify="center" alignItems="flex-start">
              <Grid item md={9}>
                   <Paper style={{marginTop:40,marginLeft:80,marginRight:130}} > 
                        <Toolbar>
            
                
                    <TextField style={{margin:5,width:'100%'}}
                         variant='outlined'
                        size='small'
                        label='Search Medicine'
                        className={classes.searchInput}
                        value={recordForSearch}
                        InputProps={{
                        endAdornment: (<InputAdornment position='start'>
                             <IconButton  onClick={search} style={{padding:10,left:10}}>
                             <SearchIcon />
                            </IconButton>

                            <IconButton  onClick={reload} style={{padding:10,left:10}}>
                            <CloseIcon fontsize='small'/>
                            </IconButton>
                            </InputAdornment>)
                        }}
                        onChange={handleChange}
                        
                        //name='quantity'
                        //value={values.quantity}
                    //onChange={handleInputChange}
                   
                    />
                   
            </Toolbar>

            </Paper>

                 


      {/* <Paper className={classes.root}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase
                placeholder="Search"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                width='100%'
                />
            </div>
        </Paper> */}

           {/* <div> <SearchStudent/> </div>  */}

           <Paper  className={classes.pageContent} position='absolute'>
           <TableContainer component={Paper} style={{maxHeight: 350}}>
           <Table stickyHeader aria-label="sticky table" className={classes.table} size="small">
           <TableHead>
                <TableRow>
                    {
                        headCells.map(headCell => (<TableCell key={headCell.id}>
                                {headCell.label}
                        </TableCell>)
                        )
                    }
                </TableRow>
            </TableHead>
               
               <TableBody>
                   {
                      recordafterPaging().map(item=>
                        (
                        <TableRow key={item.id}> 
                        <TableCell>{item.id}</TableCell>
                        {/* <TableCell>{item.drug.drugCode}</TableCell> */}
                        <TableCell>{item.drugCode}</TableCell>


                        {/* <TableCell>{item.drugName}</TableCell> */}
                       
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>  <Moment format="YYYY/MM/DD">{item.entryDate}</Moment></TableCell>
                        <TableCell><Moment format="YYYY/MM/DD">{item.expiryDate}</Moment></TableCell>
                        <TableCell>

                          <Grid container direction='row'>
                            <Grid item sm={6}>
                           {/* <Button color='primary' onClick={()=>{openInPopup(item)}}>
                                <EditOutlinedIcon fontsize='small'></EditOutlinedIcon>
                           </Button>  */}
                            </Grid>

                           <Grid item sm={6}> 
                            <Button color='secondary' onClick={()=>{onDelete(item)}}  >
                                <DeleteForeverIcon fontsize='small'/>
                            </Button>
                             </Grid> 

                          </Grid>
                         </TableCell> 
                         {/* <TableCell>
                            <Button color='secondary' onClick={()=>{onDelete(item)}}>
                                <DeleteForeverIcon fontsize='small'/>

                            </Button>
                        </TableCell>  */}


                      { /* <TableCell>
                        <Link to={'/MedicineForm'}> 
                            <Button color='primary'>
                                <EditOutlinedIcon fontsize='small'></EditOutlinedIcon>

                            </Button>
                        </Link>
                        </TableCell>*/}


                        </TableRow>
                                                                                            
                       )
                       )
                   }
               </TableBody>
           </Table>
                   </TableContainer>

          
          { /*<TblPagination/>*/}

          <TablePagination
                component="div"
                count={records.length}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions ={pages}
                onChangeRowsPerPage={handleChangeRowsPerPage}
         />

            </Paper>

            </Grid>
            <Grid container item md={3} direction="column" justify="flex-start" alignItems="center" position="fixed" style={{marginTop:40}}>
                   <Grid item>
                          <Button
                       style={{marginRight:100,width:200,marginBottom:5}}
                      // right: 130}}     
                        variant='outlined'
                        size='large'
                        color="primary"
                       onClick={addNewMed}
                        
                      >
                          Add Medicines to Stock
                    </Button>
                    </Grid> 

                    <Grid item> 
                                <Button
                        
                        style={{marginRight:100,width:200,marginBottom:5}}                                              
                            
                              variant='outlined'
                               size='large'
                           color='primary'
                                                                        // onClick={()=>setOpenPopup(true )}
                          onClick={generatReport}
                                                                       
                                                                            
                                   >
                                 Generate Report
                                </Button>
                              </Grid> 
                    <Grid item >
                                   <Card className={classes.rootC} style={{marginRight:100,width:200,marginTop:35}}>
                                      <Typography style={{fontWeight:'bold', fontSize:'20px'}}>
                                          Status
                                      </Typography>
                                      <Collapse in={open}>  
                                          <Link to  style={{textDecoration: "none", color:"red"}} >   {/*Background color is red because of the Link, don't remove it */}
                                              <ListItem  button onClick={ handleClickListItem}>{/*button onClick={ handleClickListItem}*/}
                                              <ListItemIcon>
                                                  <WarningIcon style={{ color: red[500] }}/>
                                              </ListItemIcon>
                                              <ListItemText primary="Warning"/> {/*Type here the warning*/}
                                              </ListItem>
                                          </Link>
                                          </Collapse>
                                          <Divider/>
                                      {/* <Link   style={{textDecoration: "none", color:"blue"}} >
                                          <ListItem> 
                                          <ListItemIcon>
                                              <InfoIcon style={{ color: blue[500] }}/>
                                          </ListItemIcon>
                                          <ListItemText primary="Infomation"/>
                                          </ListItem>
                                      </Link> */}
                                   <Divider/>
                                </Card>
                    </Grid>
            </Grid>
        </Grid>


        {condition ?
            <Popup
                title={'Medicine Form'}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
                     <MedicineForm  
                     recordForEdit={recordForEdit}
                     addOrEdit={addOrEdit}
                     /> 

            </Popup>

            :

            <Popup
                title={'Medicine Form'}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
                     <MedicineForm2  
                     addEx={addEx}
                   
                     /> 

            </Popup>

        }


           

          
            
        </div>
    )
}
