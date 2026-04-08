const isValidLettersSpacesHyphens = (str) => /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(str);

export const validators = {
  // Заголовок: только буквы, пробелы, дефисы
  title: (value) => {
    if (!value || value.trim() === "") {
      return { isValid: false, error: "Заголовок обязателен" };
    }
    if (!isValidLettersSpacesHyphens(value)) {
      return { isValid: false, error: "Только буквы, пробелы и дефисы" };
    }
    return { isValid: true, error: null };
  },

  // Подзаголовок: текст не более 300 знаков
  subtitle: (value) => {
    if (!value || value.trim() === "") {
      return { isValid: false, error: "Подзаголовок обязателен" };
    }
    if (value.length > 300) {
      return { isValid: false, error: "Не более 300 символов" };
    }
    return { isValid: true, error: null };
  },

  // Ссылка: без пробелов, без кавычек
  videoUrl: (value) => {
    if (!value || value.trim() === "") {
      return { isValid: false, error: "Ссылка обязательна" };
    }
    if (/\s/.test(value)) {
      return { isValid: false, error: "Ссылка не должна содержать пробелов" };
    }
    if (/["']/.test(value)) {
      return { isValid: false, error: "Ссылка не должна содержать кавычек" };
    }
    return { isValid: true, error: null };
  },

  // Кнопка: буквы, пробелы, дефисы, не более 30 знаков
  button: (value) => {
    if (!value || value.trim() === "") {
      return { isValid: false, error: "Название кнопки обязательно" };
    }
    if (!isValidLettersSpacesHyphens(value)) {
      return { isValid: false, error: "Только буквы, пробелы и дефисы" };
    }
    if (value.length > 30) {
      return { isValid: false, error: "Не более 30 символов" };
    }
    return { isValid: true, error: null };
  },

  // Файл: обязателен
  file: (file) => {
    if (!file) {
      return { isValid: false, error: "Файл обязателен" };
    }
    return { isValid: true, error: null };
  },

  // Изображение: обязательно
  image: (image) => {
    if (!image) {
      return { isValid: false, error: "Изображение обязательно" };
    }
    return { isValid: true, error: null };
  },
};

// Валидация всей формы видео-карточки
export const validateVideoCardForm = (values) => {
  const errors = {};
  let isValid = true;

  const titleCheck = validators.title(values.title);
  if (!titleCheck.isValid) {
    errors.title = titleCheck.error;
    isValid = false;
  }

  const subtitleCheck = validators.subtitle(values.subtitle);
  if (!subtitleCheck.isValid) {
    errors.subtitle = subtitleCheck.error;
    isValid = false;
  }

  const videoUrlCheck = validators.videoUrl(values.videoUrl);
  if (!videoUrlCheck.isValid) {
    errors.videoUrl = videoUrlCheck.error;
    isValid = false;
  }

  const buttonCheck = validators.button(values.button);
  if (!buttonCheck.isValid) {
    errors.button = buttonCheck.error;
    isValid = false;
  }

  const fileCheck = validators.file(values.file);
  if (!fileCheck.isValid) {
    errors.file = fileCheck.error;
    isValid = false;
  }

  return { isValid, errors };
};

// Валидация всей формы изображения-карточки
export const validateImageCardForm = (values) => {
  const errors = {};
  let isValid = true;

  const titleCheck = validators.title(values.title);
  if (!titleCheck.isValid) {
    errors.title = titleCheck.error;
    isValid = false;
  }

  const subtitleCheck = validators.subtitle(values.subtitle);
  if (!subtitleCheck.isValid) {
    errors.subtitle = subtitleCheck.error;
    isValid = false;
  }

  const imageCheck = validators.image(values.image);
  if (!imageCheck.isValid) {
    errors.image = imageCheck.error;
    isValid = false;
  }

  return { isValid, errors };
};