"use strict";
// ==UserScript==
// @name         LoliHub - Vertix.io Mod Menu
// @description  ModMenu with many features (Aimbot, Zoom, ...) Keybinds can you see in game
// @match        http://vertix.io/*
// @match        http://www.vertix.io/*
// @exclude      http://www.vertix.io/profile.html*
// @exclude      http://www.vertix.io/info.html*
// @version      1.0.3
// @namespace    https://greasyfork.org/users/
// @icon         https://www.google.com/s2/favicons?domain=vertix.io
// @require      https://gist.githubusercontent.com/remy/0361b2b5d77c0b82535957ec88825cb4/raw/bd70216a87459cb1d2d17387b7a75e996e33f663/mousehold.jquery.js
// ==/UserScript==

//© LoliHub 2021

//Settings
var aimbot = false;
var fatAvatar = false;
var infAmmo = false;
var autoJoin = false;

var RequestedVersion;

var buttons = [
    "weapon", //0
    "avatar", //1
    "other", //2
    "lhclose", //3
    "lhopen" //4
]

var sections = [
    "weapons", //0
    "avatars", //1
    "others", //2
    "lh" //3
]

var sec1buttons = [
    "c1", //0
    "c2", //1
    "c3", //2
    "c4" //3
]

var hr = [
    "hr1",
    "hr2",
    "hr3",
    "hr4"
]

var fonts = [
    "lg1",
    "lg2",
    "lg3",
    "lg4",
    "p1",
    "p2",
]

//version check
var request = new Request("https://raw.githubusercontent.com/LoliiHub/Vertix-Mod-Menu/main/version");
fetch(request)
    .then(function(response) {
        return response.text();
    })
    .then(function(text) {
        var RequestedVersion = text.substring(0, 5);
        console.log(RequestedVersion);
        if (RequestedVersion === "1.0.4") {
            console.log(true);
        } else {
            var answer = confirm("Please install the newest version of LoliHub Mod Menu! \n\nWhy?\n\nSome things may be patched by the game developers and the newest version fixed it");
            if (answer) {
                window.location = "https://greasyfork.org/de";
            } else {
                kickPlayer("Please install the newest version of LoliHub Mod Menu!");
            }
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
    this.info = (str, args = []) => this.log(str, str, args);
    this.log = (level, str, args) => {
        let colour = [];
        switch (level) {
            case "info":
                colour = ["rgb(251 208 7)", "rgb(251 208 7)"];
                break;
        }
        console.log(
            "%c ".concat(" ", level.toUpperCase(), "  "),
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
                "font-size: 15px",
                "font-family:'Poppins',sans-serif;",
            ].join(";")
        );
        if (args.length) console.log(args);
        else console.log();
    };
}
var log = new Log();

//Create Mod Menu
var menu = document.createElement("div");
menu.setAttribute("id", "lh");
menu.innerHTML = "<!--© LoliHub 2021--><i class='fa fa-close close' id='lhclose'></i><div id=categ><input id=weapon type=button value=Weapon> <input id=avatar type=button value=Avatar> <input id=other type=button value=Other></div><section class=weapon id=weapons style=display:block><div class=wsec1><fieldset id=fs1><legend id=lg1 title='Gives you an aimot and automatically aims at the players head'>Aimbot</legend><label id=switch title=Enable/Disable><input id=c1 type=checkbox></label></fieldset></div><br><hr id=hr1><br><div class=wsec2><fieldset id=fs2><legend id=lg2 title='Gives your current gun infinite Ammo (in work, may be not working or you will be kicked)'>Infinite Ammo</legend><label id=switch title=Enable/Disable><input id=c2 type=checkbox></label></fieldset></div><br><hr id=hr2><br><div class=wsec3><fieldset id=fs3><legend id=lg3 title='Makes your gun very long'>Long Gun</legend><label id=switch title=Enable/Disable><input id=c3 type=checkbox></label></fieldset></div><br><hr id=hr3><br><div class=wsec4><fieldset id=fs4><legend id=lg4 title='Makes your gun very fat'>Fat Gun</legend><label id=switch title=Enable/Disable><input id=c4 type=checkbox></label></fieldset></div><br><hr id=hr4><br></section><section class=avatars id=avatars style=display:none>Avatar - Comming Soon</section><section class=others id=others style=display:none>Other - Comming Soon</section><p id='p1'>LoliiHub Vertix - Mod Menu</p><p id='p2'>v.1.0.4 - © LoliHub 2021</p>"
document.documentElement.appendChild(menu);

//Close Button
var close = document.createElement("div");
close.setAttribute("id", "lhopen");
close.setAttribute("title", "Open menu");
close.innerHTML = "Open"
document.documentElement.appendChild(close);

//Poppins Font
var poppinsFont = document.createElement('link');
poppinsFont.setAttribute('rel', 'stylesheet');
poppinsFont.setAttribute('type', 'text/css');
poppinsFont.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap);');
document.head.appendChild(poppinsFont);

//Icons
var icons = document.createElement('link');
icons.setAttribute('rel', 'stylesheet');
icons.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
document.head.appendChild(icons);


