/*******************************
 * intelligent assistant robot
 * 智能机器人助手
 * @author TimRChen
 * update: 2018/04/03
 *******************************/

import './handle/draw'; // 引入机器人UI
import Conversation from './handle/conversation'; // 引入引导对话

// 初始化对话机器及问候语
var conversation = new Conversation();
conversation.initialWelcome();

// 初始化输入框及确认按钮
(function (initialInputBox) {
    initialInputBox();
} (function () {
    var container = document.createElement('div');
    var input = document.createElement('input');
    var confirmBtn = document.createElement('button');
    var body = document.getElementsByTagName('body')[0];
    container.setAttribute('class', 'fn-box');
    input.setAttribute('id', 'input-box');
    input.setAttribute('placeholder', 'Please input in here.');
    confirmBtn.setAttribute('class', 'fn-btn');
    confirmBtn.innerText = '确认';
    input.style.border = 'none';
    input.style.outline = 'none';
    input.style.backgroundColor = '#000';
    input.style.color = '#fff';
    confirmBtn.style.fontSize = '24px';
    confirmBtn.style.outline = 'none';
    confirmBtn.style.borderRadius = '14px';
    body.appendChild(container);
    container.appendChild(input);
    container.appendChild(confirmBtn);
}));

var input = document.getElementById('input-box');
var confirmBtn = document.getElementsByClassName('fn-btn')[0];
var inputString = '';

/**
 * 监听输入函数
 */
var listenInput = function () {
    inputString = input.value;
    // console.log(inputString);
    conversation.chatWithRobot(inputString);
};

confirmBtn.addEventListener('click', listenInput, false);
