/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(function () {
    'use strict';

    var documentIsComplete, documentIsInteractive;

    // Return true once document has loaded, incl. sub-resources.
    documentIsComplete = function () {
        return document.readyState === 'complete';
    };

    // Returns true once document is finished parsing but possibly still
    // loading sub-resources.
    documentIsInteractive = function () {
        // Note that Android 2.3.5's standard browser uses `"loaded"` in place
        // of `"interactive"` as value for `readyState`. For discussion, see:
        //
        // <url:http://stackoverflow.com/questions/13348029/
        // values-for-document-readystate-in-android-2-3-browser>

        return (document.readyState === 'interactive' ||
                document.readyState === 'loaded' ||
                documentIsComplete());
    };

    return Object.create(null, {
        // Runs `onDocumentIsComplete` once document has loaded (incl.
        // sub-resources).
        onceDocumentIsComplete: {value: function (onDocumentIsComplete) {
            if (document.readyState === 'interactive' ||
                    document.readyState === 'complete') {
                onDocumentIsComplete();
            } else {
                window.addEventListener('load', onDocumentIsComplete, false);
            }
        }},

        // Runs `onDocumentIsInteractive` once document is finished parsing but
        // still loading sub-resources.
        onceDocumentIsInteractive: {value: function (onDocumentIsInteractive) {
            if (documentIsInteractive()) {
                onDocumentIsInteractive();
            } else {
                // `document.onreadystatechange` is not used as it doesn't fire
                // in Android 2.3.5's standard browser:
                //
                // <url:http://stackoverflow.com/questions/13346746/
                // document-readystate-on-domcontentloaded>
                window.addEventListener('DOMContentLoaded',
                                        onDocumentIsInteractive, false);
            }
        }},

        clear: {value: function (el) {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        }},

        // Returns position of element on viewport, in pixels.
        viewportPos: {value: function (el) {
            var rect = el.getBoundingClientRect();
            return [rect.left, rect.top];
        }},

        nop: {value: function () {
            return;
        }}
    });
});
