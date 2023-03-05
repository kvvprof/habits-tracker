export const getRandomPassword = (): string => {
  const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const UPPER_CASE = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  const LOWER_CASE = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const SYMBOLS = [
    '%',
    '*',
    ')',
    '(',
    '?',
    '@',
    '#',
    '$',
    '~',
    '&',
    '!',
    '+',
    '-',
    '_',
    ':',
    ';',
    '/',
  ];

  let index = 0;
  const password: string[] = [];

  while (index < 3) {
    password.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)]);
    password.push(UPPER_CASE[Math.floor(Math.random() * UPPER_CASE.length)]);
    password.push(LOWER_CASE[Math.floor(Math.random() * LOWER_CASE.length)]);
    password.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    index++;
  }

  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join('');
};
