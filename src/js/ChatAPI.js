import ChatWS from "./ChatWS";

export default class ChatAPI {
    constructor() {
        // this.url = 'http://localhost:3000/'
        this.url = 'https://ws-backend-zr1t.onrender.com/'
    }

    async loginToChat(user) {
        const request = fetch(this.url + 'new-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const result = await request;
        const json = await result.json();
        console.log(json);
        
        if(!result.ok) {
            return false;
        } else {
            new ChatWS().createWS(json.user.name);
            return json.user.name;
        }
    }
}
