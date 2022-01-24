// ==UserScript==
// @name         steam成就过滤
// @namespace    https://github.com/Ifover/JS_jioben
// @version      0.2
// @description  过滤steam成就，已完成和未完成
// @author       Ifover
// @match        *://steamcommunity.com/stats/*/achievements/
// @icon         https://steamcommunity.com/favicon.ico
// @grant        GM_getValue
// @grant        GM_setValue
// @license      MIT
// ==/UserScript==

var achievementsStatus;
var id

function _init() {
    var append_style = `
      <style type="text/css">
          .achievements-txt{color: #898989;}
      </style>
    `
    jQuery('head').append(append_style);



    let headerContentLeft = jQuery('#headerContentLeft')
    let action = jQuery(`
      <div>
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
        GM_setValue('achievements' + id, jQuery(this).index())

        jQuery('.achievements-txt').css({color: "#898989"})
        jQuery(this).css({color: "#fff"})
    })


    let match = location.pathname.match(/\d+/g)
    id = match[0]

    if (GM_getValue('achievements' + id)) {
        achievementsStatus = GM_getValue('achievements' + id)
        jQuery('.achievements-txt').css({color: "#898989"})
        jQuery(jQuery('.achievements-txt')[achievementsStatus]).css({color: "#fff"})
    } else {
        GM_setValue('achievements' + id, 0)
    }

    handleToggle()

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


})();
