import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";


const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/url_list/",
    timeout: 1000
})

function createData(url, ref, key) {
    return { url, ref, key};
}



export default function BasicTable() {
    const [rows, setRows] = React.useState([])
    // const rows_data = (await instance.get("")).data
    // const rows = [
    //     createData("www.therossingtonpractice.nhs.uk", "63c47dfc3769657a57ebc669", "63c47dfc3769657a57ebc66a", 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    // ];
    if(rows.length === 0) {
        instance.get("")
            .then((res =>
                    setRows(
                        res.data.map(row =>
                            createData(row["url"], row["dialog_ref"]["$oid"], row["_id"]["$oid"])
                        ).reverse()
                    )
            ))
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
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
    );
}
