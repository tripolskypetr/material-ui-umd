
/// <reference path="./FieldType.ts"/>

namespace form {

  type inputType = "text"
    | "color"
    | "date"
    | "email"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "time"
    | "url"
    | "week";

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
     * Коллбеки, вызываемый при фокусировке
     * и потере фокуса
     */
    focus?: () => void;
    blur?: () => void;

    /**
     * Флаг только на чтение и "круглой окаймовки". У
     * компонента List филды принудительно получают
     * значения false.
     */
    readonly?: boolean;
    outlined?: boolean;

    /**
     * Поле, специфичное для RadioField и позволяющее
     * задать значение при выборе элемента кликом
     */
    radioValue?: string;

    /**
     * Поле type для MatTextField
     */
    inputType?: inputType;

    /**
     * Иконки для MatTextField
     */
    leadingIcon?: any;
    trailingIcon?: any;

    /**
     * Максимальное число для высчитывания процента
     */
    maxPercent?: number;

    /**
     * Поля, специфичные для SliderField
     */
    minSlider?: number;
    maxSlider?: number;
    stepSlider?: number;
    marksSlider?: boolean;

    /**
     * Тип поля для логического ветвления при рендеринге
     */
    type: FieldType;

    /**
     * Наименование класса для поля (опционально)
     */
    className?: string;

    /**
     * Стиль корневого элемента для поля (опционально)
     */
    style?: React.CSSProperties

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
     * Коллбек, если значение поля вычисляется динамически. Автоматически
     * включает readonly. Для ComponentField может возвращать JSX.
     */
    compute?: (v) => any;

    /**
     * Значение по-умолчанию для поля
     */
    defaultValue?: string | number | boolean;

  }

} // namespace form
