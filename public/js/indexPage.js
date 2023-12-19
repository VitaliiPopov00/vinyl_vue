function addDateItem(e) {
    e.preventDefault();

    if (document.querySelectorAll('.input__date__item').length < 5) {
        let newInputDate = document.createElement('li');

        newInputDate.className = 'input__date__item d-flex gap-15 flex-wrap-w';
        newInputDate.innerHTML = `<div class="d-flex flex-direction-c align-items-c">
                            <label for="date1">День проведения</label>
                            <input type="date" class="create__meet__input p-10 form-control is-invalid" name="date1" id="date1" value="2023-12-03" min="2023-12-03" max="2024-01-03" required>
                            <p class="invalid__feedback mt-5 align-self-fs">
                                Пример ошибки
                            </p>
                            <p class="valid__feedback mt-5 align-self-fs">
                            </p>
                        </div>
                        <div class="d-flex flex-direction-c align-items-c">
                            <label for="timeStart1">Начало</label>
                            <input type="time" class="create__meet__input p-10 form-control is-valid" name="timeStart1" id="timeStart1" value="09:00" required>
                            <p class="invalid__feedback mt-5 align-self-fs">
                            </p>
                            <p class="valid__feedbak mt-5 align-self-fs">
                                Всё круто!
                            </p>
                        </div>
                        <div class="d-flex flex-direction-c align-items-c">
                            <label for="timeEnd1">Конец</label>
                            <input type="time" class="create__meet__input p-10 form-control" name="timeEnd1" id="timeEnd1" value="20:00" required>
                            <p class="invalid__feedback mt-5 align-self-fs">
                            </p>
                            <p class="valid__feedbak mt-5 align-self-fs">
                            </p>
                        </div>
                        <div class="input__date__item__operations d-flex align-items-c gap-25">
                            <a href="#" data-delete-date>
                                <img src="./img/close.svg" alt="delete">
                            </a>
                            <a href="#" data-add-date>
                                <img src="./img/add.svg" alt="add">
                            </a>
                        </div>`;

        e.target.closest('.input__date__item').after(newInputDate);

        newInputDate
            .querySelector('a[data-delete-date]')
            .addEventListener('click', removeDateItem);
        newInputDate
            .querySelector('a[data-add-date]')
            .addEventListener('click', addDateItem);
    }
}

function removeDateItem(e) {
    e.preventDefault();

    if (document.querySelectorAll('a[data-delete-date]').length > 1) {
        e.target.closest('.input__date__item').remove();
    }
}

document
    .querySelector('a[data-add-date]')
    .addEventListener('click', addDateItem);

document
    .querySelector('a[data-delete-date]')
    .addEventListener('click', removeDateItem);
