import React,{useState,useCallback,useEffect} from 'react'
//import {Paper, TableBody, TableRow, TableCell, InputAdornment,Button} from '@material-ui/core'
import {AppBar,Table,makeStyles,Grid,InputBase,IconButton,Select,Toolbar,Badge,TextField, FormControl, InputLabel,MenuItem,Paper, TableBody, TableRow, TableCell, InputAdornment,Button} from '@material-ui/core'
import useTable from '../../Component/useTable';
import CloseIcon from '@material-ui/icons/Close';
import {Search,AddIcon} from '@material-ui/icons';
import A from './A';
import Popup from '../../Component/Popup';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search';
//import IconButton from '@material-ui/core/IconButton';
import TablePagination from '@material-ui/core/TablePagination'
import MomentUtils from "@date-io/moment";

import Moment from 'react-moment';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SearchStudent from '../../Component/SearchStudent';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import CheckIcon from '@material-ui/icons/Check';
//import CheckCircleIcon from '@material-ui/icons/CheckCircle';
 import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import authHeader from './../../../../services/auth-header';
import pharmacistService from '../../../../services/pharmacist.service';

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

const theme = createMuiTheme({
    overrides: {
        MuiFormControl: {
            root: {
                width: '80%',
                //   spacing: 1,
                marginBottom: '25px',
                marginLeft: '12%',
                maxWidth: '240px',
            },
        },
    },
});

const headCells=[
    {id:'id',label:'Id'},
    {id:'issuedDate',label:'Date'},
    {id:'student_id',label:'Student ID'},
    {id:'faculty',label:'Faculty'},
    {id:'academicYear',label:'Academic Year'},
    //{id:'doctor_id',label:'Doctor ID'},
    // {id:'treatment',label:'Treatment'},
    {id:'diagnosis',label:'Diagnosis'},
    {id:'action',label:'Drug Issuing'},
    {id:'PrescriptionStatus',label:'Prescription Status'},
    //{id:'presMedicines',label:'Prescribed Medicines'},
    //{id:'expireDate',label:'Expire Date'},
    //{id:'faculty',label:'Faculty'},
    // {id:'regNumber',label:'Registration Number'},
     
]

const invalue={
    academicYear:'All',
    faculty:'All',
    from:new Date(),
    to:new Date(),
    presStatus:''
}



