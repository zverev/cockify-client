window.addEventListener('load', function () {
    var socket = io('server-cockify.rhcloud.com:8000');

    var body = document.querySelector('body');

    body.addEventListener('click', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        socket.emit('click', x, y);
    });

    socket.on('frame', function (frame) {
        render(body, frame);
    });
});

function createCircle(x, y) {
    var radius = 25;
    var el = document.createElement('div');
    el.className = 'circle';
    el.style.transform = 'translate3d(' + (x - radius) + 'px, ' + (y - radius) + 'px, 0px)';
    return el;
}

function render(el, frame) {
    el.innerHTML = '',
    frame.circles.map(function (circle) {
        var circleEl = createCircle(circle.x, circle.y);
        el.appendChild(circleEl);
    })
}

// window.addEventListener('load', function() {
//     var socket = new WebSocket("ws://server-cockify.rhcloud.com");
//
//     socket.onopen = function() {
//         console.log("Соединение установлено.");
//     };
//
//     socket.onclose = function(event) {
//         if (event.wasClean) {
//             console.log('Соединение закрыто чисто');
//         } else {
//             console.log('Обрыв соединения'); // например, "убит" процесс сервера
//         }
//         console.log('Код: ' + event.code + ' причина: ' + event.reason);
//     };
//
//     socket.onmessage = function(event) {
//         console.log("Получены данные " + event.data);
//     };
//
//     socket.onerror = function(error) {
//         console.log("Ошибка " + error.message);
//     };
// });
