// ==UserScript==
// @name         steam成就过滤
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  过滤steam成就，分类已完成和未完成
// @author       Ifover
// @match        *://steamcommunity.com/stats/*/achievements/
// @icon         https://steamcommunity.com/favicon.ico
// @grant        none
// ==/UserScript==

var achievementsStatus;

function _init() {
    var append_style = `
      <style type="text/css">
          .achievements-txt{color: #898989;}
      </style>
    `
    jQuery('head').append(append_style);
}

function handleToggle(aStatus = achievementsStatus) {
    switch (aStatus) {
        case 1:
            // only show unlocked
            jQuery('.achieveRow').show()
            jQuery('.achieveRow').not('.unlocked').hide()
            break
        case 2:
            // only show locked
            jQuery('.achieveRow').show()
            jQuery('.achieveRow.unlocked').hide()
            break
        default:
            // Show All
            jQuery('.achieveRow').show()
            break
    }
}


(function () {
    'use strict';
    _init()
    achievementsStatus = 0
    let headerContentLeft = jQuery('#headerContentLeft')
    let action = jQuery(`
      <div style="color: #898989">
          成就状态: 
          <a class="achievements-txt all" style="color: #fff">全部</a>
           /         
          <a class="achievements-txt unlocked">已完成</a>
           / 
          <a class="achievements-txt locked">未完成</a>
      </div>
    `)
    headerContentLeft.append(action)
    jQuery('.achievements-txt').on('click', function () {
        handleToggle(jQuery(this).index());
        jQuery('.achievements-txt').css({color: "#898989"})
        jQuery(this).css({color: "#fff"})
    })


})();
