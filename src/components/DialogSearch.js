import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Alert, Button, ButtonGroup} from "@mui/material";
import Box from "@mui/material/Box";
import {
    newWorkspace,
    delWorkspaceById,
    getWorkspaceList,
    getBearerToken
} from "./CustomizedChatbot/watsonAssistantConnection";

import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import LinearProgress from "@mui/material/LinearProgress";
import * as assert from "assert";
import {backendBaseUrl} from "../env";

const instance = axios.create({
    baseURL: backendBaseUrl,
    timeout: 1000
})

export default function DialogSearch({wtsnAssistant, setWtsnAssistant}) {
    const dialogRef = React.useRef('')
    const [loadingPreview, setLoadingPreview] = React.useState(false)
    const [allowPreview, setAllowPreview] = React.useState(false)
    const [allowDownloadAndCopy, setAllowDownloadAndCopy] = React.useState(false)
    const [dialogJson, setDialogJson] = React.useState("")
    const [isSucc, setIsSucc] = React.useState(false);
    const [isOpenSuccNotif, setIsOpenSuccNotif] = React.useState(false);
    const [hasError, setHasError] = React.useState(false)
    const [helperText, setHelperText] = React.useState("")

    const handleSuccOpen = () => {
        setIsOpenSuccNotif(true);
    };

    const handleSuccClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpenSuccNotif(false);
    };

    const handleRefCodeSubmit = async () => {
        try {
            let answer = await instance.get("get_json/?id=" +　dialogRef.current.value)
            console.log(answer.data)
            let result = answer.data
            if(Object.keys(result).length === 0) {
                setHasError(true)
                setAllowDownloadAndCopy(false)
                setHelperText("The JSON is still generating or there are some errors")
            } else {
                setDialogJson(JSON.stringify(answer.data))
                setAllowPreview(true)
                setAllowDownloadAndCopy(true)
                setHasError(false)
                setHelperText("")
            }
        } catch (e) {
            setHasError(true)
            setAllowDownloadAndCopy(false)
            setHelperText("Not Found")
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

    const handlePreview = async () => {
        try {
            setLoadingPreview(true)
            setAllowPreview(false)
            let token = wtsnAssistant.token
            if(token === ""){
                token = (await getBearerToken(wtsnAssistant.iamKey))["access_token"]
                assert(token !== undefined, "failed to get token")
                setWtsnAssistant({
                    token: token,
                    iamKey: wtsnAssistant.iamKey,
                    instanceId: wtsnAssistant.instanceId,
                    workspaceId: wtsnAssistant.workspaceId
                })
            }
            const workspaces = await getWorkspaceList(token, wtsnAssistant.instanceId)
            const workspaceIds = workspaces["workspaces"].map(ws => ws["workspace_id"])
            console.log(workspaceIds)
            for(let i = 0; i < workspaceIds.length; i++){
                await delWorkspaceById(token, wtsnAssistant.instanceId, workspaceIds[i])
            }
            const newWS = await newWorkspace(token, wtsnAssistant.instanceId, dialogJson)

            const newWSID = newWS["workspace_id"]
            console.log(newWSID)
            setWtsnAssistant({
                iamKey: wtsnAssistant.iamKey,
                token: wtsnAssistant.token,
                instanceId: wtsnAssistant.instanceId,
                workspaceId: newWSID
            })

            setIsSucc(true)
            setLoadingPreview(false)
            handleSuccOpen()
            console.log("workspace set successful")
        } catch (e) {
            setAllowPreview(true)
            setAllowDownloadAndCopy(true)
            setIsSucc(false)
            setLoadingPreview(false)
            console.error(e)
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
                    error={hasError}
                    helperText={helperText}
                />
                <Button variant="contained" onClick={ handleRefCodeSubmit }>Submit</Button>
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
                <Button onClick={handleCopy} disabled={!allowDownloadAndCopy}>Copy to clipboard</Button>
                <Button onClick={handleDownload} disabled={!allowDownloadAndCopy}>Download</Button>
                <Button onClick={handlePreview} disabled={!allowPreview}>Preview</Button>
            </ButtonGroup>
            {
                loadingPreview && (
                    <Box sx={{
                        width: "60%",
                        marginTop: "5px",
                        margin: "auto"
                    }}>
                        <p>Loading preview</p>
                        <LinearProgress />
                    </Box>
                )
            }
            <Snackbar
                open={isOpenSuccNotif}
                autoHideDuration={18000}
                onClose={handleSuccClose}
            >
                <Alert onClose={handleSuccClose} severity={isSucc ? "success" : "error"} sx={{ width: '100%' }}>
                    {isSucc ? "Preview ready - try it with the chat button at right bottom corner" : "JSON fail to upload"}
                </Alert>
            </Snackbar>
        </div>


    );
}