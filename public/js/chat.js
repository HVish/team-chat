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
     * @param   {obj}       msgData             Object containing message data
     * @key     {string}    msgData::msg        message
     * @key     {string}    msgData::sender     message sender name
     * @key     {string}    msgData::time       message sending time or any meta data.
     * @key     {enum}      msgData::position   {"left", "right"}
     * @key     {enum}      msgData::forceNew   {true, false}
     */
    addMsg(msgData) {
        let body = this.chatBox.querySelector(".pop-out--body"),
            ul = body.lastElementChild;

        msgData.position = (msgData.position != "left") ? "right" : msgData.position;
        msgData.forceNew = (msgData.forceNew != true) ? false : msgData.forceNew;

        if (!msgData.forceNew && ul &&
            ul.classList.contains(msgData.position)) {
            let li = document.createElement('li'),
                timeSpan = ul.querySelector('span.msg-time');
            if (timeSpan) {
                timeSpan.parentNode.removeChild(timeSpan);
            }
            li.innerHTML = msgData.msg + '<span class="msg-time">' + msgData.time + '</span>';
            ul.appendChild(li);
        } else {
            let newUL = document.createElement('ul');
            newUL.className = msgData.position;
            newUL.innerHTML = '<li><span class="msg-sender">' + msgData.sender + '</span>' +
                msgData.msg + '<span class="msg-time">' + msgData.time + '</span>' + '</li>';
            body.appendChild(newUL);
        }
        body.scrollTop = body.scrollHeight;
    }
}
