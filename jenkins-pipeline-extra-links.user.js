// ==UserScript==
// @name         Jenkins add links to pipeline graph/console
// @namespace    https://github.com/sparrowt
// @homepage     https://github.com/sparrowt/myuserscripts
// @version      0.1
// @description  Add shortcut links in the 'app bar' of the Pipeline Graph View (overview/console) to common targets like test results
// @author       sparrowt
// @match        https://yourjenkinsinstance.example.net/*/pipeline-console/*
// @match        https://yourjenkinsinstance.example.net/*/pipeline-graph/*
// @grant        none
// ==/UserScript==

/*
 * Having come from Blue Ocean to use the Pipeline Graph View plugin https://plugins.jenkins.io/pipeline-graph-view/
 * the thing I miss is the one-click access to test results & artifacts from the top-right links in Blue Ocean graph view
 *
 * It is hard to find these from the 'Pipeline Overview' and 'Pipeline Console'
 * (you have to find the `#NNN` link in the breadcrumbs at the top and then find e.g. 'Test Result' in the side bar)
 * so add direct links at the top of these pipeline views to aid with this.
 *
 * Note: the links are currently added unconditionally so they may appear despite not being relevant but this is good enough for me for now.
 */


(function() {
    'use strict';

    // Add link to classic console
    document.querySelector('.jenkins-app-bar__controls').insertAdjacentHTML('afterbegin', '<a href="../console" class="jenkins-button">Full console</a>');

    // Add link to artifacts - if there aren't any sadly you just get a 404 (todo: check in advance & omit the button if not)
    document.querySelector('.jenkins-app-bar__controls').insertAdjacentHTML('afterbegin', '<a href="../artifact/" class="jenkins-button">Artifacts</a>');

    // Add link to junit test results - if there aren't any it will just redirect to the main page for this job build/run
    document.querySelector('.jenkins-app-bar__controls').insertAdjacentHTML('afterbegin', '<a href="../testReport" class="jenkins-button">Test Results</a>');
})();
