import React from 'react'
import {Button, Drawer, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from 'axios'
import {backendBaseUrl} from "../env";

export default function Settings({settingOpen, setSettingOpen, wtsnAssistant, setWtsnAssistant}){

    const [iamKey, setIamKey] = React.useState(wtsnAssistant.iamKey)
    const [instanceId, setInstanceId] = React.useState(wtsnAssistant.instanceId)

    const handleResetDB = () => {
        let options = {method: 'DELETE', url: backendBaseUrl + 'del_json/'};

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    };
    const handleIamKeyChange = (event) => {
        setIamKey(event.target.value)
    };

    const handleInstanceIdChange = (event) => {
        setInstanceId(event.target.value)
    };

    return (
        <div>
            <Drawer
                anchor='left'
                open={settingOpen}
                onClose={() => {
                    setSettingOpen(false)
                    setWtsnAssistant({
                        iamKey: iamKey,
                        instanceId: instanceId,
                        workspaceId: wtsnAssistant.workspaceId,
                        token: wtsnAssistant.token
                    })
                    console.log(wtsnAssistant)
                }}
            >
                <Box sx={{
                    minWidth: '500px',
                    marginTop: '100px',
                    padding: '10px'
                }}>
                    <Stack spacing={2}>
                        <TextField
                            id="filled-basic"
                            label="IAM API Key"
                            variant="outlined"
                            defaultValue={iamKey}
                            onChange={handleIamKeyChange}
                        />
                        <TextField
                            id="filled-basic"
                            label="Watson Assistant Instance ID"
                            variant="outlined"
                            value={instanceId}
                            onChange={handleInstanceIdChange}
                        />
                        <Button onClick={handleResetDB} variant="contained" color="error">Clean generation history</Button>
                    </Stack>
                </Box>

            </Drawer>
        </div>
    )
}