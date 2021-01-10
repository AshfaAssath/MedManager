import React ,{useState,useCallback,useEffect}from 'react'
import {Table, TableHead,Paper,TextField,makeStyles, TableBody, TableRow, TableCell,Toolbar, InputAdornment,Button} from '@material-ui/core'
import axios from 'axios';
import Moment from 'react-moment';



export default function Re2() {

    const [records,setRecords] = useState();
   // const {date}=props;



   


    const loadMedicine = useCallback(() => {
        axios
        .get("http://localhost:8080/pres/count/Mon Nov 05 2020")
        .then(result => setRecords(result.data));
      }, []);


      useEffect(() => {
        loadMedicine();
      }, [loadMedicine]);



      

    return (
        <div>
          <h3>Daily Report</h3>

            <Table >
            <TableHead >
                <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
              
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                <TableCell></TableCell>
                
               
                <TableCell>
                          {records} 
                 </TableCell>

                </TableRow>
            </TableBody>
            </Table>
            

       </div>
    )
}






