import ChatAPI from "./ChatAPI";
import ChatUI from "./ChatUI";

export default class Chat {
  constructor() {
    this.api = new ChatAPI();
    this.ui = new ChatUI();
    this.container = document.querySelector('.container');
    this.messages = [];
  }

  init() {
    this.drawLoginForm();
    this.login();
  }

  drawLoginForm() {
    this.container.insertAdjacentHTML('afterbegin', this.ui.loginForm());
  }

  drawChat() {
    this.container.insertAdjacentHTML('afterbegin', this.ui.chatWindow());
  }

  usersOnline(users, userName) {
    const chatClients = document.querySelector('.clients_list');
    chatClients.innerHTML = '';
    users.forEach(user => {
      if (userName === user.name) {
        user.name = 'You';
        chatClients.insertAdjacentHTML('beforeend', this.ui.onlineUser(user.name, 'you'));
      } else {
        chatClients.insertAdjacentHTML('beforeend', this.ui.onlineUser(user.name));
      }
    })
  }

  userExit(ws, userName) {
    window.addEventListener('beforeunload', () => {
      ws.send(JSON.stringify({type: 'exit', user: {name: userName}}));
      ws.close();
    })
  }

  sendMessage(ws, userName) {
    document.querySelector('.chat_button').addEventListener('click', () => {
      const message = document.querySelector('.chat_input').value;
      if(!message) return;
      const newMessage = {type: 'send', name: userName, msg: message};
      this.messages.push(newMessage);
      ws.send(JSON.stringify(newMessage, {chat: this.messages}));
      document.querySelector('.chat_input').value = '';
    })
  }

  login() {
    const nickField = document.querySelector('.nickname_window_input');
    document.querySelector('.nickname_window_button').addEventListener('click', () => {
      if (document.querySelector('.login_empty_text')) {
        document.querySelector('.login_empty_text').remove();
      }
      if (document.querySelector('.login_error_text')) {
        document.querySelector('.login_error_text').remove();
      }
      if (nickField.value === '') {
        nickField.classList.add('login_error');
        nickField.insertAdjacentHTML('afterend', this.ui.loginFormEmpty());
      } else {
        const log = this.api.loginToChat({name: `${nickField.value}`});
        log.then(result => {
          console.log(result);
          if (result) {
            document.querySelector('.nickname_window').classList.add('hidden');
            this.drawChat();
          } else {
            nickField.classList.add('login_error');
            nickField.insertAdjacentHTML('afterend', this.ui.loginFormError());
          }
        })
      }
    })
  }

}
