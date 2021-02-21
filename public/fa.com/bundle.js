/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (() => {

eval("\r\nconst subHeader = [\r\n    {\r\n        title: \"Products\",\r\n        subTitle: \"Take Payment\",\r\n        description: \"Facilitate taking payment in your app today thanks to Stripe - create online stores and marketplaces.\",\r\n    },\r\n    {\r\n        title: \"Products\",\r\n        subTitle: \"Pay only for what you need\",\r\n        description: \"No need to hire a teams anymore. Use our free powerful templates and upgrade if necessary.\",\r\n    },\r\n    {\r\n        title: \"Products\",\r\n        subTitle: \"Enterprise Grade\",\r\n        description: \"Technology that powers Google - reliable, secure and up to date with modern standards.\",\r\n    },\r\n].map(async (f) => {\r\n    const data = await fetch(\"tpl/sub-header.html\");\r\n    const html = await data.text();\r\n    $(html).find(\".card-title\").text(f.title).end()\r\n        .find(\".card-subtitle\").text(f.subTitle).end()\r\n        .find(\".card-text\").text(f.description).end().appendTo(\"#sub-header\");\r\n});\r\nconst circleAnimation = [\r\n    {\r\n        align: \"align-self-start\",\r\n        color: \"#f36aa9\"\r\n    },\r\n    {\r\n        align: \"align-self-end\",\r\n        color: \"#7de2d1\"\r\n    },\r\n    {\r\n        align: \"align-self-start\",\r\n        color: \"#f36aa9\"\r\n    },\r\n    {\r\n        align: \"align-self-end\",\r\n        color: \"#e6ebf2\"\r\n    },\r\n].map(async (f) => {\r\n    const data = await fetch(\"tpl/circle-animation.html\");\r\n    const html = await data.text();\r\n    console.log(html);\r\n    $(html).addClass(f.align)\r\n        .find(\".circle\").css(\"background\", f.color).end()\r\n        .appendTo(\"#circle-animation\");\r\n});\r\nconst content1 = [\r\n    {\r\n        inverse: false,\r\n        author: \"Devops Engineer\",\r\n        title: \"Google Grade Security\",\r\n        subTitle: \"Powered by Google\",\r\n        icon: `<i class=\"fab fa-google\"></i>&nbsp;`,\r\n        css: { paddingTop: \"6rem\", paddingBottom: \"0\" },\r\n        testament: \"As long as I follow Google standards, I have technical confidence in what I build 100% of the time.\",\r\n        description: \"Peace of mind - Our stack is based on Google and we closely follow their guidelines to ensure we deliver Google quality applications with ease and efficiency.\"\r\n    },\r\n    {\r\n        inverse: true,\r\n        author: \"Software Engineer\",\r\n        title: \"Open Source\",\r\n        subTitle: \"It's Free\",\r\n        icon: `<i class=\"fab fa-github\"></i>&nbsp;`,\r\n        css: { paddingTop: \"6rem\", paddingBottom: \"0\" },\r\n        testament: \"Whenever I have a technical problem, I just google it and I find the answer. This how I became a developer.\",\r\n        description: \"Our tools are open source which actually helps us deliver better software since we adhere to common practices and standards used by millions of other developers.\"\r\n    },\r\n    {\r\n        inverse: false,\r\n        author: \"Web Developer\",\r\n        title: \"All Platforms\",\r\n        subTitle: \"Mobile, Desktop and Web\",\r\n        icon: `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" style=\"height: 32px; width: 32px;\"><g class=\"\" transform=\"translate(0,0)\" style=\"\"><path d=\"M318 123.645l-61.5 35.7-61.76-35.7 61.76-35.7zm93.68 54.19l-61.76 35.7 61.76 35.7 61.5-35.7zm-294.39 80.64l61.76 35.7 61.5-35.7-61.5-35.7zm139.52-80.57l-61.76 35.7 61.76 35.7 61.5-35.7zM31 298.365l62 35.69v-71l-62-35.65v71zm373-26l-62 35.69v70.94l62-35.66v-70.97zm-225.11-139.4l-61.76 35.7 61.76 35.7 61.5-35.7zM109 343.305l62 35.69v-70.94l-62-35.69v71zm225.41-120.45l-61.76 35.7 61.76 35.7 61.5-35.7zM249 353.055l-62-35.7v71l62 35.7v-71zm77-35.67l-61 35.67v70.94l61-35.66v-70.95zm8.07-184.5l-61.76 35.7 61.76 35.7 61.5-35.7zm-232.6 44.95l-61.77 35.7 61.76 35.7 61.5-35.7zM481 227.565l-61 35.66v70.94l61-35.66v-70.94zm-286.11 75.93l61.76 35.7 61.5-35.7-61.5-35.7z\" fill=\"#000000\" fill-opacity=\"1\"></path></g></svg>&nbsp;`,\r\n        css: { paddingTop: \"6rem\", paddingBottom: \"6rem\" },\r\n        testament: \"Back in the day, you coded the same site twice for mobile and web. Now we code once and it works everywhere.\",\r\n        description: \"Our tools allow us to build once for all platforms and enjoy a native experience. This comes for free with all of our templates.\"\r\n    }\r\n].map(async (f) => {\r\n    const data = await fetch(\"tpl/content1.html\");\r\n    const html = await data.text();\r\n    const p1 = $(html).addClass(f.inverse ? \"flex-md-row-reverse\" : \"\").css(f.css)\r\n        .find(\".first\").addClass(`col-md-3 ${f.inverse && \"offset-md-1\"}`).removeClass(\"col\").end()\r\n        .find(\".icon\").html(f.icon).end()\r\n        .find(\".title\").text(f.title).end()\r\n        .find(\".second\").addClass(`col-md-4 ${!f.inverse && \"offset-md-1\"}`).end()\r\n        .find(\".subtitle\").text(f.subTitle).end()\r\n        .find(\".description\").text(f.description).end()\r\n        .find(\".testament\").text(f.testament).end();\r\n    p1.insertAfter(\"#explore\");\r\n});\r\n\n\n//# sourceURL=webpack://femiadeniyi/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;