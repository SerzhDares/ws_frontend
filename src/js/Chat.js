import ChatAPI from "./ChatAPI";
import ChatUI from "./ChatUI";
import ChatWS from "./ChatWS";

export default class Chat {
  constructor() {
    this.api = new ChatAPI();
    this.ui = new ChatUI();
    this.ws = new ChatWS();
    this.container = document.querySelector('.container');
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

  openWS() {
    this.ws.createWS();
  }

  usersOnline(users) {
    const chatClients = document.querySelector('.clients_list');
    chatClients.innerHTML = '';
    users.forEach(user => {
      chatClients.insertAdjacentHTML('beforeend', this.ui.onlineUser(user.name));
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
            this.openWS();
          } else {
            nickField.classList.add('login_error');
            nickField.insertAdjacentHTML('afterend', this.ui.loginFormError());
          }
        })
      }
    })
  }

}
