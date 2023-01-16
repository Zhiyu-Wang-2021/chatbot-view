import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import {useEffect} from "react";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";


const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/url_list/",
    timeout: 1000
})

function createData(url, ref, key) {
    return { url, ref, key};
}


export default function DialogList() {
    const [rows, setRows] = React.useState([])
    const refreshTable = () => {
        instance.get("")
            .then((res =>
                    setRows(
                        res.data.map(row =>
                            createData(row["url"], row["dialog_ref"]["$oid"], row["_id"]["$oid"])
                        ).reverse()
                    )
            )).catch((err) => {
                console.log("get list failed")
                console.log(err.message)
            })
    }
    useEffect(refreshTable, [])

    return (
        <Box sx={{padding: "10px"}}>
            <Button variant="outlined" onClick={refreshTable} sx={{margin: "6px"}}>Refresh Table</Button>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Website</TableCell>
                            <TableCell align="right">Reference Code</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.url}
                                </TableCell>
                                <TableCell align="right">{row.ref}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
