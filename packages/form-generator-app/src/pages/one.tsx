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
          {
            columns: '6',
            name: 'string.a',
            type: FieldType.String,
            title: 'Some text field',
            description: 'Some hint',
          },
          {
            columns: '6',
            name: 'string.b',
            type: FieldType.String,
            title: 'Some text field',
            description: 'Some hint',
          }
        ]
      }
    ];

    const handler = () => ({
      string: {
        a: 'aaa',
        b: 'bbb',
      }
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
