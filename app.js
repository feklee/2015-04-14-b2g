/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(['util'], function (util) {
    'use strict';

    util.onceDocumentIsInteractive(function () {
        window.alert('Hello!');
    });
});
