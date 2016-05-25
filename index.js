'use strict';

var request = require('superagent');
var EventEmitter = require('super-event-emitter');

function ajax(url) {
    request
        .get(url)
        .end(function(err, res){
            if (err || !res.ok) {
                ajax.emit('error');
            } else {
                ajax.emit('success');
            }
        });
}

EventEmitter.mixin(ajax);

// ---------------------------------------------------------------------------

function userHelper() {
    ajax.once('success', (response) => {
        console.log('loadUserProfile(response)');
    });
    ajax.once('error', () => {
        console.log('loadFailUserPage()');
    });
    ajax('/');
}

function categoryHelper() {
    ajax.once('success', (response) => {
        console.log('loadCategory(response)');
    });
    ajax.once('error', () => {
        console.log('laodErrorCategoryPage()');
    });
    ajax('/error');
}

// Emulate real conditions
// Full of asynchronymous.
// ---------------------------------------------------------------------------

setTimeout(() => {
    userHelper();
}, 1000);

setTimeout(() => {
    categoryHelper();
}, 4000);
