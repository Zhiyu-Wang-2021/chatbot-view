import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Box from "@mui/material/Box";
import Snackbar from '@mui/material/Snackbar';
import LinearProgress from '@mui/material/LinearProgress';

import axios from "axios";
import {backendBaseUrl} from "../env";
const register_instance = axios.create({
    baseURL: backendBaseUrl + "register_url/",
    timeout: 1000
})
const generate_instance = axios.create({
    baseURL: backendBaseUrl + "generate_json_e/",
    timeout: 1000 * 60 * 10
})

export default function UrlInput() {
    const [isOpenSuccNotif, setIsOpenSuccNotif] = React.useState(false);
    const [isSucc, setIsSucc] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false)

    const handleSuccOpen = () => {
        setIsOpenSuccNotif(true);
    };

    const handleSuccClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpenSuccNotif(false);
    };

    // const notifMsg = () => {
    //     if(isSucc) return "JSON successfully generated"
    //     else return "JSON fail to generate"
    // }

    const [refNum, setRefNum] = React.useState('')
    const urlRef = React.useRef('')

    const [openSubmitNotif, setOpenSubmitNotif] = React.useState(false);
    const handleClickOpenSubmitNotif = (referenceNum) => {

        setRefNum(referenceNum)
        setOpenSubmitNotif(true);
    };

    const handleCloseSubmitNotif = () => {
        setOpenSubmitNotif(false);
    };

    const handleUrlSubmit = async () => {

        let referenceNum = await register_instance.post("", {
            "url": urlRef.current.value
        }).catch((err) => {
            console.log("register failed")
            console.log(err.message)
        })  // use .data to fetch information in the axios promise
        if(referenceNum) {
            handleClickOpenSubmitNotif(referenceNum)
            console.log(referenceNum)
            setIsLoading(true)
            generate_instance.post("", {
                "url": urlRef.current.value,
                "ref": referenceNum.data
            }).then(() => {
                console.log("json generated")
                setIsSucc(true)
                handleSuccOpen()
                setIsLoading(false)
            }).catch((err) => {
                console.log("generation failed")
                console.log(err.message)
                setIsSucc(false)
                handleSuccOpen()
                setIsLoading(false)
            })
            console.log("waiting dialog json to be generated: " + referenceNum.data)
        } else {
            setIsSucc(false)
            handleSuccOpen()
            console.log("submit failed")
        }
    }





    return (
        <div>
            <Box sx={{ display: isLoading ? 'relative' : 'none' }} >
                <p>generating...</p>
                <LinearProgress />
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1},
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
                open={openSubmitNotif}
                onClose={handleCloseSubmitNotif}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Your chatbot will be ready in 10 minutes"}
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
                    <Button onClick={handleCloseSubmitNotif} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={isOpenSuccNotif}
                autoHideDuration={6000}
                onClose={handleSuccClose}
            >
                <Alert onClose={handleSuccClose} severity={isSucc ? "success" : "error"} sx={{ width: '100%' }}>
                    {isSucc ? "JSON successfully generated" : "JSON fail to generate"}
                </Alert>
            </Snackbar>
        </div>
    );
}