module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(751);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 104:
/***/ (function(module) {

module.exports = robot => {
  robot.on(
    [
      "pull_request.opened",
      "pull_request.edited",
      "pull_request.synchronize",
      "pull_request.reopened"
    ],
    context => {
      const title = context.payload.pull_request.title;
      const body = context.payload.pull_request.body;
      const isUnChecked = /-\s\[\s\]/g.test(body);
      const status = isUnChecked ? "failure" : "success";

      robot.log(
        `Updating PR "${title}" (${context.payload.pull_request
          .html_url}): ${status}`
      );

      robot.log(`isUnchecked: ${isUnChecked}`);

      context.github.repos.createStatus(
        context.repo({
          sha: context.payload.pull_request.head.sha,
          state: status,
          description: isUnChecked
            ? "The task list is not completed yet"
            : "The task list is completed",
          context: "Task List Zero"
        })
      );
    }
  );
};


/***/ }),

/***/ 751:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

// Require the adapter
const { adapt } = __webpack_require__(829);

// Require your Probot app's entrypoint, usually this is just index.js
const probot = __webpack_require__(104);

// Adapt the Probot app for Actions
// This also acts as the main entrypoint for the Action
adapt(probot);

/***/ }),

/***/ 829:
/***/ (function() {

eval("require")("adapter-github-actions");


/***/ })

/******/ });