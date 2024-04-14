export default class ChatUI {
    loginForm() {
        return `<div class="window nickname_window">
                    <span class="nickname_window_title">Введите никнейм</span>
                    <input type="text" class="input nickname_window_input">
                    <button class="button nickname_window_button">Подтвердить</button>
                </div>`
      }

      loginFormError() {
        return `<span class="login_error_text">Такой ник уже занят :(</span>`
      }

      loginFormEmpty() {
        return `<span class="login_empty_text">Без никнейма не обойтись!</span>`
      }
    
      chatWindow() {
        return `<div class="chat">
                  <div class="window chat_clients">
                    <span class="chat_clients_title">В сети:</span>
                    <div class="clients_list"></div>
                  </div>
                  <div class="window chat_messages">
                    <div class="chat_send_message">
                      <input type="text" class="input chat_input" placeholder="Введите ваше сообщение">
                      <button class="button chat_button">Отправить</button>
                    </div>
                  </div>
                </div>`
        }

        onlineUser(user) {
            return `<div class="online_user">${user}</div>`
        }
}