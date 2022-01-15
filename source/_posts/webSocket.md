---
title: webSocket
date: 2021-10-04 15:37:44
tags: webSocket
categories: javaScript
---

##### websocket是什么

&emsp;&emsp;服务器给客户端发送一个主动的消息技术。比如登录一个网页，在我们打开一个浏览器，在浏览器去请求一个网页的时候，会请求一个二维码，放到浏览器端，用手机微信去扫描的时候，微信手机端会把扫描的结果推送到微信的服务器，微信的服务器会将消息推送到第三方的另一个服务器，地三方服务器会主动推送一条消息到浏览器前端，第三方服务器主动推送消息的地方用到的技术就是websocket，也就是由服务器主动推送消息到浏览器，这就是websocket。

&emsp;&emsp;这个时候有一个疑惑，为什么不使用http呢？http首先带有协议头和协议body，协议头比较大，如果只推送几个字节或十几个字节的情况下，会产生大量的response，大部分都是无用的消息，利用率不高。又为什么不用裸TCP呢？TCP是一个传输层的协议，对于使用浏览器的版本和其他的版本，并没有做到协议上的鉴定，不能跟http一起。

##### 工作方式

&emsp;&emsp;广播和收听

<img src="https://i.bmp.ovh/imgs/2021/10/45f75f823c203613.png" style="zoom: 67%;" />

##### 为什么需要websocket协议

　　因为 HTTP 协议有一个缺陷：通信只能先由客户端发起，然后服务器再作出响应，并不能由服务器主动向客户端推送消息。
　　WebSocket 协议最大的特点是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息。

##### 什么场景下用websocket

1. websocket社交订阅
2. websocket多玩家游戏
3. websocket协同编辑/编程
4. websocket收集点击流数据
5. 股票基金报价
6. 体育实况更新
7. 多媒体聊天
8. 基于位置的应用
9. 在线教育
10. 论坛的消息广播
11. 弹幕、客服等等

##### 怎么使用websocket

服务器端：略

客户端：浏览器原生对象websocket（功能较少）、第三方 socket.io

1. 启动服务器
2. 启动客户端程序连接服务器（**永久**连接）
3. 服务器为每个客户创建专用对象（负责当前客户消息的收发）
4. 客户端可以向服务器发消息、服务器向所有客户发送广播消息（每个客户接收消息）

**客户端**

```js
<div class="btn">
    <input type="button" value="清空" onclick="reset()"/>
    <input type="button" value="发送" onclick="send()">
</div>

var socket = new WebSocket('ws://127.0.0.1:80/websocket/ws'); 

//创建Socket 
socket.onopen = function(event) { 

    //向服务器发送数据
    //socket.send('哈哈哈哈'); 

    //接收数据事件
    socket.onmessage = function(event) {
    body.innerHTML+="<br/>对方："+event.data;
    }; 

    // socket关闭事件
    socket.onclose = function(event) {
    body.innerHTML+="<br/>系统：已和服务器断开连接！！！";
    }; 

    //关闭socket
    //socket.close()
};

//-----------
var body=document.getElementById("body");
function send(){
    var msg=document.getElementById("content").value;//获取输入框内容
    socket.send(msg);//发送消息
    reset();//清空输入框
    body.innerHTML+="<br/>我："+msg;
}

function reset(){
    document.getElementById("content").value="";
}
```

**服务器端**

```java
package action;

import java.io.IOException;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

//@ServerEndpoint注解中的内容是用户客户端websocket的连接url,例如ws://127.0.0.1:80/websocket/ws,
//结构形式为“ws：//ip:端口/项目名/指定的url”
@ServerEndpoint("/ws")
public class WSServer {
    private Session session;
    //连接打开时执行
    @OnOpen
    public void onOpen(Session session) {
    	this.session=session;
        System.out.println("一个客户端连接进来了 ... 它的sessionid是：" + session.getId());
    }

    //收到消息时执行
    @OnMessage
    public void onMessage(String message, Session session) {
    	System.out.println(session.getId()+"客户端发送的消息是："+message);
        try{
        	this.sendMessage(message);//消息发回给客户端
        }catch(Exception e){
        	e.printStackTrace();
        }
        //return currentUser + "：" + message;如果有返回值，则客户端发送消息后会收到这个返回值
    }

    //连接关闭时执行
    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        System.out.println("一个客户端关闭了，它的sessionid是：" + session.getId());
    }

    //连接错误时执行
    @OnError
    public void onError(Throwable t) {
        t.printStackTrace();
    }
    //自定义的方法，用于发送消息
    public void sendMessage(String message) throws IOException{
    	this.session.getBasicRemote().sendText(message);
        //this.session.getAsyncRemote().sendText(message);
    }
}
```

