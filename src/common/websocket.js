class Websocket {
    constructor(sid) {
        this.instance = null;
        this.sid = sid;
        this.messageFun = [];
        this.init();
    }

    init() {
        this.ws = new WebSocket(`ws://localhost:8899/websocket/${this.sid}`);
        this.ws.onopen = () => {
            this.status = 'open';
            this.heartCheck();
        };

        this.ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (!data) return;
            if (data.messageType === 2) {
                this.pingPong = 'pong';
            }
            //   执行注册的回调方法

            this.messageFun.forEach((item) => {
                item(data);
            });
        };
    }

    heartCheck() {
        this.pingPong = 'ping';
        this.pingInterval = setInterval(() => {
            if (this.ws.readyState === 1) {
                // 检查ws为连接状态才可以发送
                this.ws.send('ping');
            }
        }, 5000);
        this.pongInterval = setInterval(() => {
            if (this.pingPong === 'ping') {
                this.closeHandle('心跳停止');
            }
            this.pingPong = 'ping';
            this.status = 'close';
        }, 10000);
    }

    closeHandle(msg) {
        console.log(msg);
        if (this.status !== 'close') {
            if (this.pingInterval !== undefined && this.pongInterval !== undefined) {
                clearInterval(this.pingInterval);
                clearInterval(this.pongInterval);
            }
            this.ws.close();
            console.info('连接关闭,正在重连...');
            this.connect();
        } else {
            this.ws.close();
            console.log('连接已关闭');
        }
    }

    getMessage(callback) {
        this.messageFun.push(callback);
    }
}

export default Websocket;
