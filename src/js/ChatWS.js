import Chat from "./Chat";
import ChatUI from "./ChatUI";

export default class ChatWS{
    constructor() {
        this.ws = '';
        // this.url = 'ws://localhost:3000';
        this.url = 'wss://ws-backend-zr1t.onrender.com';
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
            if (data.type === 'send') {
                if (data.name === name) {
                    data.name = 'You';
                    this.chat.viewMessages('your_message', data.name, data.date, data.msg);
                } else {
                    this.chat.viewMessages('', data.name, data.date, data.msg);
                }
            } else if (data.type === 'chat') {
                document.querySelector('.chat_messages_space').innerHTML = '';
                if (data.chat != []) {
                    data.chat.forEach(message => {
                        if (message.name === name) {
                            message.name = 'You';
                            this.chat.viewMessages('your_message', message.name, message.date, message.msg);
                        } else {
                            this.chat.viewMessages('', message.name, message.date, message.msg);
                        }
                    })
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