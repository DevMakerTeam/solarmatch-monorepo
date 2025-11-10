/* eslint-disable no-useless-escape */
export const REGEX = {
  ID: /^[A-Za-z\d]{4,16}$/,

  PHONE_VERIFICATION_CODE: /^\d+$/g,

  BIRTHDATE: {
    FORMAT: /^\d{4}-\d{2}-\d{2}$/,
    DETAIL_FORMAT: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
  },

  NICKNAME: /^[0-9a-zA-Z가-힣]+$/,

  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,

  PHONE: /^010-(\d){4}-(\d){4}$/,

  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[^\s]{8,16}$/,

  EMAIL_VERIFICATION_CODE: /^\d+$/g,

  USERNAME: /^[0-9a-zA-Z가-힣]+$/,

  NUMBER: /^\d+$/g,

  SPECIAL_CHARACTER: /[!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/~`]/,

  POSTCODE: {
    COMMON: /[0-9\-]{5}/,
    EXCEPT_HYPHEN: /[^\w\s\-]/,
  },

  NAME: /^[가-힣]{2,4}$/,
};
