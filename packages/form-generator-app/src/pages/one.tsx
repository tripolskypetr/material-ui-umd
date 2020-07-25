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
        type: FieldType.Expansion,
        columns: '12',
        title: 'title',
        description: 'subtitle',
        fields: [
          {type: FieldType.String}
        ]
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
