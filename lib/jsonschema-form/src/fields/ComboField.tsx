namespace form {

  const {
    TextField: MatTextField,
  } = material.core;

  const {
    Autocomplete,
  } = material.lab;

  const {
    makeManaged,
  } = components;

  export namespace fields {

    export const ComboField = makeManaged(({
      value, disabled,
      description = '',
      placeholder = '',
      outlined = true,
      itemList = [],
      title = '',
      tr = (s) => s,
      onChange
    }: IManaged) => (
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
