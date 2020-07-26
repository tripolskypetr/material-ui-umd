
/// <reference path="./FieldType.ts"/>

namespace form {

  /**
   * Объект поля для прикладного программиста
   */
  export interface IField {

    /**
     * Общие поля. Поле name позволяет задать забор
     * поля из целевого объекта, не нужен для group,
     * expansion и line.
     *  - Поле id пробрасывается в аттрибуты корневого
     * блока компонента на странице и не используется в
     * компоненте List.
     */
    id?: string;
    name?: string;

    /**
     * Тип поля для логического ветвления при рендеринге
     */
    type: FieldType;

    /**
     * Наименование класса для поля (опционально)
     */
    className?: string;

    /**
     * Заголовок и описание, если возможен вывод у поля
     */
    title?: string;
    description?: string;

    /**
     * Колонки для One. Не используются в List (кроме фильтров).
     * Если указано поле columns, то остальные приравниваются к
     * его значению
     */
    columns?: string;
    phoneColumns?: string;
    tabletColumns?: string;
    desktopColumns?: string;

    /**
     * Дочерние поля для групп
     */
    fields?: IField[];

    /**
     * Коллбек, позволяющий организовать валидацию. Если
     * возвращаемое значение не равно null, считается за
     * ошибку
     */
    isInvalid?: (v) => null | string;

    /**
     * Коллбек, позволяющий скрыть поле, исходя из целевого
     * объекта
     */
    isVisible?: (v) => boolean;

    /**
     * Коллбек, позволяющий отключить поле, исходя из целевого
     * объекта
     */
    isDisabled?: (v) => boolean;

    /**
     * Значение по-умолчанию для выпадающего списка и строки
     */
    defaultValue?: string | number | boolean;

  }

} // namespace form
