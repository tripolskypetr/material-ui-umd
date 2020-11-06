namespace form {

  const {
    TextField: MatTextField,
    Chip,
  } = material.core;

  const {
    Autocomplete,
  } = material.lab;

  const {
    makeManaged,
  } = components;

  export namespace fields {

    export const ItemsField = makeManaged(({
      value, disabled,
      description = '',
      placeholder = '',
      outlined = true,
      itemList = [],
      title = '',
      onChange
    }: IManaged) => (
      <Autocomplete multiple onChange={({}, v) => onChange(v)}
        options={itemList} disabled={disabled} value={value}
        renderTags={(value, getTagProps) => value.map((option, index) => (
          <Chip variant={outlined ? "outlined" : "standard"}
            label={option} {...getTagProps({ index })} />
        ))}
        renderInput={(params) => (
          <MatTextField variant={outlined ? "outlined" : "standard"}
            {...params} helperText={description} label={title}
            placeholder={placeholder} />
        )}
      />
    ), true);

  } // namespace fields

} // namespace form
