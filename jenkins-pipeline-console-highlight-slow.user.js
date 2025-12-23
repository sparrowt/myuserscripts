// ==UserScript==
// @name         Jenkins highlight slow steps in Pipeline Console
// @namespace    https://github.com/sparrowt
// @homepage     https://github.com/sparrowt/myuserscripts
// @version      0.4
// @description  Highlight steps which took a significant amount of time in the Pipeline Console view
// @author       sparrowt
// @match        https://yourjenkinsinstance.example.net/*job/*/pipeline-overview/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

function highlightSlowSteps() {
    document.getElementsBySelector('div.pgv-step-detail-header__actions > span').forEach(el => {
        if (/^\d+h( \d+m)?$/i.test(el.textContent)) {
            // At least 1 hour
            el.style.color = 'red';
        } else if (/^\d+m$/i.test(el.textContent)) {
            // At least 10 mins
            el.style.color = 'yellow';
        } else if (/^\d+m \d+s$/i.test(el.textContent)) {
            // At least 1 min
            el.style.color = 'cyan';
        } else if (/^\d\d+s$/i.test(el.textContent)) {
            // At least 10 seconds
            el.style.color = 'white';
        }
    });

    // Also highlight super-slow stages in the tree view on the left
    document.getElementsBySelector('div.pgv-tree-item__description').forEach(el => {
        if (/^\d+h( \d+m)?$/i.test(el.textContent)) {
            // At least 1 hour
            el.style.color = 'orange';
        }
    });
}

(function() {
    'use strict';

    // Apply quicker on first load
    setTimeout(highlightSlowSteps, 1000);
    // Periodically check again in case the user has switched to a different stage
    setInterval(highlightSlowSteps, 4000);
})();
