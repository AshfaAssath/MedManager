import React from 'react'
import * as XLSX from 'xlsx';
import {useState} from 'react';

function AddAppointmentList() {

    const [appointment, setAppointment] = useState([]);

    const readExcel = (file) => {
        const promise = new Promise((resolve,reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray,{type:'buffer'});
                const wsname = wb.SheetNames[0];
                const data = XLSX.utils.sheet_to_json(wsname);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            console.log(d);
            setAppointment(d);
        })
    }

    return (
        <div>
            <input 
                type="file" 
                onChange={(e) => {
                    const file = e.target.files[0];

                    readExcel(file);
                }}
            />
        </div>
    )
}

export default AddAppointmentList;
