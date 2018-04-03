/*******************************
 * 对话组件
 * @author TimRChen
 * update: 2018/04/03
 *******************************/

import Typed from 'typed.js';

const id = 'typed'; // 容器id名

// 默认欢迎问候语
const welcomeList = [
    '<i>Welcome</i> master...',
    'I will be <i>full of service</i> to you...',
    'So, what can I do for you...',
];

// 匹配回答库
const conversationList = {
    'isWho': [
        'yep, i\'m robot',
        'i\'m timrchen\'s intelligent assistant',
        'fine, that\'s reapeat'
    ],
    'isWhat': [
        'I, Robot',
        '比如卖萌之类的~',
        'So what? That\'s no meaning'
    ],
    'isDefault': [
        'Hi, i\'m still in here.',
        'What can I do for you...',
        'Haha, you must be kinding me :)'
    ],
    'isJoke': [
        '✧(≖ ◡ ≖✿)嘿嘿，接受我的魔法~',
        '这种=￣ω￣=够吗？',
        '卖萌什么的最拿手了~'
    ]
};

// 匹配问题库
const matchInputList = {
    'isWho': ['who', '你是谁', '你是'],
    'isWhat': ['what', '你能做些什么', '你有哪些功能'],
    'isJoke': ['卖个萌', '萌', 'mai\'meng']
};

/**
 * 文本容器创建函数
 * @argument id 容器id
 */
var createTextContainer = function (id) {
    var textContainer = document.createElement('span');
    var body = document.getElementsByTagName('body')[0];
    textContainer.setAttribute('id', id);
    body.appendChild(textContainer);
};

// typed.js 配置参数
var options = {
    'strings': welcomeList,
    // 'typeSpeed': 40,
    'cursorChar': '_',
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
        inputString = inputString.split(' ').join('');
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
        var randomNum = Math.round(Math.random()*2); // 目前随机在3以内
        options.strings = [conversationList[matchType][randomNum]];
        new Typed('#' + id, options);
    }
};
