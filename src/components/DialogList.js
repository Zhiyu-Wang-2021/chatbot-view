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
import {backendBaseUrl} from "../env";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";


const instance = axios.create({
    baseURL: backendBaseUrl + "url_list/",
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
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Generation History
                    </Typography>
                    <div style={{ flexGrow: 5 }}></div>
                    <div style={{ flexGrow: 1 }}>
                        <Button color="inherit" variant="outlined" onClick={refreshTable} sx={{margin: "6px"}}>Refresh</Button>
                    </div>
                </Toolbar>
            </AppBar>
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
