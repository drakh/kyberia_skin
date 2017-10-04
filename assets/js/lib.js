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
}

function fix_radios_checkboxes() {
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        var el = inputs[i];
        if (el.type === 'checkbox' || el.type === 'radio') {
            console.log(el);
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

domReady(init);