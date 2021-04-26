const messages = {
  postMovieConflictErrorMessage: 'Этот фильм уже сохранен текущим пользователем',
  postUserConflictErrorMessage: 'Такой пользователь уже существует',
  postUserSuccessMessage: 'Пользователь создан!',
  deleteMovieforbiddenMessage: 'Нельзя удалить фильм, сохраненный другим пользователем',
  getMovienotFoundErrorMessage: 'Фильм с таким id не найден',
  getUsernotFoundErrorMessage: 'Пользователь с таким id не найден',
  unauthorizedMessage: 'Необходима авторизация',
  serverErrorMessage: 'На сервере произошла ошибка',
  routNotFoundErrorMessage: 'Запрашиваемый ресурс не найден',
  loginErrMessage: 'Неправильные почта или пароль',
  urlErrorMessage: 'унифицированный указатель ресурса (URL-адрес) начинается не с http:// или https:// или не указан домен',
  emailErrorMessage: 'Значение должно соответствовать схеме электронной почты',
};
module.exports = messages;
