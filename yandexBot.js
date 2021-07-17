// ==UserScript==
// @name         YandexBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Бот, создающий присутствие человека, просамтривающего ПС
// @author       Елисеев Александр
// @match        https://yandex.ru/*
// @match        https://www.renins.ru/*
// @match        https://www.bolshoi.ru/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementById("text");
let clickButton = document.getElementsByClassName("button")[1];
let goNext = true;
let sites = {
   "renins": ["Страхование", "ОСАГО", "КАСКО", "Купить страховку", "Ренессанс", "Страховой случай"],
   "bolshoi.ru": ["Театр", "Искусство", "Танец", "Представление", "Номер"]
}
let site = Object.keys(sites)[getIntRandom(0, Object.keys(sites).length)];
let words = sites[site];
let word = words[getIntRandom(0, words.length)];

if (clickButton != undefined){
    let i=0;
    let timerId = setInterval(function(){
        yandexInput.value = yandexInput.value + word[i++];
        document.cookie = "site="+site;
        if (i==word.length){
            clearInterval(timerId);
            clickButton.click();
        }
    }, 500);
}
else if (location.hostname === "https://yandex.ru/"){
    let links = document.links;
    let site = getCookie("site");
    for (i=0; i<links.length; i++){
        let link = links[i];
        if (link.href.indexOf(site) != -1){
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
    let currentPage = document.getElementsByClassName("pager__item")[3].innerText;
    if (currentPage<10) {
        let butNext = document.getElementsByClassName("pager__item_kind_next")[0];
            setTimeout(function(){
                butNext.click();
            }, 3000);
        }
    else {
        location.href = "https://yandex.ru/"
        }
}
else {
    setInterval(function(){
        if (getIntRandom(0, 100)<30) location.href = "https://yandex.ru/";
        let links = document.links;
        let randomIndex = getIntRandom(0, links.length);
        let link = links[randomIndex];
        if (link.href.IndexOf(location.hostname) != -1){
           links[randomIndex].click();
        }
        else {
            location.href = locaion.origin;
        }
    }, 2000);
}

function getIntRandom(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
