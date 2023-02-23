export const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
};

export const loadMessages = () => {
    return JSON.parse(localStorage.getItem('chat_messages'));
};

export const validateInput = (input) => {
    return input !== ""
}
