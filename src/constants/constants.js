export const httpMethods = {
    post: 'POST',
    get: 'GET',
    patch: 'PATCH',
    delete: 'DELETE',
    put: 'PUT',
}

export const phrases = {
    registerSuccess: 'Вы успешно зарегистрировались!',
    registerUnSuccess: 'Что-то пошло не так! Попробуйте ещё раз.',
    altSuccess: 'Успешная регистрация',
    altUnSuccess: 'Неуспешная регистрация',
    editProfileSuccess : 'Вы успешно отредактировали профиль!',
    editProfileUnSuccess : 'Что-то пошло не так! Попробуйте ещё раз.',
    altProfileSuccess: 'Успешное редактирование профиля',
    altProfileUnSuccess: 'Неуспешное редактирование профиля',
}

export const regularExpressions = {
    name: /^[А-ЯA-Zё\s\_\h-]+$/i,
    email: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
}