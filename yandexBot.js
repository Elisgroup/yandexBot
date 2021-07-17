// ==UserScript==
// @name         YandexBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Бот, создающий присутствие человека, просамтривающего ПС
// @author       Елисеев Александр
// @match        https://yandex.ru/*
// @match        https://www.renins.ru/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementById("text");
let clickButton = document.getElementsByClassName("button")[1];
let goNext = true;
if (clickButton != undefined){
    yandexInput.value = "Страхование";
    setTimeout(function(){
        clickButton.click();
    }, 3000);
}
else {
    let links = document.links;
    for (i=0; i<links.length; i++){
        let link = links[i];
        if (link.href.indexOf("renins") != -1){
            link.target = "_self";
            setTimeout(function(){
                link.click();
            }, 2000);
            goNext = false;
            break;
        }
    }
}
if (goNext = true){
    let butNext = document.getElementsByClassName("pager__item_kind_next")[0];
    setTimeout(function(){
        butNext.click();
    }, 3000);
}
else {
    let links = document.links;
    let randomIndex = getIntRandom(0, links.length);
    let link = links[randomIndex];
    if (link.href.IndexOf(location.hostname) != -1){
    setTimeout(function(){
        links[randomIndex].click();
    }, 2000);
    }
    else {
        location.href = "https://www.renins.ru/"
    }
}
function getIntRandom(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}
