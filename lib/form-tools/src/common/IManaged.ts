
/// <reference path="./IEntity.ts"/>

namespace form {

  export type PickProp<T extends {}, P extends keyof T> = T[P];

  /**
   * Возможные значения value
   */
  type v = number | string | boolean;

  /**
   * Типизацию компоновки следует вынести отдельно
   */
  export interface IManagedLayout {
    columns?: PickProp<IField, 'columns'>;
    phoneColumns?: PickProp<IField, 'phoneColumns'>;
    tabletColumns?: PickProp<IField, 'tabletColumns'>;
    desktopColumns?: PickProp<IField, 'desktopColumns'>;
    fieldRightMargin?: PickProp<IField, 'fieldRightMargin'>;
    fieldBottomMargin?: PickProp<IField, 'fieldBottomMargin'>;
  }

  /**
   * Компонент высшего порядка makeManaged
   * перехватывает управление над свойствами
   * поля
   */
  export interface IManagedShallow extends IManagedLayout {
    isDisabled?: PickProp<IField, 'isDisabled'>;
    isVisible?: PickProp<IField, 'isVisible'>;
    isInvalid?: PickProp<IField, 'isInvalid'>;
    compute?: PickProp<IField, 'compute'>;
    defaultValue?: v;
  }

  /**
   * Свойства, не доступные управляемому полю
   */
  type Exclude = {
    object: never;
    type: never;
    focus: never;
    blur: never;
    ready: never;
    change: never;
    name: never;
  } & IManagedShallow;

  /**
   * Свойства сущности, обернутой в компонент высшего порядка
   * Предоставляется удобная абстракция
   */
  export interface IManaged extends Omit<IEntity, keyof Exclude> {
    value: v;
    disabled: boolean;
    invalid: string | null;
    onChange: (v: v) => void;
  }

} // namespace form
