import { addErrorInput } from "./product_card_function.js";

$('.register_form>input').on('input', function (e) {
    $(this).removeClass('error').next().text('');
});

$('.register_button').on('click', function (e) {
    e.preventDefault();
    let formValue = $(this).parent().serialize().split('&').map(value => value.split('='));
    let login = formValue.filter(value => { return value.indexOf('login') != -1 ? true : false })[0][1];
    let email = formValue.filter(value => { return value.indexOf('email') != -1 ? true : false })[0][1].replace('%40', '@');
    let password = formValue.filter(value => { return value.indexOf('password') != -1 ? true : false })[0][1];
    let password_repeat = formValue.filter(value => { return value.indexOf('password_repeat') != -1 ? true : false })[0][1];
    let errors = [];

    fetch('../database/users.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (!login) {
                errors.push({ message: "Заполните поле", attributeName: "login" });
            }

            if (!email) {
                errors.push({ message: "Заполните поле", attributeName: "email" });
            }

            if (!password) {
                errors.push({ message: "Заполните поле", attributeName: "password" });
            }

            if (password && !password_repeat) {
                errors.push({ message: "Заполните поле", attributeName: "password_repeat" });
            }

            if (!errors.length) {
                if (password != password_repeat) {
                    errors.push({ message: "Пароли не совпадают", attributeName: "password_repeat" });
                } else {
                    let userByLogin = data.filter(user => {
                        return user.login == login ? true : false;
                    });
                    let userByEmail = data.filter(user => {
                        return user.email == email ? true : false;
                    });

                    if (userByEmail.length) {
                        errors.push({ message: "Пользователь с такой почтой уже существует", attributeName: "email" });
                    }

                    if (userByLogin.length) {
                        errors.push({ message: "Пользователь с таким логином уже существует", attributeName: "login" });
                    }
                }
            }

            if (errors.length) {
                throw errors;
            }
        })
        .catch(addErrorInput);
});