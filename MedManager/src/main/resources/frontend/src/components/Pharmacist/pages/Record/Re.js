import React ,{useState,useCallback,useEffect}from 'react'
import {Table, TableHead,Paper,TextField,makeStyles, TableBody, TableRow, TableCell,Toolbar, InputAdornment,Button} from '@material-ui/core'
import axios from 'axios';

import authHeader from './../../../../services/auth-header';
export default function Re(props) {

    const [records,setRecords] = useState([]);


    const loadReportDetails= useCallback(() => {
      axios
      .get("http://localhost:8080/api/test/pharmacist/stock/reports/"+props.idforView,{headers:authHeader() })
      .then(result => setRecords(result.data));
    }, []);

    //+props.setIdforView
    

    useEffect(() => {
    
      loadReportDetails();
    }, [loadReportDetails])
    return (
      <div>
      <h3>Drug Order List</h3>

      <Table size='small'>
   
   <TableHead >
       <TableRow>
       <TableCell>Drug Code</TableCell>
       <TableCell>Drug Name</TableCell>
      
       <TableCell>Order Quantity</TableCell>
   </TableRow>
   </TableHead>
   <TableBody>
   {  records.map(item=>
                        (
       <TableRow>
       <TableCell>{item.drugCode} </TableCell>
       <TableCell>{item.drugName}</TableCell>
       <TableCell>{item.orderQuantity}</TableCell>
       
      

       </TableRow>
               )
             )
               } 
   </TableBody>
   </Table>
 

       </div>
    )
}






