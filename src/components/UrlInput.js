import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Box from "@mui/material/Box";

import axios from "axios";
const register_instance = axios.create({
    baseURL: "http://127.0.0.1:8000/register_url/",
    timeout: 1000
})
const generate_instance = axios.create({
    baseURL: "http://127.0.0.1:8000/generate_json/",
    timeout: 1000 * 60 * 10
})

export default function UrlInput() {
    const [refNum, setRefNum] = React.useState('')
    const urlRef = React.useRef('')

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (referenceNum) => {
        console.log(refNum)
        setRefNum(referenceNum)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUrlSubmit = async () => {
        let referenceNum = await register_instance.post("", {
            "url": urlRef.current.value
        })  // use .data to fetch information in the axios promise
        handleClickOpen(referenceNum)
        console.log(referenceNum)
        generate_instance.post("", {
            "url": urlRef.current.value,
            "ref": referenceNum.data
        }).then(() => {
            console.log("json generated")
        })
        return console.log("waiting dialog json to be generated: " + referenceNum.data)
    }
    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '100ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    fullWidth
                    id="url-input"
                    label="Website"
                    variant="standard"
                    inputRef={ urlRef }
                />
                <Button variant="contained" onClick={ handleUrlSubmit }>Submit</Button>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Chatbot successfully generated"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"Your URL: " + urlRef.current.value + "\n"}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        {"Dialog Reference Code: " + refNum.data + "\n"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}