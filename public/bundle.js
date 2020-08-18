/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const ul = document.querySelector('ul');\n\nconst displayFriends = async() => {\n  const result = await fetch('/api/friends');\n  const data = await result.json();\n\n  const html = data.map( friend => {\n    return `\n      <li id='${friend.name}-entry'>${friend.name}</li>\n      <div id='${friend.id}'>\n        <span>${friend.rating}</span>\n        <button id='${friend.rating}+'>+</button>\n        <button id='${friend.rating}-'>-</button>\n        <button>x</button>\n        <p></p>\n      </div>\n    `;\n  }).join('');\n  ul.innerHTML = html;\n}\n\nconst handleFriendOptions = () => {\n  ul.addEventListener('click', async function(event) {\n    try{\n      const target = event.target;\n      if (target.tagName === 'BUTTON') {\n        if (target.innerHTML === '+') {\n          changeRating(target, 1);\n        } else if (target.innerHTML === '-') {\n          changeRating(target, -1);\n        } else if (target.innerHTML === 'x') {\n          await fetch(`/api/friends/${event.target.parentNode.id}`, {\n            method: 'DELETE'\n          })\n          displayFriends();\n        }\n      }\n    }\n    catch(err) {\n      console.error(err)\n    }\n  });\n}\n\nconst addFriend = async () => {\n  const createButton = document.getElementById('create-friend');\n\n  createButton.addEventListener('click', async function() {\n    let newFriend = document.getElementById('new-friend').value;\n    await fetch(`/api/friends`, {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        name: newFriend\n      })\n    });\n    document.getElementById('new-friend').value = \"\"; // clear input box\n    displayFriends();\n  });\n}\n\nconst changeRating = async (target, direction) => {\n  let rating = parseInt(target.id.slice(0, -1)) + direction;\n\n  await fetch(`/api/friends/${target.parentNode.id}`, {\n    method: 'PUT',\n    body: JSON.stringify({\n      rating: rating\n    }),\n    headers: new Headers({\n      'Content-Type': 'application/json'\n    })\n  });\n\n  displayFriends();\n}\n\ndisplayFriends();\nhandleFriendOptions();\naddFriend();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });