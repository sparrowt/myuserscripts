// ==UserScript==
// @name         Jenkins remove Git Build Data
// @namespace    https://github.com/sparrowt
// @homepage     https://github.com/sparrowt/myuserscripts
// @version      0.1
// @description  Remove excessive "Git Build Data" links from the side bar in Jenkins UI
// @author       sparrowt
// @match        https://yourjenkinsinstance.example.net/*/job/*
// @grant        none
// ==/UserScript==

/*
 * Some pipeline scripts check out a repository multiple times (e.g. on a bunch of different nodes)
 * and personally I never use these side-bar links so this userscript hides them all in order to
 * make it easier to find the other things that I do want.
 */

(function() {
    'use strict';

    document.querySelectorAll('.task-link-text').forEach(
        el => {
            if (el.innerText == 'Git Build Data') {
                el.parentElement.parentElement.parentElement.remove();
            }
        }
    );
})();
