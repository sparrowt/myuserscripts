// ==UserScript==
// @name         Jenkins add Artifacts link in side bar
// @namespace    https://github.com/sparrowt
// @homepage     https://github.com/sparrowt/myuserscripts
// @version      0.4
// @description  Add link to build artifacts in the side bar in Jenkins UI
// @author       sparrowt
// @match        https://yourjenkinsinstance.example.net/*/job/*
// @grant        none
// ==/UserScript==

/*
 * This makes it easier to find artifacts especially when "Show pipeline graph on build page" is ticked
 * (from Pipeline Graph View plugin) which means the artifacts are hidden much further down the page
 * if you have a complex pipeline with many parallel stages that takes up a lot of vertical space
 */

(function() {
    'use strict';

    if (
        document.querySelector("a[href$='artifact/']") || // If there actually are any artifacts (based on presence of existing link e.g. further down in the main body on the job run home page)
        document.querySelector('#failedtestresult') // Or if you're on the 'Tests' results page and there are failed tests (in which case we assume there are likely to be some)
    ) {
        // ...then add a sidebar link with:
        // - text "Artifacts"
        // - SVG copied from the one beside that same link
        // - href constructed by removing anything after the final /NNNN/ to get the base job run page & then appending "artifact/"
        const href = document.URL.replace(/(\/[0-9]+\/).*/, '$1') + 'artifact/';
        console.log(`JenkinsAddArtifactsLinkUserscript - adding artifacts link to side bar`);
        document.querySelector('#tasks').insertAdjacentHTML("afterbegin", `<div class="task "><span class="task-link-wrapper "><a data-task-success="Done." data-task-post="" href="${href}" class="task-link task-link-no-confirm "><span class="task-icon-link"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 512 512"><title></title><path d="M448 341.37V170.61A32 32 0 00432.11 143l-152-88.46a47.94 47.94 0 00-48.24 0L79.89 143A32 32 0 0064 170.61v170.76A32 32 0 0079.89 369l152 88.46a48 48 0 0048.24 0l152-88.46A32 32 0 00448 341.37z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path d="M69 153.99l187 110 187-110M256 463.99v-200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path></svg></span><span class="task-link-text">Artifacts</span></a></span></div></div>`)
    }
})();
