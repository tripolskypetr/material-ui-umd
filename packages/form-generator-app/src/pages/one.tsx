
/// <reference path="../data/peoples.ts"/>

namespace app {

  const {
    Breadcrumbs,
    FieldType,
    One,
  } = form;

  const {
    useRouter,
  } = router;

  const {
    useState,
    useCallback,
  } = React;

  const {
    Fragment,
  } = React;

  export namespace pages {

    /*const fields: form.IField[] = [
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
                outlined: false,
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
                radioValue: 'gender1',
              },
              {
                type: FieldType.Radio,
                name: 'radio.field',
                title: 'Gender 2',
                radioValue: 'gender2',
              },
              {
                type: FieldType.Radio,
                name: 'radio.field',
                title: 'Gender 3',
                radioValue: 'gender3',
              }
            ]
          },
        ]
      }
    ];*/

    const fields: form.IField[] = [
      {
        type: FieldType.Group,
        columns: '12',
        fields: [
          {
            type: FieldType.Line,
            title: 'Общая информация',
            columns: '12',
          },
          {
            columns: '12',
            name: 'firstName',
            type: FieldType.String,
            title: 'Имя',
            description: 'Felton',
          },
          {
            columns: '12',
            name: 'lastName',
            type: FieldType.String,
            title: 'Фамилия',
            description: 'Cruickshank',
          },
          {
            columns: '12',
            name: 'age',
            type: FieldType.String,
            title: 'Возраст',
            description: '42',
            isInvalid: (obj) => {
              const value = Number(obj.age);
              if (!Number.isInteger(value)) {
                return 'Возраст должен быть числом';
              } else if (value < 1) {
                return 'Возраст должен быть больше 1';
              } else {
                return null;
              }
            },
          },
          {
            type: FieldType.Expansion,
            columns: '12',
            title: 'Подписка',
            description: 'Подписка на уведомления',
            fields: [
              {
                type: FieldType.Group,
                columns: '12',
                fields: [
                  {
                    type: FieldType.Switch,
                    name: 'subscribed',
                    title: 'Разрешить рассылку',
                    columns: '12',
                  },
                  {
                    columns: '12',
                    name: 'email',
                    type: FieldType.String,
                    isDisabled: (obj) => !obj.subscribed,
                    title: 'Почта',
                    description: 'tripolskypetr@gmail.com',
                  },
                ]
              },
            ],
          },
        ],
      }
    ];

    export const OnePage = ({
      id = '',
    }) => {

      const [changedObj, setChangedObj] = useState(null);
      const go = useRouter();

      const back = () => go('/list');
      const handler = () => data.get(id);
      const change = (obj) => {
        console.log({obj});
        setChangedObj(obj);
      };

      const onSave = useCallback(() => {
        data.patch(changedObj);
        alert('Сохранено!');
      }, [changedObj]);

      return (
        <Fragment>
          <Breadcrumbs currentTitle="Профиль"
            backwardTitle="Список профилей"
            saveDisabled={!changedObj}
            save={() => onSave()}
            back={back} />
          <One fields={fields}
            handler={handler}
            change={change} />
        </Fragment>
      );
    };

  } // namespace pages

} // namespace app