//Varaibles
var interval = void 0;
var currentAmmo;
var lastAmmo;

//buttons
const c1 = document.getElementById('c1'); //button 1 / aimbot activate
const c2 = document.getElementById('c2'); //button 2 / aimbot deactivate
const c3 = document.getElementById('c3'); //button 5 / inf ammo activate
const c4 = document.getElementById('c4'); //button 6 / inf ammo deactivate

//CSS
document.getElementById('lh').style = "font-family:'Poppins',sans-serif;background:rgba(39,39,39,.808);top:8px;left:1670px;color:rgb(251 208 7);width:270px;height:360px;border-radius:10px;position:absolute;display:inline-block;z-index:10000000;padding-top:10px;line-height:.8;box-shadow:#ffd100 0 0 10px 2px;box-sizing:border-box;border:solid 1px #ffd100;padding:10px;overflow:auto;text-align:justify; padding-left:10px;padding-right:10px;/*transform: translateY(-950px);*//*position: sticky;*/";
document.getElementById('categ').style = "font-family:'Poppins',sans-serif;padding:15px;z-index:10;background-color:rgb(251 208 7);color:#fff;text-align:center;color:#000;border-radius:7px;height:5px;width:auto;line-height:.5;margin-bottom:10px;box-shadow:0 0 10px 4px rgba(39,39,39,.808)";
document.getElementById('weapon').style = "font-family:'Poppins',sans-serif;background-color:#fbd007;color:#000;width:auto;margin-top:-50px;border-radius:10px;border:none;font-size:12px;cursor:pointer;box-shadow:0 0 10px 1px rgba(39,39,39,.808)";
document.getElementById('avatar').style = "font-family:'Poppins',sans-serif;background-color:#fbd007;color:#000;width:auto;margin-top:-50px;border-radius:10px;border:none;font-size:12px;cursor:pointer;box-shadow:0 0 10px 1px rgba(39,39,39,.808)";
document.getElementById('other').style = "font-family:'Poppins',sans-serif;background-color:#fbd007;color:#000;width:auto;margin-top:-50px;border-radius:10px;border:none;font-size:12px;cursor:pointer;box-shadow:0 0 10px 1px rgba(39,39,39,.808)";
document.getElementById('fs1').style = "font-family:'Poppins',sans-serif;border-radius:10px;border:solid 4.8px #fbd007;width:auto;float:center;margin:0;box-shadow:0 0 10px 4px rgba(39,39,39,.808)";
document.getElementById('fs2').style = "font-family:'Poppins',sans-serif;border-radius:10px;border:solid 4.8px #fbd007;width:auto;float:center;margin:0;box-shadow:0 0 10px 4px rgba(39,39,39,.808)";
document.getElementById('fs3').style = "font-family:'Poppins',sans-serif;border-radius:10px;border:solid 4.8px #fbd007;width:auto;float:center;margin:0;box-shadow:0 0 10px 4px rgba(39,39,39,.808)";
document.getElementById('fs4').style = "font-family:'Poppins',sans-serif;border-radius:10px;border:solid 4.8px #fbd007;width:auto;float:center;margin:0;box-shadow:0 0 10px 4px rgba(39,39,39,.808)";
document.getElementById('c1').style = "font-family:'Poppins',sans-serif;width:20px;height:20px;vertical-align:middle;box-shadow:0 0 10px 4px rgba(39,39,39,.808)";
document.getElementById('c2').style = "font-family:'Poppins',sans-serif;width:20px;height:20px;vertical-align:middle;box-shadow:0 0 10px 4px rgba(39,39,39,.808)";
document.getElementById('c3').style = "font-family:'Poppins',sans-serif;font-family:'Poppins',sans-serif;width:20px;height:20px;vertical-align:middle;box-shadow:0 0 10px 4px rgba(39,39,39,.808)";
document.getElementById('c4').style = "font-family:'Poppins',sans-serif;width:20px;height:20px;vertical-align:middle;box-shadow:0 0 10px 4px rgba(39,39,39,.808)";
document.getElementById('hr1').style = "font-family:'Poppins',sans-serif;border-radius:10px;border:solid 3px #fbd007;width:auto;float:center;margin:0;box-shadow:0 0 10px 4px rgba(39,39,39,.808)";
document.getElementById('hr2').style = "font-family:'Poppins',sans-serif;border-radius:10px;border:solid 3px #fbd007;width:auto;float:center;margin:0;box-shadow:0 0 10px 4px rgba(39,39,39,.808)";
document.getElementById('hr3').style = "font-family:'Poppins',sans-serif;border-radius:10px;border:solid 3px #fbd007;width:auto;float:center;margin:0;box-shadow:0 0 10px 4px rgba(39,39,39,.808)";
document.getElementById('hr4').style = "font-family:'Poppins',sans-serif;border-radius:10px;border:solid 3px #fbd007;width:auto;float:center;margin:0;box-shadow:0 0 10px 4px rgba(39,39,39,.808)";
document.getElementById('lhopen').style = "font-family:'Poppins',sans-serif;display: none;";
document.getElementById('lhclose').style = "position:sticky;float:right;padding:7px;cursor:pointer;z-index:10;background-color:rgb(251 208 7);color:#fff;text-align:center;color:#000;border-radius:10px;height:5px;width:auto;line-height:.5;margin-bottom:10px;box-shadow:0 0 10px 3px rgba(39,39,39,.808)";

