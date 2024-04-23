import ChatWS from "./ChatWS";

export default class ChatAPI {
    constructor() {
        this.url = 'http://localhost:3000/'
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
        new ChatWS().createWS(json.user.name);
        if(!result.ok) {
            return false;
        } else {
            return json.user.name;
        }
    }
}
