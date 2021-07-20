"use strict";
// ==UserScript==
// @name         LoliHub - Vertix.io Mod Menu
// @description  ModMenu with many features (Aimbot, Zoom, ...) Keybinds can you see in game
// @match        http://vertix.io/*
// @match        http://www.vertix.io/*
// @exclude      http://www.vertix.io/profile.html*
// @version      1.0.3
// @namespace    https://greasyfork.org/users/
// @icon         https://www.google.com/s2/favicons?domain=vertix.io
// @require      https://gist.githubusercontent.com/remy/0361b2b5d77c0b82535957ec88825cb4/raw/bd70216a87459cb1d2d17387b7a75e996e33f663/mousehold.jquery.js
// ==/UserScript==
//Settings
var aimbot = false;
var fatAvatar = false;
var infAmmo = false;
var autoJoin = false;

var whitelist = [""]; //who you dont want to attack (aimbot)

//Do not edit
var RequestedVersion;

//version check
var request = new Request("https://raw.githubusercontent.com/LoliiHub/Vertix-Mod-Menu/main/version");
fetch(request)
    .then(function (response) {
        return response.text();
    })
    .then(function (text) {
        var RequestedVersion = text.substring(0, 5);
        console.log(RequestedVersion);
        if (RequestedVersion === "1.0.3") {
            console.log(true);
        } else {
            var answer = confirm("Please install the newest version of LoliHub Mod Menu! \n\nWhy?\n\nSome things may be patched by the game developers and the newest version fixed it");
            if(answer){
                window.location="https://greasyfork.org/de";
            } else { kickPlayer("Please install the newest version of LoliHub Mod Menu!"); }
        }
    });

//Edit Main Menu
var elem = document.createElement("p");
var element = document.getElementById("mainTitleText");
element.style.color = "aliceblue";
var node = document.createTextNode("LoliHub Mod Menu");
elem.appendChild(node);
element.appendChild(elem);
element.appendChild(elem);

//Log Function
function Log() {
    this.info = (str, args = []) => this.log("lolihub info", str, args);
    this.log = (level, str, args) => {
        let colour = [];
        switch (level) {
            case "info":
                colour = ["rgb(251 208 7)", "rgb(251 208 7)"];
                break;
        }
        console.log(
            "%c ".concat("[ ", level.toUpperCase(), " ] "),
            [
                `background: linear-gradient(${colour[0]}, ${colour[1]})`,
                "border: 3px solid rgb(251 208 7)",
                "border-radius: 5px",
                "padding : 5px 50px",
                "color: white",
                "display: block",
                "text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)",
                "line-height: 12px",
                "text-align: center",
                "font-weight: bold",
                "font-size: 15px",
                "font-family: Arial",
            ].join(";")
        );
        if (args.length) console.log(str, args);
        else console.log(str);
    };
}
var log = new Log();

//Create Mod Menu
var menu = document.createElement("div");
menu.setAttribute("style",
        "background: rgb(0 0 0 / 41%);" +
        "top: 100px;" +
        "left: 9px;" +
        "color: rgb(251 208 7);" +
        "width: auto;" +
        "height: auto;" +
        "border-radius: 10px;" +
        "position: absolute;" +
        "overflow: hidden;" +
        "display: inline-block" +
        "z-index: 10000000" +
        "text-align: left" +
        "padding-top: 10px;" +
        "line-height: 0.8;" +
        "box-shadow: #ffd100 0 0 14px 5px;" +
        "box-sizing: border-box;" +
        "border: solid 3px #ffd100;" +
        "padding: 10px;"
);
menu.setAttribute("id", "lh");
menu.innerHTML =
    '<!--© LoliHub 2021--><div id="lhheader">Click here to move</div>' +
    "<br>" +
    "<strong>Loli Hub - By ShyShai#7788</strong>" +
    "<br><br><br>" +
    "<fieldset id=Huzghf><legend>Aimbot</legend>" + //aimbot
    "<br><br>" +
    "<button id=GUHfdg4>Activate</button>" + //aimbot activate
    "<br><br><br>" +
    '<button class="button" id=HOGRufs>Deactivate</button>' + //aimbot deactivate
    "<br><br>" +
    "</fieldset>" +
    '<br><hr id="1UGfdr"><br>' +
    "<fieldset id=GUHfnj><legend>Fat Avatar</legend>" + //fat avatar
    "<br><br>" +
    "<button id=GIdsUts>Activate</button>" + //fat avatar activate
    "<br><br><br>" +
    "<button id=IhgfjAd>Deactivate</button>" + //fat avatar deactivate
    "<br><br>" +
    "</fieldset>" +
    '<br><hr id="SDFrsd"><br>' +
    "<fieldset id=TtEUIg><legend>Infinite Ammo (in work)</legend>" + //inf ammo
    "<br><br>" +
    "<button id=rgfbnfj>Activate</button>" + //Inf Ammo activate
    "<br><br><br>" +
    "<button id=Tgdfnju>Deactivate</button>" + //Inf Ammo deactivate
    "<br><br>" +
    "</fieldset>" +
    '<br><hr id="DFhtrf"><br>' +
    "<fieldset id=FGIJse><legend>Auto Enter Game (in work)</legend>" + //auto enter
    "<br><br>" +
    "<button id=zuTGSdt>Activate</button>" + //auto enter activate
    "<br><br><br>" +
    "<button id=Gzursvd>Deactivate</button>" + //auto enter deactivate
    "<br><br></fieldset>" +
    '<input type="checkbox"></input>' +
    "<p>v.1.0.3</p>";
