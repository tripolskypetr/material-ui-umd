
/// <reference path="../fields/index.ts"/>

/// <reference path="../components/Group.tsx"/>
/// <reference path="../components/Paper.tsx"/>
/// <reference path="../components/Expansion.tsx"/>

namespace form {

  type Exclude = Omit<IManaged, keyof IEntity>;

  type TypedFieldFactory<T extends FieldType, F extends {}> = {
    [P in keyof Omit<F, keyof Exclude>]?: F[P];
  } & {
    type: T;
  };

  type TypedFieldFactoryShallow<T extends FieldType, F extends {}>
    = IManagedShallow & TypedFieldFactory<T, F>;

  type Group = TypedFieldFactory<FieldType.Group, IManagedLayout>;
  type Paper = TypedFieldFactory<FieldType.Paper, IManagedLayout>;
  type Expansion = TypedFieldFactory<FieldType.Expansion, components.IExpansionProps>;

  type Checkbox = TypedFieldFactoryShallow<FieldType.Checkbox, fields.ICheckboxFieldProps>;
  type Combo = TypedFieldFactoryShallow<FieldType.Combo, fields.IComboFieldProps>;
  type Component = TypedFieldFactoryShallow<FieldType.Component, fields.IComponentFieldProps>;
  type Items = TypedFieldFactoryShallow<FieldType.Items, fields.IItemsFieldProps>;
  type Line = TypedFieldFactoryShallow<FieldType.Line, fields.ILineFieldProps>;
  type Progress = TypedFieldFactoryShallow<FieldType.Progress, fields.IProgressFieldProps>;
  type Radio = TypedFieldFactoryShallow<FieldType.Radio, fields.IRadioFieldProps>;
  type Rating = TypedFieldFactoryShallow<FieldType.Rating, fields.IRatingFieldProps>;
  type Slider = TypedFieldFactoryShallow<FieldType.Slider, fields.ISliderFieldProps>;
  type Switch = TypedFieldFactoryShallow<FieldType.Switch, fields.ISwitchFieldProps>;
  type Text = TypedFieldFactoryShallow<FieldType.Text, fields.ITextFieldProps>;
  type Typography = TypedFieldFactoryShallow<FieldType.Typography, fields.ITypographyFieldProps>;

  /**
   * Логическое ветвление компонентов
   * Typescript type-guard
   */
  export type TypedFieldRegistry<T = any> =
    T extends Expansion ? Expansion
    : T extends Group ? Group
    : T extends Paper ? Paper
    : T extends Checkbox ? Checkbox
    : T extends Combo ? Combo
    : T extends Component ? Component
    : T extends Items ? Items
    : T extends Line ? Line
    : T extends Progress ? Progress
    : T extends Radio ? Radio
    : T extends Rating ? Rating
    : T extends Slider ? Slider
    : T extends Switch ? Switch
    : T extends Text ? Text
    : T extends Typography ? Typography
    : never;

  /**
   * Переопределяем подполя
   */
  export type TypedField = TypedFieldRegistry & {
    name?: string;
    fields?: TypedField[];
  };

} // namespace form
