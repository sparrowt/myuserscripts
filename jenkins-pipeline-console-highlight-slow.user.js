// ==UserScript==
// @name         Jenkins highlight slow steps in Pipeline Console
// @namespace    https://github.com/sparrowt
// @homepage     https://github.com/sparrowt/myuserscripts
// @version      0.1
// @description  Highlight steps which took a significant amount of time in the Pipeline Console view
// @author       sparrowt
// @match        https://yourjenkinsinstance.example.net/*job/*/pipeline-console/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

function highlightSlowSteps() {
    document.getElementsBySelector('.log-card--text-duration').forEach(el => {
        if (el.textContent.includes('min')) {
            el.style.color = 'yellow'
        } else if (/^\d\d+ sec/i.test(el.textContent)) {
            el.style.color = 'aqua'
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
