
/// <reference path="./IEntity.ts"/>

namespace form {

  /**
   * Свойства, не доступные управляемому полю
   */
  type exclude = 'object' | 'type'

  /**
   * Возможные значения value
   */
  type v = number | string | boolean;

  /**
   * Свойства сущности, обернутой в компонент высшего порядка
   */
  export interface IManaged extends Omit<IEntity, exclude> {

    /**
     * Компонент высшего порядка перехватывает управление
     */
    columns?: never;
    phoneColumns?: never;
    tabletColumns?: never;
    desktopColumns?: never;
    isDisabled?: never;
    isVisible?: never;
    isInvalid?: never;
    change?: never;
    object?: never;
    name?: never;
    readonly?: never;

    /**
     * Компонент высшего порядка предоставляет удобную
     * абстракцию
     */
    value: v;
    disabled: boolean;
    invalid: string | null;
    onChange: (v: v) => void;
  }

} // namespace form