document.documentElement.appendChild(menu);

//Varaibles
var interval = void 0;
var currentAmmo;
var lastAmmo;

//buttons
const GUHfdg4 = document.getElementById("GUHfdg4"); //button 1 / aimbot activate
const HOGRufs = document.getElementById("HOGRufs"); //button 2 / aimbot deactivate
const GIdsUts = document.getElementById("GIdsUts"); //button 3 / fat avatar activate
const IhgfjAd = document.getElementById("IhgfjAd"); //button 4 / fat abatar deactivate
const rgfbnfj = document.getElementById("rgfbnfj"); //button 5 / inf ammo activate
const Tgdfnju = document.getElementById("Tgdfnju"); //button 6 / inf ammo deactivate
const zuTGSdt = document.getElementById("zuTGSdt"); //button 5 / inf ammo activate
const Gzursvd = document.getElementById("Gzursvd"); //button 6 / inf ammo deactivate
//CSS

//buttons1
document.getElementById("GUHfdg4").style = "background-color: rgb(251, 208, 7);padding: 5px 79px;border-radius: 10px;border: none;";
document.getElementById("HOGRufs").style = "background-color: rgb(251, 208, 7);padding: 5px 70px;border-radius: 10px;border: none;";
//buttons2
document.getElementById("GIdsUts").style = "background-color: rgb(251, 208, 7);padding: 5px 79px;border-radius: 10px;border: none;";
document.getElementById("IhgfjAd").style = "background-color: rgb(251, 208, 7);padding: 5px 70px;border-radius: 10px;border: none;";
//buttons3
document.getElementById("rgfbnfj").style = "background-color: rgb(251, 208, 7);padding: 5px 79px;border-radius: 10px;border: none;";
document.getElementById("Tgdfnju").style = "background-color: rgb(251, 208, 7);padding: 5px 70px;border-radius: 10px;border: none;";
//buttons4
document.getElementById("zuTGSdt").style = "background-color: rgb(251, 208, 7);padding: 5px 79px;border-radius: 10px;border: none;";
document.getElementById("Gzursvd").style = "background-color: rgb(251, 208, 7);padding: 5px 70px;border-radius: 10px;border: none;";
//fieldset
document.getElementById("Huzghf").style = "border-radius:10px;border: solid 3px rgb(251, 208, 7);";
document.getElementById("GUHfnj").style = "border-radius:10px;border: solid 3px rgb(251, 208, 7);";
document.getElementById("TtEUIg").style = "border-radius:10px;border: solid 3px rgb(251, 208, 7);";
document.getElementById("FGIJse").style = "border-radius:10px;border: solid 3px rgb(251, 208, 7);";
//hr
document.getElementById("1UGfdr").style = "border-radius:10px;border: solid 3px rgb(251, 208, 7);";
document.getElementById("SDFrsd").style = "border-radius:10px;border: solid 3px rgb(251, 208, 7);";
document.getElementById("DFhtrf").style = "border-radius:10px;border: solid 3px rgb(251, 208, 7);";
//dragElement
document.getElementById("lhheader").style =
    "padding: 10px;" +
    "cursor: move;" +
    "index: 10;" +
    "background-color: rgb(251 208 7);" +
    "color: rgb(255, 255, 255);" +
    "text-align: center;" +
    "color: black;" +
    "border-radius: 10px;" +
    "height: 5px;" +
    "line-height: 0.5;" +
    "/* padding: 10px 10px; */";

