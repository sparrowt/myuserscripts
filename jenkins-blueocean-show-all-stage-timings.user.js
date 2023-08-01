// ==UserScript==
// @name         Jenkins show all stage timings in Blue Ocean view
// @namespace    https://github.com/sparrowt
// @homepage     https://github.com/sparrowt/myuserscripts
// @version      0.3
// @description  Show all stage timings without having to click on each stage
// @author       Tom Sparrow
// @updateURL    https://github.com/sparrowt/myuserscripts/raw/main/jenkins-blueocean-show-all-stage-timings.user.js
// @match        https://yourjenkinsinstance.example.net/blue/*/pipeline*
// ==/UserScript==

function getElements() {
    return document.querySelectorAll('g.PWGx-pipeline-node, g.PWGx-pipeline-node-selected');
}

function process() {
    console.log('Adding jenkins stage timings');
    getElements().forEach(el => {
        var titles = el.getElementsByTagNameNS("http://www.w3.org/2000/svg", 'title')
        if (titles.length) {
            // Extract duration from tooltip ('title') element
            var durationText = titles[0].textContent.replace('Passed in ', '').replace('Failed in', 'X').replace('but marked as unstable.', 'X');
            // Add it as a text label so it's always visible
            var label = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            label.textContent = durationText;
            label.setAttribute('x', '14');
            label.setAttribute('y', '-10');
            // Different colour if it is less than 1 minute
            var textColour = durationText.indexOf('m') == -1 ? 'grey' : 'blue';
            label.setAttribute('style', `font-size: 9px; fill: ${textColour};`);
            el.appendChild(label);
        }
    });
}


(function() {
    'use strict';
    const initInterval = setInterval(() => {
        if (getElements()) {
            setTimeout(process, 1000);
            clearInterval(initInterval);
        }
    }, 500);

})();
