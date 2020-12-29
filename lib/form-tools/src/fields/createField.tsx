
/// <reference path="../fields/index.ts"/>

namespace form {

  export namespace fields {

    export const createField = (entity: IEntity, currentPath = '') => {
      const {type} = entity;
      if (type === FieldType.Text) {
        return <TextField {...entity} key={currentPath} />
      } else if (type === FieldType.Line) {
        return <LineField {...entity} key={currentPath} />
      } else if (type === FieldType.Radio) {
        return <RadioField {...entity} key={currentPath} />
      } else if (type === FieldType.Switch) {
        return <SwitchField {...entity} key={currentPath} />
      } else if (type === FieldType.Checkbox) {
        return <CheckboxField {...entity} key={currentPath} />
      } else if (type === FieldType.Progress) {
        return <ProgressField {...entity} key={currentPath} />
      } else if (type === FieldType.Component) {
        return <ComponentField {...entity} key={currentPath} />
      } else if (type === FieldType.Slider) {
        return <SliderField {...entity} key={currentPath} />
      } else if (type === FieldType.Combo) {
        return <ComboField {...entity} key={currentPath} />
      } else if (type === FieldType.Items) {
        return <ItemsField {...entity} key={currentPath} />
      } else if (type === FieldType.Rating) {
        return <RatingField {...entity} key={currentPath} />
      } else if (type === FieldType.Typography) {
        return <TypographyField {...entity} key={currentPath} />
      } else {
        throw new Error('FieldFactory unknown key type')
      }
    };

  } // namespace fields

} // namespace form
