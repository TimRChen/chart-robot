// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({2:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*******************************
 * 机器人绘制工具
 * @author TimRChen
 * update: 2018/04/03
 *******************************/

var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    vpx = canvas.width / 2,
    vpy = canvas.height,
    Radius = 150,
    // 机器人半径
LayerBallNum = 360 / 15,
    LayerIntervalUp = 360 / 15,
    balls = [],
    angleX = Math.PI / 100,
    angleY = Math.PI / 100;

window.addEventListener("mousemove", function (event) {
    var x = event.clientX - canvas.offsetLeft - vpx;
    var y = event.clientY - canvas.offsetTop - vpy;

    angleY = -x * 0.0001;
    angleX = -y * 0.0001;
});

var Animation = function Animation() {
    this.init();
};

Animation.prototype = {
    isrunning: false,
    init: function init() {
        var num = LayerIntervalUp / 2; //layer 的数目 假定每一层 间隔30  画上半球
        for (var i = 0; i <= num; i++) {
            var l = new layer(i, 1);
            l.draw();
            var l = new layer(i, -1);
            l.draw();
        }
    },
    start: function start() {
        this.isrunning = true;
        animate();
    },
    stop: function stop() {
        this.isrunning = false;
    }
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rotateHandler.rotateX();
    rotateHandler.rotateY();
    rotateHandler.rotateZ();

    for (var i = 0; i < balls.length; i++) {
        balls[i].paint();
    }
    if (animation.isrunning) {
        if ("requestAnimationFrame" in window) {
            requestAnimationFrame(animate);
        } else if ("webkitRequestAnimationFrame" in window) {
            webkitRequestAnimationFrame(animate);
        } else if ("msRequestAnimationFrame" in window) {
            msRequestAnimationFrame(animate);
        } else if ("mozRequestAnimationFrame" in window) {
            mozRequestAnimationFrame(animate);
        }
    }
}

var layer = function layer(num, up) {
    this.radius = Math.sqrt(Math.pow(Radius, 2) - Math.pow(Radius * Math.cos(num * Math.PI * 2 / LayerBallNum), 2));
    this.x = 0;
    this.y = 0;
    this.up = up;
};

layer.prototype = {
    setBalls: function setBalls(radius) {
        for (var i = 0; i < LayerBallNum; i++) {
            var angle = 2 * Math.PI / LayerBallNum * i;
            var b = new ball(radius * Math.cos(angle), radius * Math.sin(angle), this.up * Math.sqrt(Math.pow(Radius, 2) - Math.pow(radius, 2)), 1.5);
            b.paint();
            balls.push(b);
        }
    },
    draw: function draw() {
        ctx.beginPath();
        ctx.arc(vpx, vpy, this.radius, 0, 2 * Math.PI, true);
        ctx.strokeStyle = "#FFF";
        ctx.stroke();
        this.setBalls(this.radius);
    }
};

var ball = function ball(x, y, z, r) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
    this.width = 2 * r;
};

ball.prototype = {
    paint: function paint() {
        var fl = 450; //焦距
        ctx.save();
        ctx.beginPath();
        var scale = fl / (fl - this.z);
        var alpha = (this.z + Radius) / (2 * Radius);
        ctx.arc(vpx + this.x, vpy + this.y, this.r * scale, 0, 2 * Math.PI, true);
        ctx.fillStyle = "rgba(255, 255, 255," + (alpha + 0.5) + ")"; // 填充颜色
        ctx.fill();
        ctx.restore();
    }
};

var rotateHandler = {
    rotateX: function rotateX() {
        var cos = Math.cos(angleX);
        var sin = Math.sin(angleX);
        for (var i = 0; i < balls.length; i++) {
            var y1 = balls[i].y * cos - balls[i].z * sin;
            var z1 = balls[i].z * cos + balls[i].y * sin;
            balls[i].y = y1;
            balls[i].z = z1;
        }
    },
    rotateY: function rotateY() {
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);
        for (var i = 0; i < balls.length; i++) {
            var x1 = balls[i].x * cos - balls[i].z * sin;
            var z1 = balls[i].z * cos + balls[i].x * sin;
            balls[i].x = x1;
            balls[i].z = z1;
        }
    },
    rotateZ: function rotateZ() {
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);
        for (var i = 0; i < balls.length; i++) {
            var x1 = balls[i].x * cos - balls[i].y * sin;
            var y1 = balls[i].y * cos + balls[i].x * sin;
            balls[i].x = x1;
            balls[i].y = y1;
        }
    }
};

/**
 * 机器人UI大小
 */
canvas.setAttribute('width', '300');
canvas.setAttribute('height', '300');
canvas.style.position = 'fixed';
canvas.style.bottom = '0';
canvas.style.right = '0';
canvas.style.transform = 'scale(0.5)';

var body = document.getElementsByTagName('body')[0];
body.appendChild(canvas);

exports.default = Animation;
},{}],4:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '53118' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[4,2])
//# sourceMappingURL=/draw.2984e400.map