import { addErrorInput } from "./product_card_function.js";

$('.login_form>input').on('input', function (e) {
    $(this).removeClass('error').next().text('');
});

$('.login_button').on('click', function (e) {
    e.preventDefault();
    let formValue = $(this).parent().serialize().split('&').map(value => value.split('='));
    let login = formValue.filter(value => { return value.indexOf('login') != -1 ? true : false })[0][1];
    let password = formValue.filter(value => { return value.indexOf('password') != -1 ? true : false })[0][1];
    let errors = [];

    fetch('../database/users.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (!login) {
                errors.push({ message: "Заполните поле", attributeName: "login" });
            }

            if (!password) {
                errors.push({ message: "Заполните поле", attributeName: "password" });
            }

            if (!errors.length) {
                let user = data.filter(user => {
                    return user.login == login ? true : false;
                });

                if (user.length) {
                    if (user[0].password == password) {
                        sessionStorage.setItem('login', login);
                        window.location = 'index.html';
                    } else {
                        errors.push({ message: "Пароль введен неверно", attributeName: "password" });
                    }
                } else {
                    errors.push({ message: "Пользователь не найден", attributeName: "login" });
                }
            }

            if (errors.length) {
                throw errors;
            }
        })
        .catch(addErrorInput);
});