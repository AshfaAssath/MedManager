import React from "react";
import { useCallback, useEffect, useState} from 'react';

import axios from 'axios';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import StudentService from "./StudentService";
import adminService from "../../../../services/admin.service";


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'id', numeric: true, disablePadding: true, label: 'ID' },
    { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
    { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
    // { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
    { id: 'faculty',  numeric: false, disablePadding: false, label: 'Faculty' },
    { id: 'acedemicYear', numeric: true, disablePadding: false, label: 'Acedemic Year' },
    { id: 'gender',  numeric: false, disablePadding: false, label: 'Gender' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'contactNumber',  numeric: false, disablePadding: false, label: 'Contact Number' },
    { id: 'activeStatus',  numeric: false, disablePadding: false, label: 'Active Status' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Action'}
    // { id: 'height', numeric: true, disablePadding: false, label: 'Height' },
    // { id: 'weight',  numeric: true, disablePadding: false, label: 'Weight' },
    // { id: 'chronicDisease',  numeric: false, disablePadding: false, label: 'Chronic Disease' },
    // { id: 'allergies',  numeric: false, disablePadding: false, label: 'Allergies' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all students' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        //align={headCell.numeric ? 'right' : 'left'}
                        align='right'
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        //padding='10px'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));



const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Patient List
                </Typography>
            )}

            {/* {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )} */}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '90px',
        // marginLeft: '280px',
        // marginRight: '0px',
        marginBottom: '50px',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 2,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: 10,
        overflow: 'hidden',
        padding: 10,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    tableCell: {
        align: 'center',
        padding: '100px',
        marginLeft: '50px',
        marginRight: '50px',
    },
}));


    /*------------------------------------Main Function---------------------------------------*/

function ListStudents() {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    //--------------------------My Codes----------------------------------------

    const [records, setRecords] = useState([]);

    useEffect(() => {
        getStudent();
    },[]);

    const getStudent= useCallback(() => {
            adminService.getAllStudents(records)
            .then(data => {
                setRecords(data.data);
            }).catch(err => alert(err));
    },[records]);


    // const deleteStudent(id) {
    //     StudentService.deleteStudent(id).then(response => {
    //         if(response.data != null){
    //             alert("Patient Deleted Successfully");
    //             setRecords({
    //                 student: records.student.filter(row => row.id !== id)
    //             });
    //         }
    //     });
    // }
    // useEffect(() => {
    //    deleteStudent();
    // });
    //
    // const deleteStudent = useCallback(() => {
    //     StudentService.deleteStudent(records.id)
    //         .then(data => {
    //             setRecords(data.data);
    //         }).catch(err => alert(err));
    // },[records]);

    //--------------------------My Codes----------------------------------------

   //  const [records, setRecords] = useState([]);
   //
   //  useEffect(() => {
   //           getStudent();
   //       },[]);
   //
   //  const getStudent= useCallback(()=>{
   //      axios
   //      .get("http://localhost:8080/api/v1/Student")
   //      .then(data =>
   //         setRecords(data.data));
   //
   //  },[]
   // );


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = records.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, records.length - page * rowsPerPage);

        return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={records.length}
                        />
                        <TableBody>
                            {stableSort(records, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none" align="right">{row.id}</TableCell>
                                            <TableCell align="right">{row.firstName}</TableCell>
                                            <TableCell align="right">{row.lastName}</TableCell>
                                            <TableCell align="right">{row.faculty}</TableCell>
                                            <TableCell align="right">{row.acedemicYear}</TableCell>
                                            <TableCell align="right">{row.gender}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{row.contactNumber}</TableCell>
                                            <TableCell align="right">{row.activeStatus}</TableCell>
                                            <TableCell align="right">

                                                
                                            </TableCell>
                                            {/*<TableCell align="right">{row.weight}</TableCell>
                                            <TableCell align="right">{row.chronicDisease}</TableCell>
                                            <TableCell align="right">{row.allergies}</TableCell> */}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={records.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
    );
}

export  default ListStudents;
