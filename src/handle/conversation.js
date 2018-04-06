/*******************************
 * 对话组件
 * @author TimRChen
 * update: 2018/04/03
 *******************************/

import Typed from 'typed.js';

const id = 'typed'; // 容器id名

// 默认欢迎问候语
const welcomeList = [
    '欢迎光临!',
    '我能为你做点什么?',
];

// 匹配回答库
const conversationList = {
    'isWho': [
        '是的，我是个机器人',
        '我是黄睿晨的智能小机器人略略略',
        '不好意思，你说的话它重复了😑'
    ],
    'isWhat': [
        '我是你爸爸',
        '我会卖个萌，不信你让我卖个萌',
        '说这些有啥意义啊?',
        '咋的，不服气啊?',
        '行了，看在我是个机器人的份上，你就别难为我了',
        '你快点爆了，你tm慢点点!'
    ],
    'isDefault': [
        '我还在.',
        '我能为你做点啥?',
        '你在逗我？这你都不会谷歌一下？',
        '听不懂你说啥..',
        '你再试试别的，试试问我能做些什么'
    ],
    'isJoke': [
        '✧(≖ ◡ ≖✿)嘿嘿，接受我的魔法~',
        '这种=￣ω￣=够吗？',
        '卖萌什么的最拿手了~嘤嘤嘤~'
    ]
};

// 匹配问题库
const matchInputList = {
    'isWho': ['who', '你是谁', '你是'],
    'isWhat': ['what', '你能做些什么', '你有哪些功能', '傻', '智障'],
    'isJoke': ['卖个萌', '萌', 'mai\'meng',]
};

/**
 * 文本容器创建函数
 * @argument id 容器id
 */
var createTextContainer = function (id) {
    var textContainer = document.createElement('div');
    var body = document.getElementsByTagName('body')[0];
    textContainer.style.fontSize = '24px';
    textContainer.style.height = '80px';
    textContainer.setAttribute('id', id);
    body.appendChild(textContainer);
};

// typed.js 配置参数
var options = {
    'strings': welcomeList,
    // 'typeSpeed': 40,
    // 'cursorChar': '_',
    'showCursor': false,
    'fadeOut': true,
    'smartBackspace': true // Default value
};


export default class Conversation {
    /**
     * 初始化问候语句
     */
    initialWelcome() {
        // 创建文本容器
        createTextContainer(id);
        new Typed('#' + id, options);
    }
    /**
     * 匹配输入文本类型
     * @argument inputString 输入文本
     */
    matchInput(inputString) {
        let result = 'isDefault';
        for (let matchInput in matchInputList) {
            matchInputList[matchInput].map(item => {
                if (inputString.indexOf(item) !== -1) {
                    result = matchInput;
                    return;
                }
            })
        }
        return result;
    }
    /**
     * 与机器人进行交谈
     * @argument inputString 输入文本
     */
    chatWithRobot(inputString) {
        var matchType = this.matchInput(inputString);
        var randomLen = conversationList[matchType].length - 1; // 随机范围数字
        var randomNum = Math.round(Math.random()*randomLen); // 目前随机在3以内
        options.strings = [conversationList[matchType][randomNum]];
        new Typed('#' + id, options);
    }
};
