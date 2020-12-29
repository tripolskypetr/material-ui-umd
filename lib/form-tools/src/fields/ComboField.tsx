namespace form {

  const {
    TextField: MatTextField,
  } = material.core;

  const {
    Autocomplete,
  } = material.lab;

  const {
    makeField,
  } = components;

  export namespace fields {

    export interface IComboFieldProps {
      value: PickProp<IManaged, 'value'>;
      disabled: PickProp<IManaged, 'disabled'>;
      description: PickProp<IManaged, 'description'>;
      placeholder: PickProp<IManaged, 'placeholder'>;
      outlined: PickProp<IManaged, 'outlined'>;
      itemList: PickProp<IManaged, 'itemList'>;
      title: PickProp<IManaged, 'title'>;
      tr: PickProp<IManaged, 'tr'>;
      onChange: PickProp<IManaged, 'onChange'>;
    }

    export const ComboField = makeField(({
      value, disabled,
      description = '',
      placeholder = '',
      outlined = true,
      itemList = [],
      title = '',
      tr = (s) => s,
      onChange
    }: IComboFieldProps) => (
      <Autocomplete value={value} onChange={({}, v) => onChange(v)}
        getOptionLabel={(s) => tr(s)} options={itemList} disabled={disabled}
        renderInput={(params) => (
          <MatTextField {...params} variant={outlined ? "outlined" : "standard"}
            helperText={description} label={title} placeholder={placeholder} />
        )}
      />
    ), true);

  } // namespace fields

} // namespace form
