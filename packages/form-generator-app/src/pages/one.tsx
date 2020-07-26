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
                isDisabled: (obj) => !obj.bool.test,
              },
              {
                type: FieldType.Switch,
                name: 'bool.test',
                title: 'Switch',
                isDisabled: (obj) => !obj.bool.anotherTest,
                columns: '6',
              },
              {
                type: FieldType.Checkbox,
                name: 'bool.anotherTest',
                isDisabled: (obj) => !obj.bool.test,
                title: 'Checkbox',
                columns: '6',
              },
              {
                type: FieldType.Radio,
                name: 'radio.field',
                title: 'Gender 1',
                radioValue: 'gender1'
              },
              {
                type: FieldType.Radio,
                name: 'radio.field',
                title: 'Gender 2',
                radioValue: 'gender2'
              },
              {
                type: FieldType.Radio,
                name: 'radio.field',
                title: 'Gender 3',
                radioValue: 'gender3'
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
      bool: {
        test: true,
      },
      radio: {
        field: 'gender43'
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
