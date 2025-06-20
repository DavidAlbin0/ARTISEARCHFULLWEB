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
exports.id = "pages/_error";
exports.ids = ["pages/_error"];
exports.modules = {

/***/ "(pages-dir-node)/./config/apollo.js":
/*!**************************!*\
  !*** ./config/apollo.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @apollo/client */ \"@apollo/client\");\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _apollo_client_link_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/client/link/error */ \"@apollo/client/link/error\");\n/* harmony import */ var _apollo_client_link_error__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client_link_error__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// Link para manejar errores\nconst errorLink = (0,_apollo_client_link_error__WEBPACK_IMPORTED_MODULE_1__.onError)(({ graphQLErrors, networkError })=>{\n    if (graphQLErrors) {\n        graphQLErrors.forEach(({ message, locations, path })=>{\n            console.error(`[GraphQL error]: Mensaje: ${message}, Path: ${path}`);\n        });\n    }\n    if (networkError) {\n        console.error(`[Network error]: ${networkError}`);\n    }\n});\n// Link para manejar la autenticación (añadir el token)\nconst authLink = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloLink((operation, forward)=>{\n    const token = localStorage.getItem('token'); // Suponiendo que guardas el token en localStorage\n    if (token) {\n        operation.setContext({\n            headers: {\n                Authorization: `Bearer ${token}`\n            }\n        });\n    }\n    return forward(operation);\n});\n// Link para la solicitud HTTP a tu servidor de GraphQL\nconst httpLink = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.HttpLink({\n    uri: 'http://localhost:4000/'\n});\n// Configuración del cliente de Apollo\nconst client = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloClient({\n    cache: new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.InMemoryCache(),\n    link: (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.from)([\n        errorLink,\n        authLink,\n        httpLink\n    ])\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (client);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbmZpZy9hcG9sbG8uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBeUY7QUFDckM7QUFFcEQsNEJBQTRCO0FBQzVCLE1BQU1NLFlBQVlELGtFQUFPQSxDQUFDLENBQUMsRUFBRUUsYUFBYSxFQUFFQyxZQUFZLEVBQUU7SUFDeEQsSUFBSUQsZUFBZTtRQUNqQkEsY0FBY0UsT0FBTyxDQUFDLENBQUMsRUFBRUMsT0FBTyxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRTtZQUNqREMsUUFBUUMsS0FBSyxDQUFDLENBQUMsMEJBQTBCLEVBQUVKLFFBQVEsUUFBUSxFQUFFRSxNQUFNO1FBQ3JFO0lBQ0Y7SUFFQSxJQUFJSixjQUFjO1FBQ2hCSyxRQUFRQyxLQUFLLENBQUMsQ0FBQyxpQkFBaUIsRUFBRU4sY0FBYztJQUNsRDtBQUNGO0FBRUEsdURBQXVEO0FBQ3ZELE1BQU1PLFdBQVcsSUFBSVosc0RBQVVBLENBQUMsQ0FBQ2EsV0FBV0M7SUFDMUMsTUFBTUMsUUFBUUMsYUFBYUMsT0FBTyxDQUFDLFVBQVUsa0RBQWtEO0lBRS9GLElBQUlGLE9BQU87UUFDVEYsVUFBVUssVUFBVSxDQUFDO1lBQ25CQyxTQUFTO2dCQUNQQyxlQUFlLENBQUMsT0FBTyxFQUFFTCxPQUFPO1lBQ2xDO1FBQ0Y7SUFDRjtJQUVBLE9BQU9ELFFBQVFEO0FBQ2pCO0FBRUEsdURBQXVEO0FBQ3ZELE1BQU1RLFdBQVcsSUFBSXRCLG9EQUFRQSxDQUFDO0lBQzFCdUIsS0FBSztBQUdUO0FBRUEsc0NBQXNDO0FBQ3RDLE1BQU1DLFNBQVMsSUFBSTFCLHdEQUFZQSxDQUFDO0lBQzlCMkIsT0FBTyxJQUFJMUIseURBQWFBO0lBQ3hCMkIsTUFBTXhCLG9EQUFJQSxDQUFDO1FBQUNFO1FBQVdTO1FBQVVTO0tBQVM7QUFDNUM7QUFFQSxpRUFBZUUsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxkYXZpZC5hbGJpbm9cXERlc2t0b3BcXEFSVElTRUFSQ0hhYVxcQXJ0aXNlYXJoLUZVTEwtbWFzdGVyXFxjb25maWdcXGFwb2xsby5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcG9sbG9DbGllbnQsIEluTWVtb3J5Q2FjaGUsIEh0dHBMaW5rLCBBcG9sbG9MaW5rLCBmcm9tIH0gZnJvbSAnQGFwb2xsby9jbGllbnQnO1xuaW1wb3J0IHsgb25FcnJvciB9IGZyb20gJ0BhcG9sbG8vY2xpZW50L2xpbmsvZXJyb3InO1xuXG4vLyBMaW5rIHBhcmEgbWFuZWphciBlcnJvcmVzXG5jb25zdCBlcnJvckxpbmsgPSBvbkVycm9yKCh7IGdyYXBoUUxFcnJvcnMsIG5ldHdvcmtFcnJvciB9KSA9PiB7XG4gIGlmIChncmFwaFFMRXJyb3JzKSB7XG4gICAgZ3JhcGhRTEVycm9ycy5mb3JFYWNoKCh7IG1lc3NhZ2UsIGxvY2F0aW9ucywgcGF0aCB9KSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGBbR3JhcGhRTCBlcnJvcl06IE1lbnNhamU6ICR7bWVzc2FnZX0sIFBhdGg6ICR7cGF0aH1gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChuZXR3b3JrRXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGBbTmV0d29yayBlcnJvcl06ICR7bmV0d29ya0Vycm9yfWApO1xuICB9XG59KTtcblxuLy8gTGluayBwYXJhIG1hbmVqYXIgbGEgYXV0ZW50aWNhY2nDs24gKGHDsWFkaXIgZWwgdG9rZW4pXG5jb25zdCBhdXRoTGluayA9IG5ldyBBcG9sbG9MaW5rKChvcGVyYXRpb24sIGZvcndhcmQpID0+IHtcbiAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTsgLy8gU3Vwb25pZW5kbyBxdWUgZ3VhcmRhcyBlbCB0b2tlbiBlbiBsb2NhbFN0b3JhZ2VcblxuICBpZiAodG9rZW4pIHtcbiAgICBvcGVyYXRpb24uc2V0Q29udGV4dCh7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLCAvLyBBZ3JlZ2Ftb3MgZWwgdG9rZW4gZW4gbG9zIGhlYWRlcnMgZGUgbGEgc29saWNpdHVkXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGZvcndhcmQob3BlcmF0aW9uKTtcbn0pO1xuXG4vLyBMaW5rIHBhcmEgbGEgc29saWNpdHVkIEhUVFAgYSB0dSBzZXJ2aWRvciBkZSBHcmFwaFFMXG5jb25zdCBodHRwTGluayA9IG5ldyBIdHRwTGluayh7XG4gICAgdXJpOiAnaHR0cDovL2xvY2FsaG9zdDo0MDAwLycsIC8vIHR1IGVuZHBvaW50IGRlIEdyYXBoUUxcbiAgICAvL3VyaTogJ2h0dHA6Ly8xMC4xMjEuMS4xNDM6NDAwMC9ncmFwaHFsJywgLy8gdHUgZW5kcG9pbnQgZGUgR3JhcGhRTFxuICAgIC8vdXJpOiAnL2dyYXBocWwnLCAvLyB0dSBlbmRwb2ludCBkZSBHcmFwaFFMXG59KTtcblxuLy8gQ29uZmlndXJhY2nDs24gZGVsIGNsaWVudGUgZGUgQXBvbGxvXG5jb25zdCBjbGllbnQgPSBuZXcgQXBvbGxvQ2xpZW50KHtcbiAgY2FjaGU6IG5ldyBJbk1lbW9yeUNhY2hlKCksXG4gIGxpbms6IGZyb20oW2Vycm9yTGluaywgYXV0aExpbmssIGh0dHBMaW5rXSksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xpZW50O1xuIl0sIm5hbWVzIjpbIkFwb2xsb0NsaWVudCIsIkluTWVtb3J5Q2FjaGUiLCJIdHRwTGluayIsIkFwb2xsb0xpbmsiLCJmcm9tIiwib25FcnJvciIsImVycm9yTGluayIsImdyYXBoUUxFcnJvcnMiLCJuZXR3b3JrRXJyb3IiLCJmb3JFYWNoIiwibWVzc2FnZSIsImxvY2F0aW9ucyIsInBhdGgiLCJjb25zb2xlIiwiZXJyb3IiLCJhdXRoTGluayIsIm9wZXJhdGlvbiIsImZvcndhcmQiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRDb250ZXh0IiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJodHRwTGluayIsInVyaSIsImNsaWVudCIsImNhY2hlIiwibGluayJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./config/apollo.js\n");

