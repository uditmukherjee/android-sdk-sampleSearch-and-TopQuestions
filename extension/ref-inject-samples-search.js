/*
 * Copyright 2014 Udit Mukherjee
 * Copyright 2013 readyState Software Ltd.
 * Copyright 2012 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _PACKAGE_DOC_URL_REGEX = /http(?:s)?:\/\/d(?:eveloper)?.android.com\/reference\/(.+)\/package-(summary|descr).html/;
var _CLASS_DOC_URL_REGEX = /http(?:s)?:\/\/d(?:eveloper)?.android.com\/reference\/(.+).html/;

var _GITHUB_SAMPLES_SEARCH_TEMPLATE = 'https://github.com/search?q=$QUERY+repo%3Aandroid%2Fplatform_development+repo%3Acommonsguy%2Fcw-omnibus+extension%3Ajava&type=Code';

var _STACKOVERFLOW_TOP_QUESTIONS = "http://stackoverflow.com/search?tab=votes&q=%5bandroid%5d%20%5b$QUERY%5d%20OR%20$QUERY%20";

(function() {
    var url = window.location.href;
    var appendContentSampleCode;
    var appendContentQuestions;

    var m;
    if (m = url.match(_PACKAGE_DOC_URL_REGEX)) {
  	// nothing
    } else if (m = url.match(_CLASS_DOC_URL_REGEX)) {
	var nameSlash = m[1];
	var outerNameSlash = nameSlash.replace(/\..*$/, ''); // trim inner classes
	var fullClass = nameSlash.match(/[A-Z]+.*$/);
	var outerNameDot = outerNameSlash.replace(/\//g, '.');
	var nameDot = nameSlash.replace(/\//g, '.');
	
	// use qualified outer class and full class name for inner classes
	var q = (nameDot != outerNameDot) ? outerNameDot + '+' + fullClass : nameDot;

	appendContentSampleCode = [
            ' (<a href="',
            _GITHUB_SAMPLES_SEARCH_TEMPLATE
		.replace(/\$QUERY/g, q),
            '">sample code</a>)'
	].join('');

	// var itemQuery = document.getElementById('jd-header').getElementsByTagName("h1")[0].textContent;
	// appendContentQuestions = [
        //     ' (<a href="',
        //     _STACKOVERFLOW_TOP_QUESTIONS
        //         .replace(/\$QUERY/g, itemQuery),
        //     '">Top Questions</a>)'
        // ].join('');

	var itemQuery = q.split('.');
	var name = itemQuery[itemQuery.length - 1];
	appendContentQuestions = [
            ' (<a href="',
            _STACKOVERFLOW_TOP_QUESTIONS
                .replace(/\$QUERY/g, name),
            '">Top Questions</a>)'
        ].join('');
    }

    if (appendContentQuestions || appendContentSampleCode ) {
	var appendNode = document.createElement('span');
	appendNode.innerHTML = appendContentSampleCode + appendContentQuestions;

	document
            .getElementById('jd-header')
            .getElementsByTagName('h1')[0]
            .appendChild(appendNode);
    }

})();
