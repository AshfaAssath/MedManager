import React,{useState,useCallback,useEffect} from 'react'
import {Select,InputLabel,MenuItem,FormControl,Paper,TextField,makeStyles, TableBody, TableRow, TableCell,Toolbar, InputAdornment,TableHead,Table,Button} from '@material-ui/core'
import {Search,AddIcon} from '@material-ui/icons';
import Re from './Re'
import Popup from '../../Component/Popup';
import axios from 'axios';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'

import authHeader from './../../../../services/auth-header';

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
        
        width:'85%',
        margin:theme.spacing(5),
        padding:theme.spacing(3)

    },
    root: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
      },


    }
))
export default function Table1() {

    const [openPopup,setOpenPopup]=useState(false);
    const[records,setRecords]=useState([])
    const[idforView,setIdforView]=useState('')
    const classes=useStyles();

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
     
    return ( 
       
    <div>

        <h5>Drug order list</h5>
       
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
            
            
        </div>
    )
}
