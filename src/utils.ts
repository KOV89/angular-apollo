/**
 * Исключает из объекта пустые поля
 * @param object исходный объект
 * @return объект класса без пусных полей
 */
export function excludeEmptyFields<T>(object: T): Partial<T> {
  let params: Partial<T> = {};
  Object.entries(object).forEach(([key, value]) => {
    if (Array.isArray(value) ? !!value.length : !!value) {
      params = {...params, [key]: value}
    }
  })
  return params;
}

/**
 * Проверяет, есть ли хотябы одно заполненное поле в объекте
 * @param object исходный объект
 */
export function objectIsEmpty<T>(object: T): boolean {
  return !Object.entries(excludeEmptyFields(object)).length;
}
