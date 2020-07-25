namespace app {

  const {
    Typography,
  } = material.core;

  const {
    One: OneForm,
    FieldType
  } = form;

  const {
    Fragment
  } = React;

  export namespace pages {

    const fields: form.IField[] = [
      {
        type: form.FieldType.Expansion,
        columns: '12',
        name: 'text'
      }
    ];

    const handler = () => ({
      //
    });

    const change = (v) => console.log({v});

    export const One = ({}) => {

      return (
        <Fragment>
          <Typography variant="h6">
            One component sample
          </Typography>
          <OneForm fields={fields} handler={handler} change={change}/>
        </Fragment>
      );
    };

  } // namespace pages

} // namespace app