export default function Prescription() {

    const classes=useStyles();
    const [values,setValues] = useState(invalue);
    const [records,setRecords] = useState([]);
    const [openPopup,setOpenPopup]=useState(false);
    const [recordForEdit,setRecordForEdit]=useState('');
    const [recordForSearch,setRecordForSearch]=useState('');
    //const [DateFrom,setDateFrom]=useState(null);
   // const [DateTo,setDateTo]=useState(null);


   const pages =[4,10,15]
   const [page, setPage] =useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(pages[page]);


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
   
    const loadPrescription = useCallback(() => {
        axios
        .get("http://localhost:8080/api/test/pharmacist/pres/viewAll",{headers:authHeader() })
        .then(result => setRecords(result.data));
      }, []);

      useEffect(() => {
        loadPrescription();
      }, [loadPrescription]);



    const {                             //-----Calling table Component
        TblContainer,
        TblHead,
       //TblPagination
    } =useTable(records,headCells);

 
   const openInPopup=(item) =>{    //-----------Viewinng
            setRecordForEdit(item)
            setOpenPopup(true)
       //alert(item)
    }

       

        const convertToDetEventPara=(name,value)=>({                //----Searching Date data
            target:{
                name, 
                value
            }
        })

   
        const handleInputChange=(e)=>{
            const  {name,value}=e.target
            setValues({
                ...values,
                [name]:value
            })
 
        }
//searching Status prescription
        const handleInputChangeStatus=(e)=>{
            if(e.target.value=='Issued'){
                axios
                .get("http://localhost:8080/api/test/pharmacist/pres/StatusTrue",{headers:authHeader() })
                .then(result => setRecords(result.data));
            }
            else if(e.target.value=='NotIssued'){
                axios
                .get("http://localhost:8080/api/test/pharmacist/pres/StatusFalse",{headers:authHeader() })
                 .then(result => setRecords(result.data));
            }
        }
//searching segment
       const  SearchDateRecord=()=>{
           //alert(values.from)

         if(values.faculty=='All' && values.academicYear=='All'){
            alert(values.presStatus)
            // axios
            // .get("http://localhost:8080/api/test/pharmacist/pres/save/"+values.from+'/'+values.to,{headers:authHeader() })
            // .then(result => setRecords(result.data));

            console.log("values from "+values.from+ " values to "+ values.to);
            let toDayfrom = values.from.getFullYear() + '-' + (values.from.getMonth() + 1) + '-' + values.from.getDate();
            let toDayto = values.to.getFullYear() + '-' + (values.to.getMonth() + 1) + '-' + values.to.getDate();

                pharmacistService.getPresByTimeDuration(toDayfrom,toDayto).then((res)=>{
                    setRecords(res.data);
                })
            }  

        else if(values.academicYear=='All'){
            let toDayfrom = values.from.getFullYear() + '-' + (values.from.getMonth() + 1) + '-' + values.from.getDate();
            let toDayto = values.to.getFullYear() + '-' + (values.to.getMonth() + 1) + '-' + values.to.getDate();

             axios
             .get("http://localhost:8080/api/test/pharmacist/pres/save/search/"+values.faculty+'/'+toDayfrom+'/'+toDayto,{headers:authHeader() })
             .then(result => setRecords(result.data));

            // axios
            // .get("http://localhost:8080/pres/save/search/"+values.faculty)
            // .then(result => setRecords(result.data));
        }  
        else if(values.faculty=='All'){
            let toDayfrom = values.from.getFullYear() + '-' + (values.from.getMonth() + 1) + '-' + values.from.getDate();
            let toDayto = values.to.getFullYear() + '-' + (values.to.getMonth() + 1) + '-' + values.to.getDate();

            axios
            .get("http://localhost:8080/api/test/pharmacist/pres/save/searchY/"+values.academicYear+'/'+toDayfrom +'/'+ toDayto,{headers:authHeader() })
            .then(result => setRecords(result.data));
        } 
      
        else{
            let toDayfrom = values.from.getFullYear() + '-' + (values.from.getMonth() + 1) + '-' + values.from.getDate();
            let toDayto = values.to.getFullYear() + '-' + (values.to.getMonth() + 1) + '-' + values.to.getDate();

            axios
            .get("http://localhost:8080/api/test/pharmacist/pres/save/search/"+values.faculty+'/'+values.academicYear+'/'+toDayfrom +'/'+ toDayto,{headers:authHeader() })
            .then(result => setRecords(result.data));
        } 
        axios
        .post("http://localhost:8080/api/test/pharmacist/stock/updateStock/P-1/12",{headers:authHeader() })
        .then((result) => {
          //Reload the doggies to show also the new one
          // loadMedicine();
        })
        
        //----Searching Date data
       }

       // const searchDate=()=>{
            //alert(values.from)
        //}
    // const handleOutputChange=(e)=>{

        //setDateTo(e.target.value)

     //}


        const handleChange = e =>{                          //-----------searching

        setRecordForSearch(e.target.value)
        
        }

    const search=()=>{
        if(recordForSearch!=null){
        axios
        .get("http://localhost:8080/api/test/pharmacist/pres/save/"+recordForSearch,{headers:authHeader() })
        .then(result => setRecords(result.data));
        }
    }
    
       const reload=()=>{
        loadPrescription();
        setRecordForSearch('');
    
       }                                                        //-------------searching


    //    const submit = e => {                                    //select segment
    //     e.preventDefault();
    //     const {name, value} = e.target
    //     setValues({
    //         ...values,
    //         [name]: value
    //     })
    // };


    return (
        <div>

           
        <Grid container direction='row' justify='flex-start' alignItem='flex-start'>
        <Grid item xs={9} direction='column' justify='flex-start' alignItem='center' position='fixed'>
           {/* <Paper style={{ width:'95%',margin:50}}> */}

           <Grid item>
         <Paper style={{marginTop:40,marginLeft:80,marginRight:130}} > 
               
            <Toolbar>
                    <TextField style={{margin:5,width:'100%'}}
                        variant='outlined'
                        label='Search Prescription'
                    // className={classes.searchInput}
                        value={recordForSearch}
                        size='small'
                        InputProps={{
                        endAdornment: (<InputAdornment position='start'>
                            <IconButton  onClick={search} style={{padding:10,left:15}}>
                            <SearchIcon />
                            </IconButton>

                            <IconButton  onClick={reload} style={{padding:10,left:15}}>
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
            {/* <SearchStudent/> */}
           </Grid>

          
           <Paper  style={{ width:'95%',marginLeft:20,marginRight:250,marginTop:40}}> 
                                   
                 
            {/* <TblContainer style={{ maxHeight: 350,minWidth:600 }}>
               */}
               <TableContainer  style={{maxHeight: 350}}>
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
               {/* <TblHead/> */}
              
               <TableBody>

               {
                      recordafterPaging().map(item=>
                        (
                        <TableRow> 
                        <TableCell>{item.id}</TableCell>
                        <TableCell><Moment format="YYYY/MM/DD">{item.issuedDate}</Moment></TableCell>
                        <TableCell>{item.student.id}</TableCell>
                        <TableCell>{item.student.faculty}</TableCell>
                        <TableCell>{item.student.acedemicYear}</TableCell>
                        
                        {/*<TableCell>{item.doctor_id}</TableCell>*/}
                        
                        {/* <TableCell>{item.treatment}</TableCell> */}
                        <TableCell>{item.diagnosis}</TableCell>
                    
                    
                        <TableCell>
                            <Button color='primary'
                                    onClick={()=>{openInPopup(item.id)}} >
                           
                                View

                            </Button>
                        </TableCell>
                        <TableCell>
                            {item.presStatus===true?
                            (
                                     
                                     <CheckCircleIcon fontsize='small'
                                     color="primary"/>
                                     
                                
                            )
                            :(
                                <CheckCircleOutlineIcon fontsize='small'
                                     color="secondary"/>
                            )
                            }
                            
                                

                           

                           
                        </TableCell>
                       {/*<TableCell>
                            <Button color='primary' onClick={()=>{openInPopup(item)}}>
                                <EditOutlinedIcon fontsize='small'></EditOutlinedIcon>

                            </Button>
                        </TableCell>
                        <TableCell>
                            <Button color='secondary' onClick={()=>{onDelete(item.name)}}>
                                <CloseIcon fontsize='small'/>

                            </Button>
                       </TableCell>*/}
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

                
          <Grid item xs={3}>

                         <Paper style={{marginTop: '40px', width: '240px',marginLeft: 10,marginRight:40}}>

                                {/* <ThemeProvider theme={theme}> */}
                                    {/*<form onSubmit={e =>{*/}
                                    {/*    e.preventDefault();*/}
                                    {/*    submit(e);*/}
                                    {/*}}>*/}
                                    {/* <form style={{padding:'20px', alignItems: 'center'}} >
                                        <label style={{fontSize:'20px', fontWeight:'bold', padding:'20px'}}>Filter Segment</label>
                                        <br/><br/>
                                        <Grid container direction='column' justify='flex-start'> */}

                                <label style={{fontSize:'20px', fontWeight:'bold', padding:'20px'}}>Filter Segment</label>
                                        <Grid item>
                                                  <FormControl variant="outlined" size="small"  style={{width:'90%',margin:10}}> 
                                                    <InputLabel>Prescription Status</InputLabel>
                                                    <Select
                                                        label="Prescription Status"
                                                       name="presStatus"    
                                                        value={values.presStatus}
                                                        onChange={handleInputChangeStatus}
                                                       // style={{margin:10,width:'100%'}}
                                                       
                                                    >
                                                        <MenuItem value="Issued">Issued</MenuItem>
                                                        <MenuItem value="NotIssued">Not Issued</MenuItem>
                                                       
                                                    </Select>
                                                 </FormControl>  
                                            </Grid>
                                            
                                            
                                            
                                            <Grid item>
                                         
                                                <FormControl variant="outlined" size="small" style={{width:'90%',margin:10}}>
                                                    <InputLabel>Faculty</InputLabel>
                                                    <Select
                                                        label="Faculty"
                                                        name="faculty"
                                                        value={values.faculty}
                                                        onChange={handleInputChange}
                                                    >
                                                        {/* <MenuItem value="All">All</MenuItem>
                                                        <MenuItem value="Science">Faculty of Science</MenuItem>
                                                        <MenuItem value="Humanities and Social Science">Faculty of Humanities and Social Science</MenuItem>
                                                        <MenuItem value="Fisheries and Marine Science Technology">Faculty of Fisheries and Marine Science Technology</MenuItem>
                                                        <MenuItem value="Management">Faculty of Management and Finance</MenuItem> */}


<MenuItem value="All">All</MenuItem>
                                                        <MenuItem value="SC">Faculty of Science</MenuItem>
                                                        <MenuItem value="HS ">Faculty of Humanities and Social Science</MenuItem>
                                                        <MenuItem value="FMST">Faculty of Fisheries and Marine Science Technology</MenuItem>
                                                        <MenuItem value="MGT">Faculty of Management and Finance</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid> 

                                            <Grid item>
                                                  <FormControl variant="outlined" size="small"  style={{width:'90%',margin:10}}> 
                                                    <InputLabel>Academic Year</InputLabel>
                                                    <Select
                                                        label="Academic Year"
                                                       name="academicYear"
                                                        value={values.academicYear}
                                                        onChange={handleInputChange}
                                                       // style={{margin:10,width:'100%'}}
                                                       
                                                    >
                                                        <MenuItem value="All">All</MenuItem>
                                                        <MenuItem value="2015-2016">2015/16</MenuItem>
                                                        <MenuItem value="2016-2017">2016/17</MenuItem>
                                                        <MenuItem value="2017-2018">2017/18</MenuItem>
                                                        <MenuItem value="2018-2019">2018/19</MenuItem>
                                                    </Select>
                                                 </FormControl>  
                                            </Grid>

                                            <Grid item>
                                                
                                                        
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                                                    <KeyboardDatePicker
                                                                        disableToolbar variant='inline'
                                                                        inputVariant='outlined'
                                                                        label='From'
                                                                    formate='MMM/dd/yyyy'
                                                                        //format='MMM/dd/yyyy'
                                                                        name='from'
                                                                        value={values.from}
                                                                        size='small'
                                                                        style={{margin:10}}
                                                                    onChange={date=>handleInputChange(convertToDetEventPara('from',date))}
                                                                                            
                                                                    />

                                                            </MuiPickersUtilsProvider>
                                                          

                                            </Grid>

                                                    
                                            <Grid item>

                                            
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <KeyboardDatePicker
                                                                    disableToolbar variant='inline'
                                                                    inputVariant='outlined'
                                                                    label='To'
                                                                    formate='MMM/dd/yyyy'
                                                                    name='to'
                                                                    value={values.to}
                                                                    size='small'
                                                                    style={{margin:10}}
                                                                onChange={date=>handleInputChange(convertToDetEventPara('to',date))}
                                                                                                            
                                                                />
                                                        </MuiPickersUtilsProvider>
                                                    
                                            </Grid>

                                           
                                            {/* <Grid item direction='row'  alignItem='center'  > */}

                                            <Grid item>
                                                <Button
                                                //style={{margin:10,right:5,position: "fixed", top: 130,
                                                // right: 95
                                                style={{margin:10,padding:5,top:10}}
                                               
                                                
                                                    variant='outlined'
                                                    type='submit'
                                                    size='medium'
                                                    color="primary"
                                                    onClick={SearchDateRecord}
                                                    
                                                >
                                                    Search
                                                </Button>
                                            </Grid>

                                            <Grid item>

                                                    <Button
                                                    //style={{margin:10,right:5,position: "fixed", top: 130,
                                                    // right: 95
                                                    style={{margin:10,padding:5,bottom:45,left:80}}
                                                   
                                                
                                                    
                                                        variant='outlined'
                                                        type='submit'
                                                        size='medium'
                                                        onClick={reload}
                                                        color="primary"
                                                        
                                                    >
                                                        Reload
                                                    </Button>
                                            </Grid>
                                           

                                            {/* </Grid> */}




                                            {/* <Grid item style={{marginLeft: '120px'}}>
                                                <Button   
                                                    variant="outlined"
                                                    onClick={submit}
                                                    spacing='1'
                                                    color='primary'
                                                    variant="outlined" 
                                                    startIcon={<CheckCircleIcon />}
                                                >
                                                    Select
                                                </Button>
                                            </Grid> */}
                                        {/* </Grid> */}
                                    {/* </form> */}
                                {/* </ThemeProvider> */}
                            </Paper>
              
               </Grid>
           
         </Grid>


       

            <Popup
                title={'Drug Issuing'}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                
            
                >
                   
                    <A recordForEdit={recordForEdit}
                         openPopup={openPopup}
                       setOpenPopup={setOpenPopup}/>
            </Popup>

            


        </div>
    )
}
