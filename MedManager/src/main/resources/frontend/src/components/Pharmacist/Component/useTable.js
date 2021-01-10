import React,{useState} from 'react';
import {Table, TableHead,TableRow,TableCell,makeStyles, TablePagination} from '@material-ui/core';

const useStyles=makeStyles(theme=> ({
    table: {
        minWidth:550,
        marginTop: theme.spacing(3),
        size:'small',
       
        '& thead th': {
            fontWeight:'600',
            color: '#b71c1c',
            backgroundColor:  '#FEF2D1',

        },
        '&  tbody td': { 
            fontWeight:'300',
            
        },

        '& tbody tr:hover':{
            backgroundColor: '£fffbf2',
            cursor:'pointer',
        },
    }
}))
  
export default function useTable(records,headCells) {


        const classes=useStyles();

        const pages= [5,10,25]
        const [page,setPage]=useState(0);
        const [rowsPerPage,setRowsPerPage]=useState(pages[page])
        
        
        const TblContainer = (props)=>(
            <Table className={classes.table} size='small' stickyHeader aria-label="sticky table">
                {props.children}
            </Table>
        )

        const TblHead= (props) =>{
            return (<TableHead>
                <TableRow>
                    {
                        headCells.map(headCell => (<TableCell key={headCell.id}>
                                {headCell.label}
                        </TableCell>)
                        )
                    }
                </TableRow>
            </TableHead>)
        }

        const TblPagination = ()=>  ( <TablePagination
            component='div'
            page={page}
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={records.length}
            />)
  
    return{
            TblContainer, 
            TblHead,
            TblPagination
        }

            
        
    
}
