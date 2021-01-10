import React ,{useState, useEffect,useCallback} from 'react'
import DrugForm from './DrugForm'
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

import authHeader from './../../../../services/auth-header';



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
    
    {id:'drugCode',label:'Drug Code'},
    {id:'name',label:'Medicine Name'},
   
    {id:'category',label:'Category'},
    {id:'lowquantity',label:'Low Quantity'},
    {id:'orderquantity',label:'Order Quantity'},
    
   
    {id:'action',label:'Action'},
    //{id:'action',label:'Action'}
    

    
]

export default function Drug() {

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
        axios
        .get("http://localhost:8080/api/test/pharmacist/drug/low",{headers:authHeader() })
        .then((result) => setRecordForAlert(result.data) 
        
        )
               
      }, []);

      const loadAlert1 = useCallback(() => {

       axios
        .get("http://localhost:8080/api/test/pharmacist/drug/ex/2020-11-29",{headers:authHeader() })
        .then((result) => setRecordForAlert1(result.data) 
        
        )
        
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
        axios
        .get("http://localhost:8080/api/test/pharmacist/drug/viewAll",{headers:authHeader()})
        .then(result => setRecords(result.data));
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
    .get("http://localhost:8080/api/test/pharmacist/stock/drug/"+recordForSearch,{headers:authHeader() })
    .then(result => setRecords(result.data));
    }
   }

    const reload=()=>{
    loadMedicine();
    setRecordForSearch('');

   }

   //searching



   //adding and updating
    const addOrEdit=(medicine)=>{
        // if(medicine.drugCode==''){ 
            axios
            .post("http://localhost:8080/api/test/pharmacist/drug/save",medicine,{headers:authHeader() })
            .then((result) => {
              //Reload the doggies to show also the new one
              loadMedicine();
            })
          setOpenPopup(false)
    //  }
    //     else{
    //     axios        
    //       .put("http://localhost:8080/stock/save/"+ medicine.drugCode,medicine)
    //       .then((result) => {
    //         //Reload the doggies to show also the new one
    //         loadMedicine();
    //       })
      
    //     setOpenPopup(false)
    //        }
        
    }

    // const addEx=(medicinee)=>{
   
        
    //   axios
    //       .post("http://localhost:8080/stock/saveE/"+ medicinee.drugCode,medicinee)
    //       .then((result) => {
    //         //Reload the doggies to show also the new one
    //         loadMedicine();
    //       })
    //       setOpenPopup(false)
    // }

                                                             //adding and updating
        
   
        
const openInPopup=(item) =>{
   
    setRecordForEdit(item)
    setOpenPopup(true)
}

const onDelete=(item)=>{
    axios
    .delete("http://localhost:8080/api/test/pharmacist/drug/delete/"+item.drugCode,{headers:authHeader() })
    .then((result) => {
        //Reload the doggies to show also the new one
        loadMedicine();
      })
    
}
    return (
                      
        <div>


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
                        
                        <TableCell>{item.drugCode}</TableCell>

                        <TableCell>{item.drugName}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.lowQuantity}</TableCell>
                        <TableCell>{item.orderQuantity}</TableCell>
                    
                        <TableCell>

                          <Grid container direction='row'>
                            <Grid item sm={6}>
                           <Button color='primary' onClick={()=>{openInPopup(item)}}>
                                <EditOutlinedIcon fontsize='small'></EditOutlinedIcon>
                           </Button> 
                            </Grid>

                           <Grid item sm={6}> 
                            <Button color='secondary' onClick={()=>{onDelete(item)}}  >
                                <DeleteForeverIcon fontsize='small'/>
                            </Button>
                             </Grid> 

                          </Grid>
                         </TableCell> 
                        </TableRow>
                                                                                            
                       )
                       )
                   }
               </TableBody>
           </Table>
                   </TableContainer>


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
                          Add New Medicine
                    </Button>
                    </Grid> 

                    {/* <Grid item>
                          <Button
                       style={{marginRight:100,width:200}}
                      // right: 130}}     
                        variant='outlined'
                        size='large'
                        color="primary"
                       onClick={addExMed}
                        
                      >
                          Add Exsisting Medicine
                    </Button>
                    </Grid>  */}
                    <Grid item >
                    </Grid>
            </Grid>
        </Grid>


        
            <Popup
                title={'Medicine Form'}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
                     <DrugForm  
                     recordForEdit={recordForEdit}
                     addOrEdit={addOrEdit}
                     /> 

            </Popup>

            

          

        


           

          
            
        </div>
    )
}
