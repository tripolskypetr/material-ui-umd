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
      tr = (s) => s,
      onChange
    }: IManaged) => (
      <Autocomplete multiple onChange={({}, v) => onChange(v)}
        options={itemList} disabled={disabled} value={value}
        getOptionLabel={(s) => tr(s)}
        renderTags={(value, getTagProps) => value.map((option, index) => (
          <Chip variant={outlined ? "outlined" : "standard"}
            label={option} {...getTagProps({ index })} />
        ))}
        renderInput={(params) => (
          <MatTextField variant={outlined ? "outlined" : "standard"}
            {...params} style={{paddingBottom: '10px'}} label={title}
            placeholder={placeholder} helperText={description} />
        )}
      />
    ), true);

  } // namespace fields

} // namespace form
