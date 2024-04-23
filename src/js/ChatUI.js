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
                    <div class="chat_messages_space"></div>
                    <div class="chat_send_message">
                      <textarea class="input chat_input" rows="1" cols="33" wrap="hard" placeholder="Введите ваше сообщение"></textarea>
                      <button class="button chat_button">Отправить</button>
                    </div>
                  </div>
                </div>`
        }

        onlineUser(user, youClass) {
            return `<div class="online_user ${youClass}">${user}</div>`
        }

        message(youClass, user, date, text) {
            return `<div class="message ${youClass}">
                        <div class="message_title">
                            <span class="message_username">${user}</span>
                            <span class="message_date">${date}</span>
                        </div>
                        <p class="message_text"">${text}</p>
                    </div>`
        }
}