/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./config/apollo.js":
/*!**************************!*\
  !*** ./config/apollo.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @apollo/client */ \"@apollo/client\");\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _apollo_client_link_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/client/link/error */ \"@apollo/client/link/error\");\n/* harmony import */ var _apollo_client_link_error__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client_link_error__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// Link para manejar errores\nconst errorLink = (0,_apollo_client_link_error__WEBPACK_IMPORTED_MODULE_1__.onError)(({ graphQLErrors, networkError })=>{\n    if (graphQLErrors) {\n        graphQLErrors.forEach(({ message, locations, path })=>{\n            console.error(`[GraphQL error]: Mensaje: ${message}, Path: ${path}`);\n        });\n    }\n    if (networkError) {\n        console.error(`[Network error]: ${networkError}`);\n    }\n});\n// Link para manejar la autenticación (añadir el token)\nconst authLink = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloLink((operation, forward)=>{\n    const token = localStorage.getItem('token'); // Suponiendo que guardas el token en localStorage\n    if (token) {\n        operation.setContext({\n            headers: {\n                Authorization: `Bearer ${token}`\n            }\n        });\n    }\n    return forward(operation);\n});\n// Link para la solicitud HTTP a tu servidor de GraphQL\nconst httpLink = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.HttpLink({\n    uri: 'http://localhost:4000/'\n});\n// Configuración del cliente de Apollo\nconst client = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloClient({\n    cache: new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.InMemoryCache(),\n    link: (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.from)([\n        errorLink,\n        authLink,\n        httpLink\n    ])\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (client);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbmZpZy9hcG9sbG8uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBeUY7QUFDckM7QUFFcEQsNEJBQTRCO0FBQzVCLE1BQU1NLFlBQVlELGtFQUFPQSxDQUFDLENBQUMsRUFBRUUsYUFBYSxFQUFFQyxZQUFZLEVBQUU7SUFDeEQsSUFBSUQsZUFBZTtRQUNqQkEsY0FBY0UsT0FBTyxDQUFDLENBQUMsRUFBRUMsT0FBTyxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRTtZQUNqREMsUUFBUUMsS0FBSyxDQUFDLENBQUMsMEJBQTBCLEVBQUVKLFFBQVEsUUFBUSxFQUFFRSxNQUFNO1FBQ3JFO0lBQ0Y7SUFFQSxJQUFJSixjQUFjO1FBQ2hCSyxRQUFRQyxLQUFLLENBQUMsQ0FBQyxpQkFBaUIsRUFBRU4sY0FBYztJQUNsRDtBQUNGO0FBRUEsdURBQXVEO0FBQ3ZELE1BQU1PLFdBQVcsSUFBSVosc0RBQVVBLENBQUMsQ0FBQ2EsV0FBV0M7SUFDMUMsTUFBTUMsUUFBUUMsYUFBYUMsT0FBTyxDQUFDLFVBQVUsa0RBQWtEO0lBRS9GLElBQUlGLE9BQU87UUFDVEYsVUFBVUssVUFBVSxDQUFDO1lBQ25CQyxTQUFTO2dCQUNQQyxlQUFlLENBQUMsT0FBTyxFQUFFTCxPQUFPO1lBQ2xDO1FBQ0Y7SUFDRjtJQUVBLE9BQU9ELFFBQVFEO0FBQ2pCO0FBRUEsdURBQXVEO0FBQ3ZELE1BQU1RLFdBQVcsSUFBSXRCLG9EQUFRQSxDQUFDO0lBQzFCdUIsS0FBSztBQUdUO0FBRUEsc0NBQXNDO0FBQ3RDLE1BQU1DLFNBQVMsSUFBSTFCLHdEQUFZQSxDQUFDO0lBQzlCMkIsT0FBTyxJQUFJMUIseURBQWFBO0lBQ3hCMkIsTUFBTXhCLG9EQUFJQSxDQUFDO1FBQUNFO1FBQVdTO1FBQVVTO0tBQVM7QUFDNUM7QUFFQSxpRUFBZUUsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxkYXZpZC5hbGJpbm9cXERlc2t0b3BcXEFSVElTRUFSQ0hhYVxcQXJ0aXNlYXJoLUZVTEwtbWFzdGVyXFxjb25maWdcXGFwb2xsby5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcG9sbG9DbGllbnQsIEluTWVtb3J5Q2FjaGUsIEh0dHBMaW5rLCBBcG9sbG9MaW5rLCBmcm9tIH0gZnJvbSAnQGFwb2xsby9jbGllbnQnO1xuaW1wb3J0IHsgb25FcnJvciB9IGZyb20gJ0BhcG9sbG8vY2xpZW50L2xpbmsvZXJyb3InO1xuXG4vLyBMaW5rIHBhcmEgbWFuZWphciBlcnJvcmVzXG5jb25zdCBlcnJvckxpbmsgPSBvbkVycm9yKCh7IGdyYXBoUUxFcnJvcnMsIG5ldHdvcmtFcnJvciB9KSA9PiB7XG4gIGlmIChncmFwaFFMRXJyb3JzKSB7XG4gICAgZ3JhcGhRTEVycm9ycy5mb3JFYWNoKCh7IG1lc3NhZ2UsIGxvY2F0aW9ucywgcGF0aCB9KSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGBbR3JhcGhRTCBlcnJvcl06IE1lbnNhamU6ICR7bWVzc2FnZX0sIFBhdGg6ICR7cGF0aH1gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChuZXR3b3JrRXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGBbTmV0d29yayBlcnJvcl06ICR7bmV0d29ya0Vycm9yfWApO1xuICB9XG59KTtcblxuLy8gTGluayBwYXJhIG1hbmVqYXIgbGEgYXV0ZW50aWNhY2nDs24gKGHDsWFkaXIgZWwgdG9rZW4pXG5jb25zdCBhdXRoTGluayA9IG5ldyBBcG9sbG9MaW5rKChvcGVyYXRpb24sIGZvcndhcmQpID0+IHtcbiAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTsgLy8gU3Vwb25pZW5kbyBxdWUgZ3VhcmRhcyBlbCB0b2tlbiBlbiBsb2NhbFN0b3JhZ2VcblxuICBpZiAodG9rZW4pIHtcbiAgICBvcGVyYXRpb24uc2V0Q29udGV4dCh7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLCAvLyBBZ3JlZ2Ftb3MgZWwgdG9rZW4gZW4gbG9zIGhlYWRlcnMgZGUgbGEgc29saWNpdHVkXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGZvcndhcmQob3BlcmF0aW9uKTtcbn0pO1xuXG4vLyBMaW5rIHBhcmEgbGEgc29saWNpdHVkIEhUVFAgYSB0dSBzZXJ2aWRvciBkZSBHcmFwaFFMXG5jb25zdCBodHRwTGluayA9IG5ldyBIdHRwTGluayh7XG4gICAgdXJpOiAnaHR0cDovL2xvY2FsaG9zdDo0MDAwLycsIC8vIHR1IGVuZHBvaW50IGRlIEdyYXBoUUxcbiAgICAvL3VyaTogJ2h0dHA6Ly8xMC4xMjEuMS4xNDM6NDAwMC9ncmFwaHFsJywgLy8gdHUgZW5kcG9pbnQgZGUgR3JhcGhRTFxuICAgIC8vdXJpOiAnL2dyYXBocWwnLCAvLyB0dSBlbmRwb2ludCBkZSBHcmFwaFFMXG59KTtcblxuLy8gQ29uZmlndXJhY2nDs24gZGVsIGNsaWVudGUgZGUgQXBvbGxvXG5jb25zdCBjbGllbnQgPSBuZXcgQXBvbGxvQ2xpZW50KHtcbiAgY2FjaGU6IG5ldyBJbk1lbW9yeUNhY2hlKCksXG4gIGxpbms6IGZyb20oW2Vycm9yTGluaywgYXV0aExpbmssIGh0dHBMaW5rXSksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xpZW50O1xuIl0sIm5hbWVzIjpbIkFwb2xsb0NsaWVudCIsIkluTWVtb3J5Q2FjaGUiLCJIdHRwTGluayIsIkFwb2xsb0xpbmsiLCJmcm9tIiwib25FcnJvciIsImVycm9yTGluayIsImdyYXBoUUxFcnJvcnMiLCJuZXR3b3JrRXJyb3IiLCJmb3JFYWNoIiwibWVzc2FnZSIsImxvY2F0aW9ucyIsInBhdGgiLCJjb25zb2xlIiwiZXJyb3IiLCJhdXRoTGluayIsIm9wZXJhdGlvbiIsImZvcndhcmQiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRDb250ZXh0IiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJodHRwTGluayIsInVyaSIsImNsaWVudCIsImNhY2hlIiwibGluayJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./config/apollo.js\n");

