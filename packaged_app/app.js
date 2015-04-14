/*jslint browser: true, devel: true, maxlen: 80 */

(function () {
    'use strict';

    var mcc, greeting, addGreeting, addGreetings;

    // MCC = Mobile Country Code
    mcc = function (connection) {
        var network = connection.lastKnownHomeNetwork, codes;
        console.log(network);
        codes = network.split('-');
        return parseInt(codes[0], 10);
    };

    greeting = function (connection) {
        switch (mcc(connection)) {
        case 214:
            return '¡Hola mundo!';
        case 262:
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
