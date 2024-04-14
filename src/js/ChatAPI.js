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
        console.log(result);
        if(!result.ok) {
            return false;
        } else {
            return true;
        }
    }

}
