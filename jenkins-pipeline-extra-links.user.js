// ==UserScript==
// @name         Jenkins add links to pipeline graph header
// @namespace    https://github.com/sparrowt
// @homepage     https://github.com/sparrowt/myuserscripts
// @version      0.3
// @description  Add useful shortcut links in the top bar of the Pipeline Graph View overview
// @author       sparrowt
// @match        https://yourjenkinsinstance.example.net/*/pipeline-overview/*
// @match        https://yourjenkinsinstance.example.net/*/stages/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Pipeline Graph View plugin now already includes links to artifacts & test results, so this userscript no longer needs to do that

    // Add link to classic console
    document.querySelector('.jenkins-app-bar__controls').insertAdjacentHTML('afterbegin', '<a href="../console" class="jenkins-button">Classic console</a>');
})();