/***/ }),

/***/ "(pages-dir-node)/./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet/dist/leaflet.css */ \"(pages-dir-node)/./node_modules/leaflet/dist/leaflet.css\");\n/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/styles/globals.css */ \"(pages-dir-node)/./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_apollo_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/apollo.js */ \"(pages-dir-node)/./config/apollo.js\");\n\n\n\nconst { ApolloProvider } = __webpack_require__(/*! @apollo/client */ \"@apollo/client\");\n // Asegúrate de importar correctamente tu cliente\nfunction App({ Component, pageProps }) {\n    console.log(\"App component rendered\");\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ApolloProvider, {\n        client: _config_apollo_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\david.albino\\\\Desktop\\\\ARTISEARCHaa\\\\Artisearh-FULL-master\\\\src\\\\pages\\\\_app.js\",\n            lineNumber: 10,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\david.albino\\\\Desktop\\\\ARTISEARCHaa\\\\Artisearh-FULL-master\\\\src\\\\pages\\\\_app.js\",\n        lineNumber: 9,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFrQztBQUNKO0FBQzlCLE1BQU0sRUFBRUEsY0FBYyxFQUFFLEdBQUdDLG1CQUFPQSxDQUFDLHNDQUFnQjtBQUNQLENBQUUsaURBQWlEO0FBRWhGLFNBQVNFLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDbERDLFFBQVFDLEdBQUcsQ0FBQztJQUNaLHFCQUNFLDhEQUFDUDtRQUFlRSxRQUFRQSx5REFBTUE7a0JBQzVCLDRFQUFDRTtZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGRhdmlkLmFsYmlub1xcRGVza3RvcFxcQVJUSVNFQVJDSGFhXFxBcnRpc2VhcmgtRlVMTC1tYXN0ZXJcXHNyY1xccGFnZXNcXF9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwibGVhZmxldC9kaXN0L2xlYWZsZXQuY3NzXCI7XG5pbXBvcnQgXCJAL3N0eWxlcy9nbG9iYWxzLmNzc1wiO1xuY29uc3QgeyBBcG9sbG9Qcm92aWRlciB9ID0gcmVxdWlyZShcIkBhcG9sbG8vY2xpZW50XCIpO1xuaW1wb3J0IGNsaWVudCBmcm9tICcuLi8uLi9jb25maWcvYXBvbGxvLmpzJzsgIC8vIEFzZWfDunJhdGUgZGUgaW1wb3J0YXIgY29ycmVjdGFtZW50ZSB0dSBjbGllbnRlXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgY29uc29sZS5sb2coXCJBcHAgY29tcG9uZW50IHJlbmRlcmVkXCIpO1xuICByZXR1cm4gKFxuICAgIDxBcG9sbG9Qcm92aWRlciBjbGllbnQ9e2NsaWVudH0+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9BcG9sbG9Qcm92aWRlcj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJBcG9sbG9Qcm92aWRlciIsInJlcXVpcmUiLCJjbGllbnQiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJjb25zb2xlIiwibG9nIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "@apollo/client":
/*!*********************************!*\
  !*** external "@apollo/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/client");

/***/ }),

/***/ "@apollo/client/link/error":
/*!********************************************!*\
  !*** external "@apollo/client/link/error" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/client/link/error");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/leaflet"], () => (__webpack_exec__("(pages-dir-node)/./src/pages/_app.js")));
module.exports = __webpack_exports__;

})();