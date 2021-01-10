import {Table, TableBody, TableCell, TableRow,Button,TextField,TableHead,Paper,makeStyles } from '@material-ui/core'
import React,{useState,useEffect,useCallback} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import authHeader from './../../../../services/auth-header';
import PharmacistService from '../../../../services/pharmacist.service';

const useStyles=makeStyles(theme=> ({
    table: {
         marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight:'600',
            color:'#b71c1c',
            backgroundColor: '#FEF2D1'
            //backgroundColor:  theme.palette.primary.light,

        },

    }
}))

const invalue={
    
    qun:''
    
}
  

export default function A(props) {

    const [values,setValues] = useState('');
    const [records,setRecords] = useState([]);
    const[sumQty,setSumQty]=useState([])
   
    const classes=useStyles();


    const handleInputChange=(e)=>{
        //const  {name,value}=e.target
        //setValues({
            //...values,
            //[name]:value
            
        //})
        setValues(e.target.value)
       
       
    }

    const loadPrescription = useCallback(() => {
        // axios
        // .get("http://localhost:8080/drugIssue/getD/"+props.recordForEdit)
        // .then(result => setRecords(result.data));
        axios
        .get("http://localhost:8080/api/test/pharmacist/drugIssue/getDr/"+props.recordForEdit,{headers:authHeader() })
        .then(result => setRecords(result.data));
      }, []);
  
      useEffect(() => {
        loadPrescription();
      }, [loadPrescription]);


      const loadSumQty = useCallback(() => {
        axios
        .get("http://localhost:8080/api/test/pharmacist/stock/SumQty",{headers:authHeader() })
        .then(result => setSumQty(result.data));
          
       
      }, []);
  
      useEffect(() => {
        loadSumQty();
      }, [loadSumQty]);


    
  

    const  handleUpdate=(item)=>{
       

        // axios        
        // .put("http://localhost:8080/stock/updateStock/"+ item.drug.drugCode + '/' + values)
        // .then((result) => {
       
        // })
        //alert(item.stock.drugCode)
    }

    const handlesubmit=()=>{


      // axios        
      //   .put("http://localhost:8080/api/test/pharmacist/pres/updateStat/"+props.recordForEdit,{headers:authHeader() })
      //   .then((result) => {
       
      //   })
      axios        
        .put("http://localhost:8080/api/test/pharmacist/pres/updateStat/"+props.recordForEdit, {},{headers:authHeader() })
         .then((result) => {
       
         })

        {
          records.map((item)=>
         
          axios        
            .post("http://localhost:8080/api/test/pharmacist/stock/updateStock/"+item.drugId+"/"+item.quantity, {}, {headers:authHeader() } )
            .then((result) => {
            })
          
        
           
          )
        }
        window.location.reload();
       
        props.setOpenPopup(false)


    //  {
    //   records.map(item=>
    //     {item.quantity>item.sumQty?
    //       (
                   
    //         alert(item.drugName+item.sumQty)
              
    //       )
    //       :(
    //         alert(item.quantity)  
    //       )
    //       }
    //      )
    //   }
    

    }
    


  // const {recordForEdit}=props;

    //const{recordForEdit}=props;
    return (
        <div>
                <Paper>
            <Table className={classes.table} size='small'>
            <TableHead >
                <TableRow>
                {/* <TableCell><b>Medicine</b></TableCell> */}
                <TableCell><b>Drug Code</b></TableCell>
                <TableCell><b>Drug Name</b></TableCell>
                <TableCell><b>Dosage</b></TableCell>
                <TableCell><b>Dosage Note</b></TableCell>
                <TableCell><b>Quantity</b></TableCell>
                <TableCell><b>Total Quantity in Stock</b></TableCell>
            </TableRow> 
            </TableHead>
            <TableBody>
           
                
          
               {records.map(item=>
                        (
                <TableRow>
                
                {/* <TableCell>{item.drug.drugName}</TableCell> 
               <TableCell>{item.drug.drugCode}</TableCell> 
                <TableCell>{item.dosage}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell> {item.quantity}</TableCell>
                <TableCell>  */}

                {/* <TableCell>{item.drug.drugName}</TableCell>  */}
               <TableCell>{item.drugId}</TableCell> 
               <TableCell>{item.drugName}</TableCell>
                <TableCell>{item.dosage}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell> {item.quantity}</TableCell>
                <TableCell> {item.sumQty}</TableCell>
                {/* <TableCell> 
                    
                 <TextField style={{margin:5,width:'30%'}}
                variant='outlined' 
                //label='Name'/
                name='qun'
                //value={values.qun}
                onChange={handleInputChange}
                />

               </TableCell> */}


                
               
                </TableRow>

               )
                   
                   )
                 }
           


                {/* {records.map(item=>
                        (
                          <TableRow>
                          <TableCell>{item}</TableCell>
                        </TableRow>
                        )
                )
                        } */}
           
                 
              
               


      

               {/* <TableCell> 

               <Button
                        style={{margin:10}}
                        type='submit'
                        variant='outlined'
                        size='large'
                        color='primary'
                        onClick={()=>{handleUpdate(item)}}
                        
                    >
                        Submit
                    </Button>

               </TableCell> */}

                
                      
                
            </TableBody>
            </Table>
            </Paper>



<br></br>

<br></br>




  { /* <Card  >
      <CardContent>
        
        <Typography variant="h5" component="h2">
          
        </Typography>
        <Typography  color="textSecondary">
          
        </Typography>
        <b>Description</b>
      </CardContent>
      
    </Card>*/}

             <Button
                        style={{margin:10}}
                        type='submit'
                        variant='outlined'
                        size='large'
                        color='primary'
                     // onClick={()=>props.setOpenPopup(false)}
                      onClick={handlesubmit}
                        
                    >
                       Ok
                    </Button>
            
            
            
        </div>
    )
}
