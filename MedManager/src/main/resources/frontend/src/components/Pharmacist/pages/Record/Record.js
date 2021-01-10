import React,{useState,useCallback,useEffect} from 'react'
import {Grid,Select,InputLabel,MenuItem,FormControl,Paper,TextField,makeStyles, TableBody, TableRow, TableCell,Toolbar, InputAdornment,TableHead,Table,Button} from '@material-ui/core'
import {Search,AddIcon} from '@material-ui/icons';
import Re from './Re'
import Popup from '../../Component/Popup';
import axios from 'axios';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import Table1 from './Table1';
import Table2 from './Table2';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import authHeader from './../../../../services/auth-header';


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

const useStyles=makeStyles(theme=>({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight:'600',
            color: '#b71c1c',
            backgroundColor: '#FEF2D1', 
            //theme.palette.primary.light,

        },
        '&  tbody td': { 
            fontWeight:'300',
        },

        '& tbody tr:hover':{
            backgroundColor: '£fffbf2',
            cursor:'pointer',
        },
    },
    pageContent:{
        
        width:'90%',
        margin:theme.spacing(5),
        padding:theme.spacing(3)

    },

    }
))

const invalue={
    //id:0,
    //name:'',
    //category:'',
    //quantity:'',
   date:new Date(),
   id:''
    //to:new Date()
}