//Handler

//aimbot activate

GUHfdg4.addEventListener("click", (event) => {
    console.log(inMainMenu);
    if (!inMainMenu) {
        log.info("Aimbot activated");
        c.removeEventListener("mousemove", gameInput, false);
        aimbot = true;
        interval = setInterval(aimClosestPlayer, 10);
        showNotification("LoliHub - Aimbot activated");
        console.log(event);
        player.weapons[0].width = 5;
        player.weapons[0].length = 500;
    } else {
        log.info("Cant activate aimbot in mainMenu");
    }
});

//aimbot deactivate
HOGRufs.addEventListener("click", (event) => {
    console.log(inMainMenu);
    if (!inMainMenu) {
        aimbot = false;
        clearInterval(interval);
        c.addEventListener("mousemove", gameInput, false);
        showNotification("LoliHub - Aimbot deactivated");
        console.log(event);
    } else {
        log.info("Cant deactivate aimbot in mainMenu");
    }
});

//fatavatar activate
GIdsUts.addEventListener("click", (event) => {
    console.log(inMainMenu);
    if (!inMainMenu) {
        fatAvatar = true;
        showNotification("LoliHub - Fat avatar activated");
        player.width = 100;
    } else {
        log.info("Cant activate fat avatar in mainMenu");
    }
});

//fatavatar deactivate
IhgfjAd.addEventListener("click", (event) => {
    console.log(inMainMenu);
    if (!inMainMenu) {
        clearInterval(interval);
        fatAvatar = false;
        showNotification("LoliHub - Fat avatar deactivated");
        player.width = 53.753;
    } else {
        log.info("Cant deactivate fat avatar in mainMenu");
    }
});

//inf ammo activate
rgfbnfj.addEventListener("click", (event) => {
    console.log(inMainMenu);
    if (!inMainMenu) {
        player.weapons[0].reloadSpeed = 0;
        infAmmo = true;
        showNotification("LoliHub - Infinite Ammo activated");
    } else {
        log.info("Cant deactivate inf ammo in mainMenu");
    }
});

//inf ammo deactivate
Tgdfnju.addEventListener("click", (event) => {
    console.log(inMainMenu);
    if (!inMainMenu) {
        clearInterval(interval);
        infAmmo = false;
        showNotification("LoliHub - Infinite Ammo activated");
    } else {
        log.info("Cant activate inf ammo in mainMenu");
    }
});

//auto enter activate
zuTGSdt.addEventListener("click", (event) => {
    console.log(inMainMenu);
    log.info("in work");
    showNotification("LoliHub - Auto Enter is in work");
});

//auto enter deactivate
Gzursvd.addEventListener("click", (event) => {
    console.log(inMainMenu);
    log.info("in work");
    showNotification("LoliHub - Auto Enter is in work");
});

//Inf Ammo Handler
function shoot() {
    if (!inMainMenu) {
        if (player.weapons.length >= 1) {
            if (infAmmo) {
                currentAmmo = player.weapons[0].ammo;
                log.info("ammo: " + currentAmmo);
                player.weapons[0].ammo = currentAmmo;
                if (currentAmmo <= 1) {
                    //setTimeout(function() {}, 2000);
                    lastAmmo = currentAmmo - 1;
                    if (lastAmmo != currentAmmo - 1) {
                        console.log("e");
                    }
                    log.info(currentAmmo);
                    player.weapons[0].reloadSpeed = 0;
                    setTimeout(function(){ player.weapons[0].ammo = player.weapons[0].maxAmmo; console.log('reload') }, player.weapons[0].reloadSpeed);
                }
            }
        } else {
            log.info("No weapon found");
        }
    } else {
        log.info("Cant activate inf ammo in mainMenu");
    }
}

c.addEventListener("mousedown", shoot, false);
c.addEventListener("mousehold", shoot, false);

function getOtherPlayers(gameObjects, myTeam) {
    return gameObjects.filter(function (o) {
        return o.type === "player" && o.dead === false && o.name !== player.name && o.team !== myTeam && o.name != whitelist[0]; //gets other players - checks if not dead - checks if is enemie and not team mate - checks if player is not you
    });
}

function getMyPlayer(gameObjects) {
    return gameObjects.filter(function (o) {
        return o.name === player.name; //gets your playername
    })[0];
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); //sets distance
}

function getClosestPlayer(gameObjects) {
    //gets closest player
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
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

log.info("LoliHub loaded");
