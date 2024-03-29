import * as React from 'react';
import TextField from '@mui/material/TextField';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputAdornment
} from "@mui/material";
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
    timeout: 1000 * 60 * 20
})


/**
 * this component is used for inputting the trust's URL
 * after inputting the URL, it will tell the backend to start generating the chatbot JSON file
 * in the meantime, it will also provide the user with the Reference Code that is used to get the chatbot later
 * @returns {JSX.Element}
 * @constructor
 */
export default function UrlInput() {
    const [isOpenSuccNotif, setIsOpenSuccNotif] = React.useState(false)
    const [isSucc, setIsSucc] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [refNum, setRefNum] = React.useState('')
    const urlRef = React.useRef('')
    const [openSubmitNotif, setOpenSubmitNotif] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)
    const [helperText, setHelperText] = React.useState("")


    /**
     * This function is used for showing the generation success message
     */
    const handleSuccOpen = () => {
        setIsOpenSuccNotif(true)
    }

    /**
     * This function is used for closing the generation success message
     */
    const handleSuccClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpenSuccNotif(false)
    }

    /**
     * This function is used for showing the generation start message.
     * A reference code will be included in the message.
     */
    const handleClickOpenSubmitNotif = (referenceNum) => {

        setRefNum(referenceNum)
        setOpenSubmitNotif(true)
    }

    /**
     * This function is used for closing the generation start message
     */
    const handleCloseSubmitNotif = () => {
        setOpenSubmitNotif(false)
    }

    /**
     * This function handles the URL submission.
     * It posts the URL string got from urlRef to the backend to register the URL in the database.
     * After the URL successfully registered, it will post both the URL string and the Reference Code
     * to the backend to start the chatbot generation.
     * In the end, a notification will appear to let the user know if the generation is successful.
     * @returns {Promise<void>}
     */
    const handleUrlSubmit = async () => {
        if(urlRef.current.value !== "" && urlRef.current.value !== undefined) {
            let referenceNum = await register_instance.post("", {
                "url": urlRef.current.value
            }).catch((err) => {
                setHasError(true)
                setHelperText("Failed to register this URL to our database. Please Try again.")
                console.log("register failed")
                console.log(err.message)
            })  // use .data to fetch information in the axios promise
            if (referenceNum) {
                handleClickOpenSubmitNotif(referenceNum)
                console.log(referenceNum)
                setIsLoading(true)
                generate_instance.post("", {
                    "url": urlRef.current.value,
                    "ref": referenceNum.data
                }).then(res => {
                    console.log("json generated")
                    console.log(res.data)
                    setIsSucc(true)
                    handleSuccOpen()
                    setIsLoading(false)
                }).catch((err) => {
                    console.log("generation takes too long")
                    console.log(err.message)
                    console.log(err.response)
                    setIsSucc(false)
                    handleSuccOpen()
                    setIsLoading(false)
                    setHasError(true)
                    setHelperText(
                        err.response !== undefined ?
                        `An error occurred. (Code: ${err.response.status})` :
                        "Please try to refresh the page and see if the JSON is already generated."
                    )
                })
                console.log("waiting dialog json to be generated: " + referenceNum.data)
            } else {
                setIsSucc(false)
                handleSuccOpen()
                console.log("submit failed")
            }
            setHasError(false)
            setHelperText("")
        } else {
            setHasError(true)
            setHelperText("Invalid URL")
        }
    }

    return (
        <div>
            <Box sx={{ display: isLoading ? 'relative' : 'none' }} >
                <p>Generating... (Please do not refresh the page!)</p>
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
                    label="URL to your website homepage"
                    variant="outlined"
                    inputRef={ urlRef }
                    InputProps={{
                        startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                    }}
                    error={ hasError }
                    helperText={ helperText }
                />
                <Button variant="contained" onClick={ handleUrlSubmit }>Generate my Chatbot</Button>
            </Box>
            <Dialog
                open={openSubmitNotif}
                onClose={handleCloseSubmitNotif}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Your chatbot will be ready in 20 minutes"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"Your URL: " + urlRef.current.value + "\n"}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        {"Reference Code: " + refNum.data + "\n"}
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
                    {isSucc ? "JSON successfully generated" : "JSON failed to generate"}
                </Alert>
            </Snackbar>
        </div>
    );
}