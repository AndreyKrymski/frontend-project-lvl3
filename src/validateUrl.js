import * as yup from 'yup';

export default function validateUrl(link, state, i18nextInstance) {
  yup.setLocale({
    mixed: {
      notOneOf: () => i18nextInstance.t('errors.errorsDuplication'),
    },
    string: {
      url: () => i18nextInstance.t('errors.errorsUrl'),
    },
  });
  const schema = yup.string().url().notOneOf(state.url);
  return schema.validate(link);
}
