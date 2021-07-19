"use strict";
// ==UserScript==
// @name         LoliHub - Vertix.io Mod Menu
// @description  ModMenu with many features (Aimbot, Zoom, ...) Keybinds can you see in game
// @match        http://vertix.io
// @match        http://www.vertix.io
// @version      1.1
// @namespace https://greasyfork.org/users/119655
// ==/UserScript==

var active = false;
var interval = void 0;

var elem = document.createElement("p");
var element = document.getElementById("mainTitleText");
element.style.color = "aliceblue";
var node = document.createTextNode("LoliHub Mod Menu");
elem.appendChild(node);
element.appendChild(elem);

elem.appendChild(node);
element.appendChild(elem);

console.log(player.dead)

function Log() {
        this.info = (str, args = []) => this.log('lolihub info', str, args);
        this.log = (level, str, args) => {
            let colour = [];
            switch(level) {
                case 'info':colour=["#07a1d5", "#6e07d5"];break;
                case 'error':colour=["#d50707", "#d53a07"];break;
                case 'warn':colour=["#d56e07", "#d5d507"];break;
            }
            console.log('%c '.concat('[ ', level.toUpperCase(), ' ] '), [
                `background: linear-gradient(${colour[0]}, ${colour[1]})`
                , 'border: 3px solid blue'
                , 'border-radius: 5px'
                , 'padding : 10px 100px'
                , 'color: white'
                , 'display: block'
                , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
                , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
                , 'line-height: 12px'
                , 'text-align: center'
                , 'font-weight: bold'
                , 'font-size: 15px'
            ].join(';'))
            if (args.length) console.log(str, args);
            else console.log(str);
        }
    } var log = new Log();

var menu = document.createElement('div');
menu.setAttribute('style', 'cursor: grab;background: rgba(0, 0, 0, 0.5); top: 360px; left: 7px; color: white; width: 300px; height: 430px; border-radius: 6px; position: absolute; overflow: hidden; display: inline-block; z-index: 10000000; text-align: left; box-sizing: border-box; padding-top: 10px; line-height: 0.8;');
menu.setAttribute("id", "lh");
menu.innerHTML = (
    ' Loli Hub - By ShyShai#7788 ' +
    '<br><br><br> ' +
    '<fieldset id="ab"><legend>Aimbot</legend><br><br>Activate: F<br><br><br>Deactivate: G<br><br></fieldset> ' + //Aimbot
    '<br><br><hr><br> ' +
    '<fieldset id="ab"><legend>Fat Avatar</legend><br><br>Activate: <input type="checkbox" id="fa" onclick="e()"><br><br><br>Deactivate: B<br><br></fieldset>' + //Fat Avatar
    ''
);
document.documentElement.appendChild(menu);

var overall = document.querySelector('input[id="fa"]');

function activate(event) {
  event.preventDefault();
  if (event.keyCode === 70 && !active) {
    c.removeEventListener("mousemove", gameInput, false);
    active = true;
    interval = setInterval(aimClosestPlayer, 10);
      showNotification('LoliHub - Aimbot activated')
      player.name = localStorage.userName + " [LoliHub]";
  }
  if(document.getElementById('fa').checked) {
  showNotification('LoliHub - Speed hack activated')
  player.health = 20000000000000;
  }
}

function deactivate(event) {
  event.preventDefault();
  if (event.keyCode === 71) {
    active = false;
    clearInterval(interval);
    c.addEventListener("mousemove", gameInput, false);
      showNotification('LoliHub - Aimbot deactivated')
  }
  if(event.keyCode === 66) {
  showNotification('LoliHub - Speed hack deactivated')
  player.speed = 0.57;
  }
}



c.addEventListener("keydown", activate, false);
c.addEventListener("keyup", deactivate, false);

function getOtherPlayers(gameObjects, myTeam) {
  return gameObjects.filter(function (o) {
    return o.type === 'player' && o.dead === false && o.name !== player.name && o.team !== myTeam;
  });
}

function getMyPlayer(gameObjects) {
  return gameObjects.filter(function (o) {
    return o.name === player.name;
  })[0];
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getClosestPlayer(gameObjects) {
  var myTeam = getMyPlayer(gameObjects).team;
  var otherPlayers = getOtherPlayers(gameObjects, myTeam);
  var closestDistance = Infinity;
  var closestPlayer = void 0;
  otherPlayers.forEach(function (p) {
    var d = distance(player.x, player.y, p.x, p.y);
    if (d < closestDistance) {
      closestPlayer = p;
      closestDistance = d;
    }
  });
  return closestPlayer;
}

function getAngle(x1, y1, x2, y2) {
  return Math.atan2(y1 - y2, x1 - x2);
}

function setTarget(angle, distance) {
  target.f = angle;
  target.d = distance;
}

function aimClosestPlayer() {
  var closestPlayer = getClosestPlayer(gameObjects);
  if (!closestPlayer) {
    return;
  }
  var angle = getAngle(player.x, player.y, closestPlayer.x, closestPlayer.y);
  var distance = 100;
  setTarget(angle, distance);
  targetChanged = true;
}



//Drag mod menu

dragElement(document.getElementById("lh"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