for (let i = 0; i < fonts.length; i++) {
    document.getElementById(fonts[i]).style = "font-family:'Poppins',sans-serif;";
}

//Hacks Handler//
//aimbot activate
c1.addEventListener("click", (event) => {
    console.log(inMainMenu);
    if (!inMainMenu) {
        log.info("Aimbot activated");
        c.removeEventListener("mousemove", gameInput, false);
        aimbot = true;
        interval = setInterval(aimClosestPlayer, 10);
        showNotification("LoliHub - Aimbot activated");
        console.log(event);
    } else {
        log.info("Cant activate aimbot in mainMenu");
        document.getElementById(sec1buttons[0]).checked = false;
    }
});

//aimbot deactivate
c2.addEventListener("click", (event) => {
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
c3.addEventListener("click", (event) => {
    console.log(inMainMenu);
    if (!inMainMenu) {
        fatAvatar = true;
        showNotification("LoliHub - Infinite Ammo activated");
        player.width = 100;
    } else {
        log.info("Cant activate fat avatar in mainMenu");
    }
});

//fatavatar deactivate
c4.addEventListener("click", (event) => {
    console.log(inMainMenu);
    if (!inMainMenu) {
        clearInterval(interval);
        fatAvatar = false;
        showNotification("LoliHub - Infinite Ammo deactivated");
        player.width = 53.753;
    } else {
        log.info("Cant deactivate fat avatar in mainMenu");
    }
});

/*inf ammo activate
c3.addEventListener("click", (event) => {
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
c4.addEventListener("click", (event) => {
    console.log(inMainMenu);
    if (!inMainMenu) {
        clearInterval(interval);
        infAmmo = false;
        showNotification("LoliHub - Infinite Ammo activated");
    } else {
        log.info("Cant activate inf ammo in mainMenu");
    }
});

/*auto enter activate
zuTGSdt.addEventListener("click", (event) => {
    console.log(inMainMenu);
    log.info("in work");
    showNotification("LoliHub - Auto Enter is in work");
});


/*
auto enter deactivate
Gzursvd.addEventListener("click", (event) => {
    console.log(inMainMenu);
    log.info("in work");
    showNotification("LoliHub - Auto Enter is in work");
});
*/
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
                    setTimeout(function() {
                        player.weapons[0].ammo = player.weapons[0].maxAmmo;
                        console.log('reload')
                    }, player.weapons[0].reloadSpeed);
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
    return gameObjects.filter(function(o) {
        return o.type === "player" && !o.dead && o.name !== player.name && o.team !== myTeam; //gets other players - checks if not dead - checks if is enemie and not team mate - checks if player is not you
    });
}

function getMyPlayer(gameObjects) {
    return gameObjects.filter(function(o) {
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

//UI Catergory Handler

for (let i = 0; i < sec1buttons.length; i++) { //uncheck all checkboxes
    document.getElementById(sec1buttons[i]).checked = false;
}

document.getElementById(buttons[0]).addEventListener("click", (event) => {
    document.getElementById(sections[0]).style = "display: block;"
    document.getElementById(sections[1]).style = "display: none;"
    document.getElementById(sections[2]).style = "display: none;"
});

document.getElementById(buttons[1]).addEventListener("click", (event) => {
    document.getElementById(sections[0]).style = "display: none;"
    document.getElementById(sections[1]).style = "display: block;"
    document.getElementById(sections[2]).style = "display: none;"
});

document.getElementById(buttons[2]).addEventListener("click", (event) => {
    document.getElementById(sections[0]).style = "display: none;"
    document.getElementById(sections[1]).style = "display: none;"
    document.getElementById(sections[2]).style = "display: block;"
});

document.getElementById(buttons[3]).addEventListener("click", (event) => {
    document.getElementById(sections[3]).style = "display: none;"
    document.getElementById(buttons[4]).style = "display: block;padding:7px;cursor:pointer;z-index:10;float:right;background-color:rgb(251 208 7);color:#fff;text-align:center;color:#000;border-radius:10px;height:5px;width:60px;line-height:.5;margin-bottom:10px;box-shadow:0 0 10px 4px rgba(39,39,39,.808); transform: translateY(-720px)"
});

document.getElementById(buttons[4]).addEventListener("click", (event) => {
    document.getElementById(buttons[4]).style = "display: none;"
    document.getElementById(sections[3]).style = "display:block;background:rgba(39,39,39,.808);top:8px;left:1670px;color:rgb(251 208 7);width:270px;height:360px;border-radius:10px;position:absolute;display:inline-block;z-index:10000000;padding-top:10px;line-height:.8;box-shadow:#ffd100 0 0 10px 2px;box-sizing:border-box;border:solid 1px #ffd100;padding:10px;overflow:auto;text-align:justify; padding-left:10px;padding-right:10px;/*transform: translateY(-1200px);*//*position: sticky;*/"
});

log.info("LoliHub loaded");
