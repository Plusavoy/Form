//Form

let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с Вами свяжемся!',
    failure: 'Что-то пошло не так...'
};

let form = document.querySelector('.main-form'),
    input = form.getElementsByClassName('input'),
    statusMessage = document.createElement('div'),
    formDown = document.getElementById('form');

    statusMessage.classList.add('status');

form.addEventListener('submit', function(event) {
    event.preventDefault(); //убирает стандартное поведение браузера(перезагрузку странницы при клике на отправку формы)
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    let formData = new FormData(form);

    let obj = {};
    formData.forEach(function(value, key) {
        obj[key] = value;
    });
    let json = JSON.stringify(obj);

    request.send(json);

    request.addEventListener('readystatechange', function() {
        if(request.readyState < 4) {
            statusMessage.innerHTML = message.loading;
        }else if(request.readyState === 4 && request.status == 200) {
            statusMessage.innerHTML = message.success;
        }else {
            statusMessage.innerHTML = message.failure;
        }
    });

    for(let i = 0; i < input.length; i++) {
        input[i].value = ' ';
    }

});