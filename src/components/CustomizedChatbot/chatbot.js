/**
 * Other configuration functions that will not need to use states from the
 * CustomizedBotPreview component are stored in this file
 */

export const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
};

export const loadMessages = () => {
    return JSON.parse(localStorage.getItem('chat_messages'));
};

export const validateInput = (input) => {
    return input !== ""
}
