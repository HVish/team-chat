class ChatBox {
    constructor(obj) {
        this.title = obj.title || "Title";
        this.close = (typeof obj.close != "undefined") ? obj.close : true;
        this.input = (typeof obj.input != "undefined") ? obj.input : true;

        this.container = document.querySelector(".pop-out-container");
        if (!this.container) {
            this.container = document.createElement("div");
            this.container.className = 'pop-out-container';
            document.querySelector('body').appendChild(this.container);
        }

        this.chatBox = document.createElement("div");
        this.chatBox.className = 'pop-out';

        let header = '<div class="pop-out--header">' +
            '<span class="title">' + this.title + '</span>' +
            (this.close ? '<span class="action"><i class="material-icons">highlight_off</i></span>' : '') +
            '</div>',
            body = '<div class="pop-out--body"></div>',
            inputField = (this.input ? '<div class="pop-out--input" contentEditable="true"></div>' : '');

        this.chatBox.innerHTML = header + body + inputField;
        this.container.appendChild(this.chatBox);

        // close button
        let chatBox = this.chatBox;
        if (this.close) {
            let button = chatBox.querySelector(".pop-out--header>span.action");
            button.addEventListener("click", function(e) {
                e.stopPropagation();
                chatBox.parentNode.removeChild(chatBox);
            });
        }

        // minimise chat box
        chatBox.querySelector(".pop-out--header").addEventListener("click", function() {
            if (chatBox.classList.contains('minimise')) {
                chatBox.className = chatBox.className.replace("minimise", "");
            } else {
                chatBox.className += " minimise";
            }
        });
    }

    /**
     * [addMsg description]
     * @param {string}  msg         text message
     * @param {string}  sender      message sender name
     * @param {string}  time        message sending time
     * @param {enum}    position    {"left", "right"}
     * @param {enum}    forceNew    {true, false}
     */
    addMsg(msg, sender, time, position, forceNew) {
        let body = this.chatBox.querySelector(".pop-out--body"),
            ul = body.lastElementChild;

        position = (position != "left") ? "right" : position;
        forceNew = (forceNew != true) ? false : forceNew;

        if (!forceNew && ul && ul.classList.contains(position)) {
            let li = document.createElement('li'),
                timeSpan = ul.querySelector('span.msg-time');
            if (timeSpan) {
                timeSpan.parentNode.removeChild(timeSpan);
            }
            li.innerHTML = msg + '<span class="msg-time">' + time + '</span>';
            ul.appendChild(li);
        } else {
            let newUL = document.createElement('ul');
            newUL.className = position;
            newUL.innerHTML = '<li><span class="msg-sender">' + sender + '</span>' +
                msg + '<span class="msg-time">' + time + '</span>' + '</li>';
            body.appendChild(newUL);
        }
        body.scrollTop = body.scrollHeight;
    }
}
