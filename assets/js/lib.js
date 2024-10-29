var domReady = (function () {
    var arrDomReadyCallBacks = [];

    function excuteDomReadyCallBacks() {
        for (var i = 0; i < arrDomReadyCallBacks.length; i++) {
            arrDomReadyCallBacks[i]();
        }
        arrDomReadyCallBacks = [];
    }

    return function (callback) {
        arrDomReadyCallBacks.push(callback);
        /* Mozilla, Chrome, Opera */
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', excuteDomReadyCallBacks, false);
        }
        /* Safari, iCab, Konqueror */
        if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
            browserTypeSet = true;
            var DOMLoadTimer = setInterval(function () {
                if (/loaded|complete/i.test(document.readyState)) {
                    //callback();
                    excuteDomReadyCallBacks();
                    clearInterval(DOMLoadTimer);
                }
            }, 10);
        }
        /* Other web browsers */

        window.onload = excuteDomReadyCallBacks;
    }
})();

function init() {
    fix_radios_checkboxes();
    set_location();
}

function fix_radios_checkboxes() {
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        var el = inputs[i];
        if ((el.type === 'checkbox' || el.type === 'radio') && el.id!=='toggle-menu') {
            var parent = el.parentNode;
            var clone = el.cloneNode();
            var label = document.createElement('label');
            label.appendChild(clone);
            label.appendChild(document.createElement('span'));
            label.className = el.type;
            parent.replaceChild(label, el);
        }
    }
}

function set_location() {
    var els = document.getElementsByClassName("rest_in_piss");
    for (var i = 0; i < els.length; i++) {
        els[0].setAttribute("src", els[0].getAttribute('src') + '?' + Math.round(Math.random() * 1000));
    }
}

domReady(init);