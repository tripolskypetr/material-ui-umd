namespace form {

  const {
    TextField: MatTextField,
    Chip,
  } = material.core;

  const {
    Autocomplete,
  } = material.lab;

  const {
    makeField,
  } = components;

  export namespace fields {

    export interface IItemsFieldProps {
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

    export const ItemsField = makeField(({
      value, disabled,
      description = '',
      placeholder = '',
      outlined = true,
      itemList = [],
      title = '',
      tr = (s) => s,
      onChange,
    }: IItemsFieldProps) => (
      <Autocomplete multiple onChange={({}, v) => onChange(v)}
        options={itemList} disabled={disabled} value={value}
        getOptionLabel={(s) => tr(s)}
        renderTags={(value, getTagProps) => value.map((option, index) => (
          <Chip variant={outlined ? "outlined" : "standard"}
            label={option} {...getTagProps({ index })} />
        ))}
        renderInput={(params) => (
          <MatTextField variant={outlined ? "outlined" : "standard"}
            {...params}  label={title} placeholder={placeholder}
            helperText={description} />
        )}
      />
    ), true);

  } // namespace fields

} // namespace form