export default function Record() {
    const [values,setValues] = useState(invalue);
    const [openPopup,setOpenPopup]=useState(false);
    const [type,setType]=useState(null);
    const  [condition,setCondition]=useState(true);

  
    const[records,setRecords]=useState([])
    const[idforView,setIdforView]=useState('')
    //const classes=useStyles();

    const loadReport = useCallback(() => {
        axios
        .get("http://localhost:8080/api/test/pharmacist/stock/viewAllRep",{headers:authHeader() })
        .then(result => setRecords(result.data));
        // alert(result)
      }, []);


      useEffect(() => {
        loadReport();
        
      },[loadReport]);

      const openInPopup=(item)=>{
        setIdforView(item)
        setOpenPopup(true)
       
      }
     

    const generatReport=()=>{
        axios
        .get("http://localhost:8080/api/test/pharmacist/stock/report/pdf",{headers:authHeader() })
        .then((result) => {

            loadReport();
        
            //Reload the doggies to show also the new one
            //loadMedicine();
            // alert(result)
          })
    }

    // const handleInputChange=(e)=>{
    //     setType(e.target.value)
        
    //     if(e.target.value=='Daily Report'){
    //     setCondition(false)
    //     }
    //     else{
    //         setCondition(true) 
    //     }

    // }

    const classes=useStyles();

    
    const convertToDetEventPara=(name,value)=>({                //----Searching Date data
        target:{
            name, 
            value
        }
    })


    const handleInputChange=(e)=>{
        const  {name,value}=e.target
        setValues({
            //...values,
            [name]:value
        })
        //alert(values.date)
        //setValues(e.target.value)
       

    }

    const Search=()=>{

        if(values.id=''){
            // axios
            // .get("http://localhost:8080/pres/save/"+values.from +'/' +values.to)
            // .then(result => setRecords(result.data));
        }
        else{
            axios
            .get("ttp://localhost:8080/api/test/pharmacist/stock/rep/"+values.id)
            .then(result => setRecords(result.data)); 
        }
    }


    const reload=()=>{
        loadReport();
        //setRecordForSearch('');
    
       }   

  // const  SearchDateRecord=()=>{
       //alert(values.from)

    //if(recordForSearch!=null){
    //    axios
        //.get("http://localhost:8080/pres/save/"+values.from +'/' +values.to)
        //.then(result => setRecords(result.data));
       // }                                              //----Searching Date data
  // }
    return (
        <div>
           
           
           <Grid container direction='row' justify='flex-start' alignItem='flex-start' style={{width:'80%'}} >
                <Grid item xs={9}>
                    {/* <Paper style={{marginLeft:40,marginRight:40,marginTop:40}}> */}
                    <Grid item> 
                                                                        <Button
                                                                            //style={{margin:10,right:5,position: 'absolute', top: 140,
                                                                            //right: 130}}
                                                                            //type='submit'
                                                                            style={{margin:10,marginTop:40}}
                                                                            variant='outlined'
                                                                            size='large'
                                                                            color='primary'
                                                                        // onClick={()=>setOpenPopup(true )}
                                                                        onClick={generatReport}
                                                                        //display:'flex',
                                                                            
                                                                        >
                                                                            Generate Report
                                                                        </Button>
                                                                </Grid> 
                    {/* </Paper> */}
                    <Paper style={{marginLeft:40,marginRight:40,marginTop:40,width:'100%'}}>
                    {/* {condition ?
                        
                        <Table1 />

                        :

                        <Table2 datee={values.date}
                                title={'hiiii'}/>
                    } */}

<Table className={classes.table} size='small'>
       
       <TableHead >
           <TableRow>
           <TableCell>Report Id</TableCell>
           <TableCell>Date</TableCell>
          
           <TableCell>Report</TableCell>
       </TableRow>
       </TableHead>
       <TableBody>
     {  records.map(item=>
                   (
           <TableRow>
           <TableCell>{item.id} </TableCell>
           <TableCell>{item.date}</TableCell>
           
           <TableCell>
                       <Button color='primary'
                              onClick={()=>{openInPopup(item.id)}}
                               >
                           View
                       </Button>
            </TableCell>

           </TableRow>
                   )
                 )
                   }
                   
       </TableBody>
       </Table>
     

       
       <Popup
          // title={'Reports'
 openPopup={openPopup}
 setOpenPopup={setOpenPopup}>
     <Re 
      idforView={idforView}>
     </Re>
</Popup>

                    </Paper>
                </Grid>



                
                       

                        <Grid item xs={3}>

                                    <Paper style={{marginTop: '40px', width: '240px',marginLeft:80,marginRight:10}}>

                                         {/* <ThemeProvider theme={theme}> 
                                            {/*<form onSubmit={e =>{*/}
                                            {/*    e.preventDefault();*/}
                                            {/*    submit(e);*/}
                                            {/*}}>*/}
                                            {/* <form style={{padding:'20px', alignItems: 'center'}} > */} 
                                                <label style={{fontSize:'20px', fontWeight:'bold', padding:'20px'}}>Report Generating</label>
                                                <br/><br/>
                                                <Grid container direction='column' justify='flex-start' alignItems='stretch'>
                                                            <Grid item > 
                                                                       
                                                                            {/* <FormControl variant='outlined'  size='small'>
                                                                                    <InputLabel>Types Of Reports</InputLabel>
                                                                                        <Select  
                                                                                        label='Types Of Reports'
                                                                                        name='Types Of Reports'
                                                                                                                            
                                                                                    // value={values.category}
                                                                                    onChange={handleInputChange}
                                                                                        >
                                                                                        <MenuItem key='1' value='None'>None</MenuItem>  
                                                                                        <MenuItem key='1' value='Daily Report'>Daily Report</MenuItem>   
                                                                                        <MenuItem key='1' value='Order drug list'>Drug Order list</MenuItem> 
                                                                                        </Select>
                                                                                
                                                                                </FormControl> */}
                                                                        
                                                                </Grid> 
                                                                

                                                                <Grid item>
                                                                <div  >
                                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                                                            <KeyboardDatePicker
                                                                                disableToolbar variant='inline'
                                                                                inputVariant='outlined'
                                                                                label='Date'
                                                                                formate='MMM/dd/yyyy'
                                                                                name='date'
                                                                                size='small'
                                                                                style={{margin:10}}
                                                                            value={values.date}
                                                                            onChange={date=>handleInputChange(convertToDetEventPara('date',date))}
                                                                                        
                                                                            />
                                                                    </MuiPickersUtilsProvider>
                                                                </div>
                                                            </Grid> 

                                                            <Grid item>

                                                            <TextField

                                                                variant='outlined'
                                                                label='Search Report By id'
                                                                name='id'
                                                                style={{margin:10}}
                                                                value={values.id}
                                                                onChange={handleInputChange}
                                                            />


                                                            </Grid>


                                                            
                                            <Grid item>
                                                <Button
                                                //style={{margin:10,right:5,position: "fixed", top: 130,
                                                // right: 95
                                                style={{margin:10,padding:5,top:10}}
                                               
                                                
                                                    variant='outlined'
                                                    type='submit'
                                                    size='medium'
                                                    color="primary"
                                                    onClick={Search}
                                                    
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

                                                    
                                                                                             
                                                        </Grid>
                                            {/* </form>
                                         </ThemeProvider>  */}
                                    </Paper>
                                    </Grid>

                    
            </Grid>

         
           {/* <Table className={classes.table}>
            <TableHead >
                <TableRow>
                <TableCell>Date</TableCell>
                <TableCell></TableCell>
                <TableCell>Report</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                <TableCell>02/08/2020</TableCell>
                <TableCell> </TableCell>
                <TableCell>
                            <Button color='primary'
                                   onClick={()=>setOpenPopup(true )}
                                    >
                           
                                View

                            </Button>
                 </TableCell>

                </TableRow>
            </TableBody>
            </Table>
           

            
            <Popup
               // title={'Reports'}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
                     <Re></Re>

            </Popup>*/}

      
            
        </div>
    )
}
