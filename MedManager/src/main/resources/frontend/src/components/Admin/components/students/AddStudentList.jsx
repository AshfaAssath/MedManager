import React, {useState} from 'react'
// import StudentService from "./StudentService";
import * as XLSX from 'xlsx'
import adminService from '../../../../services/admin.service'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core'
import Input from '@material-ui/core/Input';
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/CancelRounded';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#ffffff00',
        width: 'auto',
        marginTop: '90px',
        variant: 'none'
    },
    button: {
        spacing: '1',
        width: 'auto',
        variant: 'none'
    },
}))

export default function AddStudentList() {

    const classes = useStyles();

    const [values, setValues] = useState();
    const [open, setOpen] = useState(false);
    const [student, setStudent] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const readExcel = (file) => {
        const promise = new Promise((resolve,reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray,{type:'buffer'});
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };

            fileReader.onerror = ((error) => {
                reject(error);
            });
        });

        promise.then((d) => {
            console.log(d);
            for(let i=0; i<d.length;i++) {
                adminService.createStudent(d[i]).then(res => {
                    setValues(res.data);
                });
            }
        });

        // return promise;
    }

    const handleSubmit = (file) => {
        handleClose();
        // readExcel(file).then((d) => {
        //     console.log(d);
        //     for(let i=0; i<d.length;i++) {
        //         StudentService.createStudent(d[i]).then(res => {
        //             setValues(res.data);
        //         });
        //     }
        // });
        alert('Patient added successfully!!!');
        // window.location.reload();
    }

    const handleReset = e => {
        e.preventDefault();
        handleClose();
    };


    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                style={{marginTop:'25px'}}
                startIcon={<GroupAddIcon/>}
                className={classes.button}
                onClick={handleClickOpen}
            >
                Add Patient List
            </Button>

            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Patient List</DialogTitle>
                <DialogContent>
                    {/*<Button*/}
                    {/*     variant="outlined"*/}
                    {/*     color="primary"*/}
                    {/*     style={{marginBottom:'20px', marginTop:'10px'}}*/}
                    {/*     startIcon={<AttachFileIcon/>}*/}
                    {/*     className={classes.button}*/}
                    {/*>*/}
                        {/*<Input*/}
                        {/*     type="file"*/}
                        {/*     onChange={(e) => {*/}
                        {/*        const file = e.target.files[0];*/}

                        {/*        readExcel(file);*/}
                        {/*     }}*/}
                        {/*/>*/}
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                readExcel(file);
                            }}
                        />
                        {/* Choose File  */}
                    {/*</Button>*/}
                </DialogContent>
                <DialogActions style={{marginBottom: '20px', marginRight: '20px', marginLeft: '20px'}}>
                   <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    <Button 
                        variant="outlined"
                        color="secondary"
                        className={classes.button}
                        startIcon={<CancelIcon />}
                        onClick={handleReset}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
