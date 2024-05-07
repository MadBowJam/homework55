console.log('#57. JavaScript homework example file')

/*
 *
 * #1
 *
 * Технічне завдання для розробки функції "generateHash"
 *
 * Задача:
 * Розробити функцію, що використовує криптографічний алгоритм SHA-256 для генерації хешу з заданого рядка. Функція має бути реалізована так, щоб її можна було легко тестувати, забезпечувати точність та безпеку генерації хешу.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *  - `input`: Рядок, який потрібно хешувати.
 *
 * 2. Вихідні дані:
 *  - Функція повертає хеш заданого рядка у форматі шістнадцяткового рядка.
 *
 * 3. Безпека:
 *  - Використання криптографічно стійкого алгоритму SHA-256.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), включаючи модулі ESM для легкої інтеграції та тестування.
 * - Функція має бути написана таким чином, щоб вона могла бути експортована та використана в інших частинах програми або тестових сценаріях.
 * - Забезпечення документації коду з описом параметрів, процесу роботи та прикладами використання.
 * - Підготовка функції для можливості легкого мокування та тестування за допомогою JEST.
 *
 */
import crypto from 'crypto';
function generateHash(input) {
  const hash = crypto.createHash('sha256').update(input).digest('hex');
  return hash;
}

// console.log(generateHash('Hello, World!'))

/*
 *
 * #2
 *
 * Технічне завдання для розробки функції "generatePasswordHash"
 *
 * Задача:
 * Розробити функцію, що використовує PBKDF2 алгоритм для генерації хешу паролю з використанням сілі. Функція повинна забезпечити високий рівень безпеки збережених паролів і бути легкою для тестування та інтеграції в більші системи.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *  - `password`: Рядок пароля, який потрібно захешувати.
 *  - `salt`: Сіль, яка використовується для генерації хешу, має бути у форматі рядка.
 *  - `iterations`: Кількість ітерацій хешування (дефолтне значення 10000).
 *  - `keylen`: Довжина ключа у байтах (дефолтне значення 64).
 *  - `digest`: Алгоритм хешування (дефолтне значення 'sha512').
 *
 * 2. Вихідні дані:
 *  - Функція повертає хеш заданого пароля у форматі шістнадцяткового рядка.
 *
 * 3. Безпека:
 *  - Використання алгоритму PBKDF2 для забезпечення стійкості до атак брутфорсом і rainbow tables.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), включаючи модулі ESM для легкої інтеграції та тестування.
 * - Код має бути чистим, добре структурованим, з логічною структурою та зрозумілими назвами змінних та функцій.
 * - Підготовка функції для легкої інтеграції у тести, використовуючи JEST для мокування залежностей і перевірки поведінки функції.
 *
 */
import { pbkdf2Sync } from 'crypto';

function generatePasswordHash(password, salt, iterations = 10000, keylen = 64, digest = 'sha512') {
  const derivedKey = pbkdf2Sync(password, salt, iterations, keylen, digest);
  return derivedKey.toString('hex');
}

// Застосування функції
// const password = 'superSecret123'
// const salt = randomBytes(16).toString('hex')
// const hash = generatePasswordHash(password, salt)

/*
 *
 * #3
 *
 * Технічне завдання для розробки функції "verifyPassword"
 *
 * Задача:
 * Розробити функцію, яка перевіряє відповідність введеного пароля збереженому хешу, використовуючи алгоритм PBKDF2. Функція повинна підтверджувати або спростовувати відповідність на основі переданих параметрів солі, ітерацій, довжини ключа та алгоритму хешування.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *  - `inputPassword`: Рядок, введений користувачем як пароль.
 *  - `storedHash`: Рядок, що містить збережений хеш паролю.
 *  - `salt`: Рядок, який представляє сіль, використану для генерації збереженого хешу.
 *  - `iterations`: Кількість ітерацій хешування (дефолтне значення 10000).
 *  - `keylen`: Довжина ключа у байтах (дефолтне значення 64).
 *  - `digest`: Алгоритм хешування (дефолтне значення 'sha512').
 *
 * 2. Результат:
 *  - Функція повертає булеве значення: `true`, якщо хеш введеного паролю співпадає з збереженим хешем; `false` — в інших випадках.
 *
 * 3. Безпека:
 *  - Використання надійних криптографічних методів для забезпечення захисту відомостей про паролі.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), зокрема модулів ECMAScript для імпорту та експорту функцій.
 * - Чистий, добре структурований код з логічною структурою та зрозумілими назвами змінних і функцій.
 * - Підготовка функції для легкої інтеграції у тести, використовуючи JEST для мокування залежностей і перевірки поведінки функції.
 *
 */

function verifyPassword(inputPassword, storedHash, salt, iterations = 10000, keylen = 64, digest = 'sha512') {
  const inputHash = pbkdf2Sync(inputPassword, salt, iterations, keylen, digest).toString('hex');
  return inputHash === storedHash;
}

// Застосування функції
// const inputPassword = 'superSecret123'
// const isCorrect = verifyPassword(inputPassword, hash, salt)
// console.log(isCorrect ? 'Пароль вірний.' : 'Пароль невірний.')

export { generateHash, generatePasswordHash, verifyPassword }
