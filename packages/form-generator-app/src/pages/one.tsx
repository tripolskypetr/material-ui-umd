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
            type: FieldType.Group,
            columns: '6',
            fields: [
              {
                type: FieldType.Line,
                title: 'Колонка слева',
                columns: '12',
              },
              {
                columns: '12',
                name: 'string.a',
                type: FieldType.String,
                title: 'Some text field',
                isInvalid: (obj) => obj.string.a.length < 3 ? 'Field len < 3' : null,
                isDisabled: (obj) => obj.string.b.length > 5,
                isVisible: (obj) => obj.string.b.length < 10,
                description: 'Some hint',
              },
            ]
          },
          {
            type: FieldType.Group,
            columns: '6',
            fields: [
              {
                columns: '6',
                name: 'string.b',
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
              },
              {
                type: FieldType.Switch,
              }
            ]
          },
        ]
      }
    ];

    const handler = () => ({
      string: {
        a: 'aaa',
        b: 'bbb',
      },
      list: {
        test: 1,
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
