
/// <reference path="../fields/index.ts"/>

namespace form {

  export namespace fields {

    export const createField = (entity: IEntity, currentPath = '') => {
      const {type} = entity;
      if (type === FieldType.String) {
        return <StringField {...entity} key={currentPath} />
      } else if (type === FieldType.Line) {
        return <LineField {...entity} key={currentPath} />
      } else if (type === FieldType.Radio) {
        return <RadioField {...entity} key={currentPath} />
      } else if (type === FieldType.Switch) {
        return <SwitchField {...entity} key={currentPath} />
      } else if (type === FieldType.Checkbox) {
        return <CheckboxField {...entity} key={currentPath} />
      } else if (type === FieldType.Label) {
        return <LabelField {...entity} key={currentPath} />
      } else if (type === FieldType.Text) {
        return <TextField {...entity} key={currentPath} />
      } else {
        throw new Error('FieldFactory unknown key type')
      }
    };

  } // namespace fields

} // namespace form
