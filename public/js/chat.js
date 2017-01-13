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
     * @param {string}  msg      text message
     * @param {enum}    position {"left", "right"}
     */
    addMsg(msg, position) {
        let body = this.chatBox.querySelector(".pop-out--body"),
            ul = body.lastElementChild;

        position = (position != "left") ? "right" : position;
        if (ul && ul.classList.contains(position)) {
            let li = document.createElement('li');
            li.innerHTML = msg;
            ul.appendChild(li);
        } else {
            let newUL = document.createElement('ul');
            newUL.className = position;
            newUL.innerHTML = "<li>" + msg + "</li>";
            body.appendChild(newUL);
        }
        body.scrollTop = body.scrollHeight;
    }
}
