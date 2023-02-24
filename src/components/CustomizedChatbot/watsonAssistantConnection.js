export const getBearerToken = async () => {
    const options = {method: 'GET'};

    return await fetch('https://bingaccessforwatson.azurewebsites.net/api/getIAMBearerToken?code=G5Im9OxAR8gYcw8MXCMslqQPQXrIfvQnrXWYR3H1l52TAzFuJ6xz9g%3D%3D', options)
        .then(response => response.json())
        .catch(err => console.error(err))
}

export const sendMsgToWatsonAssistant = async (instanceId, workspaceId, token, message) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: `{"token":"${token}","msg":"${message}","instanceId":"${instanceId}","workspaceId":"${workspaceId}"}`
    };

    return await fetch('https://bingaccessforwatson.azurewebsites.net/api/sendMsgToWtsnAssistant?code=bbQ1-v-eerh6tNjMAQ_uVzIYi6Kp4fst5pt-Z4SSv4BdAzFu5162rQ%3D%3D', options)
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

    return await fetch('https://bingaccessforwatson.azurewebsites.net/api/workspaceMgmt4WtsnAssistant?code=XEs8yTiSgUNtA3B0pmHSuEasXN9Gp7MXHSHP2s9wLo80AzFuWfIZpg%3D%3D', options)
        .then(response => response.json())
        .catch(err => console.error(err));
}

export const newWorkspace = async (token, instanceId, dialogJson) => {
    let url = 'https://bingaccessforwatson.azurewebsites.net/api/newWorksapce4WA?code=64JQYzH544yWpZis1C7oA-vWBJydk43qJCq4DnUEzOiJAzFukK8QFw%3D%3D';

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
    let url = 'https://bingaccessforwatson.azurewebsites.net/api/delWorkspace4WAbyID?code=EWv9dpPsZAMxh0ATFHdjYBBCHeS7mSL73fq81x0sRlalAzFutnXGxw%3D%3D';

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