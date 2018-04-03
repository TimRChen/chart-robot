/*******************************
 * intelligent assistant robot
 * 智能机器人助手
 * @author TimRChen
 * update: 2018/04/03
 *******************************/

import './draw'; // 引入机器人UI
import Conversation from './conversation'; // 引入引导对话

// 初始化对话机器及问候语
var conversation = new Conversation();
conversation.initialWelcome();

// 初始化输入框
(function () {
    var container = document.createElement('div');
    var input = document.createElement('input');
    var body = document.getElementsByTagName('body')[0];
    container.setAttribute('class', 'fn-box');
    input.setAttribute('id', 'input-box');
    input.style.border = 'none';
    input.style.outline = 'none';
    input.style.backgroundColor = '#000';
    input.style.color = '#fff';
    input.setAttribute('placeholder', 'Please input in here.');
    body.appendChild(container);
    container.appendChild(input);
} ());

var input = document.getElementById('input-box');
var inputString = '';

/**
 * 监听输入函数
 */
var listenInput = function () {
    inputString = input.value;
    // console.log(inputString);
    conversation.chatWithRobot(inputString);
};

input.addEventListener('input', listenInput, false);