/***/ }),

/***/ "(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F_error&preferredRegion=&absolutePagePath=private-next-pages%2F_error&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F_error&preferredRegion=&absolutePagePath=private-next-pages%2F_error&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   getServerSideProps: () => (/* binding */ getServerSideProps),\n/* harmony export */   getStaticPaths: () => (/* binding */ getStaticPaths),\n/* harmony export */   getStaticProps: () => (/* binding */ getStaticProps),\n/* harmony export */   reportWebVitals: () => (/* binding */ reportWebVitals),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   unstable_getServerProps: () => (/* binding */ unstable_getServerProps),\n/* harmony export */   unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),\n/* harmony export */   unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),\n/* harmony export */   unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),\n/* harmony export */   unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/pages/module.compiled */ \"(pages-dir-node)/./node_modules/next/dist/server/route-modules/pages/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(pages-dir-node)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(pages-dir-node)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! private-next-pages/_document */ \"(pages-dir-node)/./src/pages/_document.js\");\n/* harmony import */ var private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! private-next-pages/_app */ \"(pages-dir-node)/./src/pages/_app.js\");\n/* harmony import */ var private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! private-next-pages/_error */ \"(pages-dir-node)/./node_modules/next/dist/pages/_error.js\");\n/* harmony import */ var private_next_pages_error__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n// Import the app and document modules.\n\n\n// Import the userland code.\n\n// Re-export the component (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'default'));\n// Re-export methods.\nconst getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'getStaticProps');\nconst getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'getStaticPaths');\nconst getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'getServerSideProps');\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'config');\nconst reportWebVitals = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'reportWebVitals');\n// Re-export legacy methods.\nconst unstable_getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticProps');\nconst unstable_getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticPaths');\nconst unstable_getStaticParams = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticParams');\nconst unstable_getServerProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerProps');\nconst unstable_getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerSideProps');\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES,\n        page: \"/_error\",\n        pathname: \"/_error\",\n        // The following aren't used in production.\n        bundlePath: '',\n        filename: ''\n    },\n    components: {\n        // default export might not exist when optimized for data only\n        App: private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n        Document: private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n    },\n    userland: private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__\n});\n\n//# sourceMappingURL=pages.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtcm91dGUtbG9hZGVyL2luZGV4LmpzP2tpbmQ9UEFHRVMmcGFnZT0lMkZfZXJyb3ImcHJlZmVycmVkUmVnaW9uPSZhYnNvbHV0ZVBhZ2VQYXRoPXByaXZhdGUtbmV4dC1wYWdlcyUyRl9lcnJvciZhYnNvbHV0ZUFwcFBhdGg9cHJpdmF0ZS1uZXh0LXBhZ2VzJTJGX2FwcCZhYnNvbHV0ZURvY3VtZW50UGF0aD1wcml2YXRlLW5leHQtcGFnZXMlMkZfZG9jdW1lbnQmbWlkZGxld2FyZUNvbmZpZ0Jhc2U2ND1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdGO0FBQ2hDO0FBQ0U7QUFDMUQ7QUFDeUQ7QUFDVjtBQUMvQztBQUNzRDtBQUN0RDtBQUNBLGlFQUFlLHdFQUFLLENBQUMscURBQVEsWUFBWSxFQUFDO0FBQzFDO0FBQ08sdUJBQXVCLHdFQUFLLENBQUMscURBQVE7QUFDckMsdUJBQXVCLHdFQUFLLENBQUMscURBQVE7QUFDckMsMkJBQTJCLHdFQUFLLENBQUMscURBQVE7QUFDekMsZUFBZSx3RUFBSyxDQUFDLHFEQUFRO0FBQzdCLHdCQUF3Qix3RUFBSyxDQUFDLHFEQUFRO0FBQzdDO0FBQ08sZ0NBQWdDLHdFQUFLLENBQUMscURBQVE7QUFDOUMsZ0NBQWdDLHdFQUFLLENBQUMscURBQVE7QUFDOUMsaUNBQWlDLHdFQUFLLENBQUMscURBQVE7QUFDL0MsZ0NBQWdDLHdFQUFLLENBQUMscURBQVE7QUFDOUMsb0NBQW9DLHdFQUFLLENBQUMscURBQVE7QUFDekQ7QUFDTyx3QkFBd0Isa0dBQWdCO0FBQy9DO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhLDhEQUFXO0FBQ3hCLGtCQUFrQixtRUFBZ0I7QUFDbEMsS0FBSztBQUNMLFlBQVk7QUFDWixDQUFDOztBQUVEIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnZXNSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvcGFnZXMvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBob2lzdCB9IGZyb20gXCJuZXh0L2Rpc3QvYnVpbGQvdGVtcGxhdGVzL2hlbHBlcnNcIjtcbi8vIEltcG9ydCB0aGUgYXBwIGFuZCBkb2N1bWVudCBtb2R1bGVzLlxuaW1wb3J0ICogYXMgZG9jdW1lbnQgZnJvbSBcInByaXZhdGUtbmV4dC1wYWdlcy9fZG9jdW1lbnRcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwicHJpdmF0ZS1uZXh0LXBhZ2VzL19hcHBcIjtcbi8vIEltcG9ydCB0aGUgdXNlcmxhbmQgY29kZS5cbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJwcml2YXRlLW5leHQtcGFnZXMvX2Vycm9yXCI7XG4vLyBSZS1leHBvcnQgdGhlIGNvbXBvbmVudCAoc2hvdWxkIGJlIHRoZSBkZWZhdWx0IGV4cG9ydCkuXG5leHBvcnQgZGVmYXVsdCBob2lzdCh1c2VybGFuZCwgJ2RlZmF1bHQnKTtcbi8vIFJlLWV4cG9ydCBtZXRob2RzLlxuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1Byb3BzID0gaG9pc3QodXNlcmxhbmQsICdnZXRTdGF0aWNQcm9wcycpO1xuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1BhdGhzID0gaG9pc3QodXNlcmxhbmQsICdnZXRTdGF0aWNQYXRocycpO1xuZXhwb3J0IGNvbnN0IGdldFNlcnZlclNpZGVQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAnZ2V0U2VydmVyU2lkZVByb3BzJyk7XG5leHBvcnQgY29uc3QgY29uZmlnID0gaG9pc3QodXNlcmxhbmQsICdjb25maWcnKTtcbmV4cG9ydCBjb25zdCByZXBvcnRXZWJWaXRhbHMgPSBob2lzdCh1c2VybGFuZCwgJ3JlcG9ydFdlYlZpdGFscycpO1xuLy8gUmUtZXhwb3J0IGxlZ2FjeSBtZXRob2RzLlxuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFN0YXRpY1Byb3BzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTdGF0aWNQcm9wcycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFN0YXRpY1BhdGhzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTdGF0aWNQYXRocycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFN0YXRpY1BhcmFtcyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U3RhdGljUGFyYW1zJyk7XG5leHBvcnQgY29uc3QgdW5zdGFibGVfZ2V0U2VydmVyUHJvcHMgPSBob2lzdCh1c2VybGFuZCwgJ3Vuc3RhYmxlX2dldFNlcnZlclByb3BzJyk7XG5leHBvcnQgY29uc3QgdW5zdGFibGVfZ2V0U2VydmVyU2lkZVByb3BzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTZXJ2ZXJTaWRlUHJvcHMnKTtcbi8vIENyZWF0ZSBhbmQgZXhwb3J0IHRoZSByb3V0ZSBtb2R1bGUgdGhhdCB3aWxsIGJlIGNvbnN1bWVkLlxuZXhwb3J0IGNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IFBhZ2VzUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLlBBR0VTLFxuICAgICAgICBwYWdlOiBcIi9fZXJyb3JcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL19lcnJvclwiLFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGFyZW4ndCB1c2VkIGluIHByb2R1Y3Rpb24uXG4gICAgICAgIGJ1bmRsZVBhdGg6ICcnLFxuICAgICAgICBmaWxlbmFtZTogJydcbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgLy8gZGVmYXVsdCBleHBvcnQgbWlnaHQgbm90IGV4aXN0IHdoZW4gb3B0aW1pemVkIGZvciBkYXRhIG9ubHlcbiAgICAgICAgQXBwOiBhcHAuZGVmYXVsdCxcbiAgICAgICAgRG9jdW1lbnQ6IGRvY3VtZW50LmRlZmF1bHRcbiAgICB9LFxuICAgIHVzZXJsYW5kXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZXMuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F_error&preferredRegion=&absolutePagePath=private-next-pages%2F_error&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(pages-dir-node)/./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet/dist/leaflet.css */ \"(pages-dir-node)/./node_modules/leaflet/dist/leaflet.css\");\n/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/styles/globals.css */ \"(pages-dir-node)/./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_apollo_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/apollo.js */ \"(pages-dir-node)/./config/apollo.js\");\n\n\n\nconst { ApolloProvider } = __webpack_require__(/*! @apollo/client */ \"@apollo/client\");\n // Asegúrate de importar correctamente tu cliente\nfunction App({ Component, pageProps }) {\n    console.log(\"App component rendered\");\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ApolloProvider, {\n        client: _config_apollo_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\david.albino\\\\Desktop\\\\ARTISEARCHaa\\\\Artisearh-FULL-master\\\\src\\\\pages\\\\_app.js\",\n            lineNumber: 10,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\david.albino\\\\Desktop\\\\ARTISEARCHaa\\\\Artisearh-FULL-master\\\\src\\\\pages\\\\_app.js\",\n        lineNumber: 9,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFrQztBQUNKO0FBQzlCLE1BQU0sRUFBRUEsY0FBYyxFQUFFLEdBQUdDLG1CQUFPQSxDQUFDLHNDQUFnQjtBQUNQLENBQUUsaURBQWlEO0FBRWhGLFNBQVNFLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDbERDLFFBQVFDLEdBQUcsQ0FBQztJQUNaLHFCQUNFLDhEQUFDUDtRQUFlRSxRQUFRQSx5REFBTUE7a0JBQzVCLDRFQUFDRTtZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGRhdmlkLmFsYmlub1xcRGVza3RvcFxcQVJUSVNFQVJDSGFhXFxBcnRpc2VhcmgtRlVMTC1tYXN0ZXJcXHNyY1xccGFnZXNcXF9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwibGVhZmxldC9kaXN0L2xlYWZsZXQuY3NzXCI7XG5pbXBvcnQgXCJAL3N0eWxlcy9nbG9iYWxzLmNzc1wiO1xuY29uc3QgeyBBcG9sbG9Qcm92aWRlciB9ID0gcmVxdWlyZShcIkBhcG9sbG8vY2xpZW50XCIpO1xuaW1wb3J0IGNsaWVudCBmcm9tICcuLi8uLi9jb25maWcvYXBvbGxvLmpzJzsgIC8vIEFzZWfDunJhdGUgZGUgaW1wb3J0YXIgY29ycmVjdGFtZW50ZSB0dSBjbGllbnRlXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgY29uc29sZS5sb2coXCJBcHAgY29tcG9uZW50IHJlbmRlcmVkXCIpO1xuICByZXR1cm4gKFxuICAgIDxBcG9sbG9Qcm92aWRlciBjbGllbnQ9e2NsaWVudH0+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9BcG9sbG9Qcm92aWRlcj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJBcG9sbG9Qcm92aWRlciIsInJlcXVpcmUiLCJjbGllbnQiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJjb25zb2xlIiwibG9nIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./src/pages/_document.js":
/*!********************************!*\
  !*** ./src/pages/_document.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Document)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ \"(pages-dir-node)/./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/script */ \"(pages-dir-node)/./node_modules/next/script.js\");\n/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_script__WEBPACK_IMPORTED_MODULE_2__);\n// pages/_document.js\n\n\n\nfunction Document() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                    rel: \"stylesheet\",\n                    href: \"https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\david.albino\\\\Desktop\\\\ARTISEARCHaa\\\\Artisearh-FULL-master\\\\src\\\\pages\\\\_document.js\",\n                    lineNumber: 9,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\david.albino\\\\Desktop\\\\ARTISEARCHaa\\\\Artisearh-FULL-master\\\\src\\\\pages\\\\_document.js\",\n                lineNumber: 8,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\david.albino\\\\Desktop\\\\ARTISEARCHaa\\\\Artisearh-FULL-master\\\\src\\\\pages\\\\_document.js\",\n                        lineNumber: 12,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\david.albino\\\\Desktop\\\\ARTISEARCHaa\\\\Artisearh-FULL-master\\\\src\\\\pages\\\\_document.js\",\n                        lineNumber: 13,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_2___default()), {\n                        src: \"https://cdn.tailwindcss.com\",\n                        strategy: \"beforeInteractive\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\david.albino\\\\Desktop\\\\ARTISEARCHaa\\\\Artisearh-FULL-master\\\\src\\\\pages\\\\_document.js\",\n                        lineNumber: 14,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\david.albino\\\\Desktop\\\\ARTISEARCHaa\\\\Artisearh-FULL-master\\\\src\\\\pages\\\\_document.js\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\david.albino\\\\Desktop\\\\ARTISEARCHaa\\\\Artisearh-FULL-master\\\\src\\\\pages\\\\_document.js\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9wYWdlcy9fZG9jdW1lbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFxQjs7QUFDd0M7QUFDNUI7QUFFbEIsU0FBU0s7SUFDdEIscUJBQ0UsOERBQUNMLCtDQUFJQTs7MEJBQ0gsOERBQUNDLCtDQUFJQTswQkFDSCw0RUFBQ0s7b0JBQUtDLEtBQUk7b0JBQWFDLE1BQUs7Ozs7Ozs7Ozs7OzBCQUU5Qiw4REFBQ0M7O2tDQUNDLDhEQUFDUCwrQ0FBSUE7Ozs7O2tDQUNMLDhEQUFDQyxxREFBVUE7Ozs7O2tDQUNYLDhEQUFDQyxvREFBTUE7d0JBQUNNLEtBQUk7d0JBQThCQyxVQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJM0QiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZGF2aWQuYWxiaW5vXFxEZXNrdG9wXFxBUlRJU0VBUkNIYWFcXEFydGlzZWFyaC1GVUxMLW1hc3Rlclxcc3JjXFxwYWdlc1xcX2RvY3VtZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL19kb2N1bWVudC5qc1xuaW1wb3J0IHsgSHRtbCwgSGVhZCwgTWFpbiwgTmV4dFNjcmlwdCB9IGZyb20gJ25leHQvZG9jdW1lbnQnO1xuaW1wb3J0IFNjcmlwdCBmcm9tICduZXh0L3NjcmlwdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERvY3VtZW50KCkge1xuICByZXR1cm4gKFxuICAgIDxIdG1sPlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvbm9ybWFsaXplLzguMC4xL25vcm1hbGl6ZS5taW4uY3NzXCIgLz5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxib2R5PlxuICAgICAgICA8TWFpbiAvPlxuICAgICAgICA8TmV4dFNjcmlwdCAvPlxuICAgICAgICA8U2NyaXB0IHNyYz1cImh0dHBzOi8vY2RuLnRhaWx3aW5kY3NzLmNvbVwiIHN0cmF0ZWd5PVwiYmVmb3JlSW50ZXJhY3RpdmVcIiAvPlxuICAgICAgPC9ib2R5PlxuICAgIDwvSHRtbD5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJIdG1sIiwiSGVhZCIsIk1haW4iLCJOZXh0U2NyaXB0IiwiU2NyaXB0IiwiRG9jdW1lbnQiLCJsaW5rIiwicmVsIiwiaHJlZiIsImJvZHkiLCJzcmMiLCJzdHJhdGVneSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/_document.js\n");

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

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/leaflet"], () => (__webpack_exec__("(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F_error&preferredRegion=&absolutePagePath=private-next-pages%2F_error&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();