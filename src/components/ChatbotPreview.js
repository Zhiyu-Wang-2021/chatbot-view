import * as React from 'react';
import axios from "axios";


const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/url_list/",
    timeout: 1000
})

export default function ChatbotPreview() {
    window.watsonAssistantChatOptions = {
        integrationID: "6884fc53-d8b5-487c-a2a4-53bf83a9e9d6", // The ID of this integration.
        region: "us-south", // The region your integration is hosted in.
        serviceInstanceID: "d049a552-ee69-4a04-aa9b-1fa4e7994ece", // The ID of your service instance.
        onLoad: function(instance) { instance.render(); }
    };
    setTimeout(function(){
        const t=document.createElement('script');
        t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
        document.head.appendChild(t);
    });

    return (
        <div></div>
    );
}
