import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Button, ButtonGroup} from "@mui/material";
import Box from "@mui/material/Box";
import AssistantV1 from 'ibm-watson/assistant/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

import axios from "axios";
const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    timeout: 1000
})

const assistant = new AssistantV1({
    version: '2021-06-14',
    authenticator: new IamAuthenticator({
        apikey: 'Ule1_N_4m7cNREs9LY9KBoipHhxQpMACQP8EIaRyfrEs',
    }),
    disableSslVerification: true,
    serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/d049a552-ee69-4a04-aa9b-1fa4e7994ece',
});

export default function DialogSearch() {
    const dialogRef = React.useRef('')
    const [dialogJson, setDialogJson] = React.useState("")
    const handleUrlSubmit = async () => {
        try {
            let answer = await instance.get("get_json/?id=" +　dialogRef.current.value)
            console.log(answer.data)
            let result = answer.data
            if(Object.keys(result).length === 0) setDialogJson("Generating...")
            else setDialogJson(JSON.stringify(answer.data))
        } catch (e) {
            setDialogJson("Not Found")
        }

    }
    const handleCopy = () => {
        navigator.clipboard.writeText(dialogJson).then(
            () => console.log('copied')
        )
    }
    const handleDownload = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            dialogJson
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "chatbot_dialog.json";

        link.click();
    }

    const handlePreview = () => {
        try {
            assistant.listWorkspaces()
                .then(res => {
                    console.log(JSON.stringify(res.result, null, 2));
                })
                .catch(err => {
                    console.log(err)
                });
        } catch (e){
            console.log(e)
        }
    }

    return (
        <div>
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
                    id="dialog-ref-input"
                    label="Dialog Reference Code"
                    variant="standard"
                    inputRef={ dialogRef }
                />
                <Button variant="contained" onClick={ handleUrlSubmit }>Submit</Button>
                <TextField
                    disabled
                    fullWidth
                    multiline
                    maxRows={4}
                    id="dialog-result"
                    label="Dialog JSON"
                    variant="outlined"
                    value={ dialogJson }
                />

            </Box>
            <ButtonGroup variant="contained" aria-label="text button group">
                <Button onClick={handleCopy} >Copy to clipboard</Button>
                <Button onClick={handleDownload}>Download</Button>
                <Button onClick={handlePreview} disabled>Preview</Button>
            </ButtonGroup>
        </div>


    );
}