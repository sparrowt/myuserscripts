// ==UserScript==
// @name         Jenkins console: colourise ANSI escape sequences
// @namespace    https://github.com/sparrowt
// @homepage     https://github.com/sparrowt/myuserscripts
// @version      0.1
// @description  Use HTML to colourise ANSI colour escape sequences in Jenkins console output e.g. from PowerShell warnings
// @author       Tom Sparrow
// @updateURL    https://github.com/sparrowt/myuserscripts/raw/main/jenkins-colourise-console-ansi.user.js
// @match        https://yourjenkinsinstance.example.net/*/console
// ==/UserScript==

/*
Note: the Blue Ocean UI does this automatically - this script is for the 'classic' UI which currently does not.
I am aware of https://plugins.jenkins.io/ansicolor/ but this script helps where you may not have the permission
or time to test and implement the installation of a new plugin on a given Jenkins instance.

Disclaimer: quickly hacked together to make my life slightly easier. Use at your peril.

Known limitations:
 - only deals with foreground colours
 - may not work well on light themed jenkins (untested)
 - may be slow if viewing 'full' console with very long output
*/

const colourMappings = [
    // ANSI colour code => CSS colour
    ["31", "red"],
    ["32", "green"],
    ["33", "yellow"],
    ["34", "blue"],
    ["35", "magenta"],
    ["36", "cyan"],
    // Todo: make the above ones less bright versions e.g. with rgb(...) values from https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
    ["90", "grey"],
    ["91", "red"],
    ["92", "green"],
    ["93", "yellow"],
    ["94", "blue"],
    ["95", "magenta"],
    ["96", "cyan"],
];

// One-time setup For each colour code, construct the regex pattern & replacement once
const colourReplacements = colourMappings.map((pair) => {
    var pattern = new RegExp(`\u001b\\[${pair[0]};1m(.*)\u001b\\[0m`, "g");
    var replacement = `<span style="color:${pair[1]}">$1</span>`;
    return [pattern, replacement];
});

// Some custom replacements to do before the main colour ones
const initialReplacements = [
    // Avoid highlighting PowerShell VERBOSE output as yellow otherwise it looks like a WARNING
    [new RegExp(`\u001b\\[33;1m(VERBOSE:.*)\u001b\\[0m`, "g"), `<span style="color:grey">$1</span>`],
    [new RegExp(`(Encountered exception:)`, "g"), `<span style="color:red">$1</span>`],
]

const replacements = initialReplacements.concat(colourReplacements);

// console.log('User script will replace <ANSI color code regex> => <HTML replacement> as follows:');
// console.table(replacements);

function getConsoleOutputEl() {
    return document.querySelector('div#main-panel > pre.console-output');
}

function colourise() {
    console.log('Converting ANSI colour escape sequences');
    const el = getConsoleOutputEl();
    replacements.forEach(element => {
        var regexp = element[0];
        var replacement = element[1];
        el.innerHTML = el.innerHTML.replace(regexp, replacement);
    })
}

function startObserver() {
    var el = getConsoleOutputEl();
    const mutationCallback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > mutation.removedNodes.length) {
                console.log('DOM changes observed, re-colourising ANSI escape sequences');
                // TODO: optimise by detecting which <div> was added and only running colourise on that part
                setTimeout(colourise, 500);
            }
        }
    };
    const observer = new MutationObserver(mutationCallback);
    observer.observe(el, { childList: true });
}

(function() {
    'use strict';
    // Colourise on initial page load
    const initInterval = setInterval(() => {
        if (getConsoleOutputEl()) {
            setTimeout(colourise, 500);
            setTimeout(startObserver, 600);
            clearInterval(initInterval);
        }
    }, 500);

})();
