
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
     */
    name?: string;

    /**
     * Коллбеки, вызываемый при фокусировкеи потере фокуса.
     * Подразумевается изменение формы со стороны прикладного
     * программиста, а не работа с полем ввода
     * (например, обновление ссылки на изображение)
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
     * Делает TextField многострочным, если
     * inputRows больше единицы
     */
    inputRows?: number;

    /**
     * Иконки для MatTextField
     */
    leadingIcon?: any;
    trailingIcon?: any;

    /**
     * При клике на иконку мы можем запросить данные из модального
     * окна, расположенного в коде прикладного программиста. Коллбек
     * получает на вход текущее значение поля и функцию onChange...
     */
    leadingIconClick?: (value: any, onChange?: (v: any) => void) => void;
    trailingIconClick?: (value: any, onChange?: (v: any) => void) => void;

    /**
     * Максимальное число для высчитывания процента
     * (минимальное число всегда ноль)
     */
    maxPercent?: number;

    /**
     * Показывает процент числом слева
     */
    showPercentLabel?: boolean;

    /**
     * - Коллбеки, позволяющий перекрасить SliderField.
     * Работают только если заданы все вместе
     * - ВНИМАНИЕ! Потенциально возможна просадка производительности,
     * так как осуществляет рекомпиляцию стилей material-ui
     */
    sliderThumbColor?: (v: number) => string,
    sliderTrackColor?: (v: number) => string,
    sliderRailColor?: (v: number) => string,

    /**
     *  - Коллбеки, позволяющие перекрасить ProgressField.
     * Работают только если заданы все вместе
     *  - ВНИМАНИЕ! Потенциально возможна просадка производительности,
     * так как осуществляет рекомпиляцию стилей material-ui
     */
    progressColor?: (v: number) => string,
    progressBarColor?: (v: number) => string,

    /**
     * Поля, специфичные для SliderField
     */
    minSlider?: number;
    maxSlider?: number;
    stepSlider?: number;

    /**
     * Варианты выбора для ComboField и ItemsField
     */
    itemList?: string[],

    /**
     * Позволяет перевести значения у ComboField и ItemsField
     * из поле itemList на человеческий, если
     * используются константы
     */
    tr?: (s: any) => any,

    /**
     * Тип поля для логического ветвления при рендеринге
     */
    type: FieldType;

    /**
     * Наименование класса для корневого элемента поля (опционально)
     */
    className?: string;

    /**
     * Стиль корневого элемента для поля (опционально)
     */
    style?: React.CSSProperties;

    /**
     * Заголовок и описание, если возможен вывод у поля
     */
    title?: string;
    description?: string;

    /**
     * placeholder для TextField, ComboField, ItemsField
     */
    placeholder?: string;

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
     * Функция, позволяющая организовать валидацию. Если
     * возвращаемое значение не равно null, считается за
     * ошибкую. Коллбек change позволяет осуществить мутацию
     * асинхронно (опционально)
     */
    isInvalid?: (v, change?: (v: null | string) => void) => null | string;

    /**
     * Функция, позволяющая скрыть поле, исходя из целевого
     * объекта. Коллбек change позволяет осуществить мутацию
     * асинхронно (опционально)
     */
    isVisible?: (v, change?: (v: boolean) => void) => boolean;

    /**
     * Функция, позволяющая отключить поле, исходя из целевого
     * объекта. Коллбек change позволяет осуществить мутацию
     * асинхронно (опционально)
     */
    isDisabled?: (v, change?: (v: boolean) => void) => boolean;

    /**
     * Функция, применяемая если значение поля вычисляется динамически.
     * Включает readonly. Для ComponentField может возвращать JSX.
     * Коллбек change позволяет осуществить операцию асинхронно (опционально).
     */
    compute?: (v, change?: (v: any) => void) => any;

    /**
     * Значение по-умолчанию для поля
     */
    defaultValue?: string | number | boolean;

    /**
     * Позволяет выключить отступ. Можно использовать по аналогии
     * с исключением последней запятой при склеивании массива
     * руками, если раздражает
     */
    fieldRightMargin?: number;
    fieldBottomMargin?: number;

  }

} // namespace form
