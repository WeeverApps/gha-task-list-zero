module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 907:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// Require the adapter
const adapt = __webpack_require__(407);

// Require your Probot app's entrypoint, usually this is just index.js
const probot = __webpack_require__(372);

// Adapt the Probot app for Actions
// This also acts as the main entrypoint for the Action
adapt(probot);

/***/ }),

/***/ 372:
/***/ ((module) => {

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

/***/ 407:
/***/ ((module) => {

module.exports = eval("require")("adapter-github-actions");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(907);
/******/ })()
;