/*jslint browser: true, devel: true, maxlen: 80 */

(function () {
    'use strict';

    var greeting, addGreeting, addGreetings;

    greeting = function (connection) {
        var network = connection.lastKnownHomeNetwork,
            codes = network.split('-'),
            mcc = codes[0]; // mobile country code

        console.log(network);

        switch (mcc) {
        case '214':
            return '¡Hola mundo!';
        case '262':
            return 'Hallo Welt!';
        default:
            return 'Hello world!';
        }
    };

    addGreeting = function (connection) {
        var element = document.createElement("p");
        element.textContent = greeting(connection);
        document.body.appendChild(element);
    };

    addGreetings = function (connections) {
        var i;
        for (i = 0; i < connections.length; i += 1) {
            addGreeting(connections[i]);
        }
    };

    addGreetings(navigator.mozMobileConnections);
}());
