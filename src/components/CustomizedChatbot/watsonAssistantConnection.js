import {bingApiConnections} from '../../env'
export const getBearerToken = async (IAMKey) => {
    console.log(IAMKey)
    const options = {
        method: 'GET',
        headers: {
            'iamkey': IAMKey
        },
    };

    const res = await fetch(bingApiConnections.getBearerToken, options)
        .then(response => response.json())
        .catch(err => console.error(err))
    if(res["errorMessage"] !== undefined){
        console.error(res["errorMessage"])
    }
    return res
}

export const sendMsgToWatsonAssistant = async (instanceId, workspaceId, token, message) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: `{"token":"${token}","msg":"${message}","instanceId":"${instanceId}","workspaceId":"${workspaceId}"}`
    };

    return await fetch(bingApiConnections.sendMsgToWatsonAssistant, options)
        .then(response => response.json())
        .catch(err => console.error(err));
}

export const getWorkspaceList = async (token, instanceId) => {
    console.log("token:\n" + token)
    console.log("instanceId:\n" + instanceId)
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: `{"token":"${token}","instanceId":"${instanceId}"}`
    };

    return await fetch(bingApiConnections.getWorkspaceList, options)
        .then(response => response.json())
        .catch(err => console.error(err));
}

export const newWorkspace = async (token, instanceId, dialogJson) => {
    let url = bingApiConnections.newWorkspace

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: token,
            instanceid: instanceId
        },
        body: dialogJson
    };

    return await fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error('error:' + err));
}

export const delWorkspaceById = async (token, instanceId, workspaceId) => {
    let url = bingApiConnections.delWorkspaceById

    let options = {
        method: 'DELETE',
        headers: {
            token: token,
            'Content-Type': 'application/json',
            workspaceid: workspaceId,
            instanceid: instanceId
        },
        body: `{"workspaceId":"${workspaceId}"}`
    };

    fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error('error:' + err));
}