'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchPostsAsync = fetchPostsAsync;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchPostsAsync(callback) {
    return (0, _isomorphicFetch2.default)('https://reactjsblueprints-newsapi.herokuapp.com/stories').then(function (response) {
        return response.json();
    }).then(function (data) {
        return callback(data);
    });
}