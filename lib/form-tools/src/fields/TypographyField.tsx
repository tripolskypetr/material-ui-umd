namespace form {

  const {
    Typography,
  } = material.core;

  const {
    makeField,
  } = components;

  export namespace fields {

    export interface ITypographyFieldProps {
      value: PickProp<IManaged, 'value'>;
      placeholder: PickProp<IManaged, 'placeholder'>;
      typoVariant: PickProp<IManaged, 'typoVariant'>;
    }

    export const TypographyField = makeField(({
      value = '',
      placeholder = '',
      typoVariant = 'body1',
    }: ITypographyFieldProps) => (
      <Typography variant={typoVariant}>
        {value || placeholder}
      </Typography>
    ));

  } // namespace fields

} // namespace form
