"use strict";
// ==UserScript==
// @name         LoliHub - Vertix.io Mod Menu
// @description  ModMenu with many features (Aimbot, Zoom, ...) Keybinds can you see in game
// @match        http://vertix.io
// @match        http://www.vertix.io
// @version      1.1
// @namespace    https://greasyfork.org/users/
// @icon         https://www.google.com/s2/favicons?domain=vertix.io
// ==/UserScript==


//Create Mod Menu
var elem = document.createElement("p");
var element = document.getElementById("mainTitleText");
element.style.color = "aliceblue";
var node = document.createTextNode("LoliHub Mod Menu");
elem.appendChild(node);
element.appendChild(elem);

elem.appendChild(node);
element.appendChild(elem);

//Log Function
function Log() {
    this.info = (str, args = []) => this.log('lolihub info', str, args);
    this.log = (level, str, args) => {
        let colour = [];
        switch (level) {
            case 'info':
                colour = ["#07a1d5", "#6e07d5"];
                break;
            case 'error':
                colour = ["#d50707", "#d53a07"];
                break;
            case 'warn':
                colour = ["#d56e07", "#d5d507"];
                break;
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
}
var log = new Log();

var menu = document.createElement('div');
menu.setAttribute('style', ' scroll-behavior: smooth;cursor: grab;background: rgb(0 0 0 / 41%);top: 318px;left: 14px;color: rgb(251 208 7);width: 300px;height: 430px;border-radius: 1px;position: absolute;overflow: hidden;display: inline-block;z-index: 10000000;text-align: left;padding-top: 10px;line-height: 0.8;box-shadow: #ffd100 0 0 14px 5px;box-sizing: border-box;border:solid 1px #ffd100'
                 );
menu.setAttribute("id", "lh");
menu.innerHTML = (
    ' Loli Hub - By ShyShai#7788 ' +
    '<br><br><br> ' +
    '<fieldset id="ab"><legend>Aimbot</legend><br><br><button id="GUHfdg4">Activate</button><br><br><br><button id="HOGRufs">Deactivate</button><br><br></fieldset> ' + //Aimbot
    '<br><br><hr><br> ' +
    '<fieldset id="ab"><legend>Fat Avatar</legend><br><br><button id="GIdsUts">Activate</button><br><br><br><button id="IhgfjAd">Deactivate</button><br><br></fieldset>' + //Fat Avatar
    '<br><br><hr><br>' +
    '<fieldset id="ab"><legend>Infinite Ammo</legend><br><br>Activate: O<br><br><br>Deactivate: L<br><br></fieldset>' + //Inf Ammo
    ''
);
document.documentElement.appendChild(menu);

//Opitions
var aimbot = false;
var fatAvatar = false;
var infAmmo = false;


//Varaibles
var interval = void 0;
var currentAmmo;

//Handler
const GUHfdg4 = document.getElementById('GUHfdg4'); //button 1 / aimbot activate
const HOGRufs = document.getElementById('HOGRufs'); //button 2 / aimbot deactivate
const HUGTRfs = document.getElementById('GIdsUts'); //button 3 / fat avatar activate
const IhgfjAd = document.getElementById('IhgfjAd'); //button 4 / fat abatar deactivate
const rgfbnfj = document.getElementById('rgfbnfj'); //button 5 / inf ammo activate
const Tgdfnju = document.getElementById('Tgdfnju'); //button 6 / inf ammo deactivate

GUHfdg4.addEventListener('click', event => {
    console.log(inMainMenu);
    if(!inMainMenu){
        log.info('Aimbot activated')
        c.removeEventListener("mousemove", gameInput, false);
        aimbot = true;
        interval = setInterval(aimClosestPlayer, 10);
        showNotification('LoliHub - Aimbot activated')
        player.name = localStorage.userName + " [LoliHub]";
        console.log(event)
    } else { log.info('Cant activate aimbot in mainMenu') }
});

HOGRufs.addEventListener('click', event => {
    console.log(inMainMenu);
    if(!inMainMenu){
        aimbot = false;
        clearInterval(interval);
        c.addEventListener("mousemove", gameInput, false);
        showNotification('LoliHub - Aimbot deactivated')
        console.log(event)
    } else { log.info('Cant deactivate aimbot in mainMenu') }
});

GIdsUts.addEventListener('click', event => {
    console.log(inMainMenu);
    if(!inMainMenu){
        fatAvatar = true;
        showNotification('LoliHub - Fat avatar activated');
        player.width = 100;
    } else { log.info('Cant activate fat avatar in mainMenu') }
});

IhgfjAd.addEventListener('click', event => {
    console.log(inMainMenu);
    if(!inMainMenu){
        fatAvatar = false;
        showNotification('LoliHub - Fat avatar deactivated')
        player.width = 53.753;
    } else { log.info('Cant deactivate fat avatar in mainMenu') }
});


function activate(event) {
    event.preventDefault();
    if (event.keyCode === 72 && !fatAvatar) {
        fatAvatar = true;
        showNotification('LoliHub - Fat avatar activated');
        player.width = 100;
    }
    if (event.keyCode === 79 && !infAmmo) {
        infAmmo = true;
        currentAmmo = player.weapons[0].ammo;
        console.log(currentAmmo);
        showNotification('LoliHub - Infinite Ammo activated');
        player.weapons.ammo = 500;
    }
}

function deactivate(event) {
    event.preventDefault();
    if (event.keyCode === 66) {
        fatAvatar = false;
        showNotification('LoliHub - Fat avatar deactivated')
        player.width = 53.753;
    }
    if (event.keyCode === 76 && !infAmmo) {
        infAmmo = false;
        showNotification('LoliHub - Infinite Ammo activated')
        player.weapons.ammo = 0;
    }
}



c.addEventListener("keydown", activate, false);
c.addEventListener("keyup", deactivate, false);

function getOtherPlayers(gameObjects, myTeam) {
    return gameObjects.filter(function(o) {
        return o.type === 'player' && o.dead === false && o.name !== player.name && o.team !== myTeam;
    });
}

function getMyPlayer(gameObjects) {
    return gameObjects.filter(function(o) {
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
    otherPlayers.forEach(function(p) {
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
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
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
