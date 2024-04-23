import Chat from "./Chat";
import ChatUI from "./ChatUI";

export default class ChatWS{
    constructor() {
        this.ws = '';
        this.url = 'ws://localhost:3000';
        this.chat = new Chat();
        this.ui = new ChatUI();
    }

    createWS(name) {
        this.ws = new WebSocket(this.url);
        this.ws.addEventListener('open', (e) => {
            console.log(e);
            console.log('ws open');
        })

        this.ws.addEventListener('close', (e) => {
            console.log(e);
            console.log('ws close');
        })

        this.ws.addEventListener('message', (e) => {
            const data = JSON.parse(e.data);
            console.log(data);
            if (data.type === 'send') {
                if (data.name === name) {
                    data.name = 'You';
                    document.querySelector('.chat_messages_space').insertAdjacentHTML('beforeend', this.ui.message('your_message', data.name, new Date().toLocaleString(), data.msg));
                } else {
                    document.querySelector('.chat_messages_space').insertAdjacentHTML('beforeend', this.ui.message('', data.name, new Date().toLocaleString(), data.msg));
                }
            } else {
                this.chat.usersOnline(data, name);
                console.log(e);
            }
            this.chat.userExit(this.ws, name);
            this.chat.sendMessage(this.ws, name);

            console.log('ws message');

        })

    }

}