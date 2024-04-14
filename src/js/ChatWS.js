import Chat from "./Chat";

export default class ChatWS{
    constructor() {
        this.url = 'ws://localhost:3000';
    }

    createWS() {
        const ws = new WebSocket(this.url);
        ws.addEventListener('open', (e) => {
            console.log(e);
            console.log('ws open');
        })

        ws.addEventListener('close', (e) => {
            console.log(e);
            console.log('ws close');
        })

        ws.addEventListener('message', (e) => {
            new Chat().usersOnline(JSON.parse(e.data));
            console.log(JSON.parse(e.data));
            console.log('ws message');
        })

    }

}