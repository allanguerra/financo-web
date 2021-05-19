export const REGEX = {
  PASSWORD: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/
};

export const SIZES = {
  MEDIUM_SCRREN_UP: 993
};

export const SESSION = {
  TOKEN: 'financo-token',
  ACTIVE_BOARD: 'active-board'
};

export const MASK = {
  CURRENCY: {
    mask: Number,
    scale: 2,
    thousandsSeparator: '.',
    padFractionalZeros: true,
    NormalizeZeros: true,
    radix: ',',
    mapToRadix: ['.']
  },
  INTEGER: {
    mask: Number,
    scale: 0,
    min: 0
  },
  EXPIRATION_DAY: {
    mask: Number,
    scale: 0,
    min: 1,
    max: 28
  }
};
