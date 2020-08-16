
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
          {
            type: FieldType.Group,
            columns: '12',
            fields: [
              {
                type: FieldType.Group,
                columns: '6',
                fields: [
                  {
                    type: FieldType.Line,
                    title: 'Работа',
                    columns: '12',
                  },
                  {
                    columns: '12',
                    name: 'jobTitle',
                    type: FieldType.String,
                    title: 'Должность',
                  },
                  {
                    columns: '12',
                    name: 'jobArea',
                    type: FieldType.String,
                    title: 'Место работы',
                  },
                ]
              },
              {
                type: FieldType.Group,
                columns: '6',
                fields: [
                  {
                    type: FieldType.Line,
                    title: 'Домашний адрес',
                    columns: '12',
                  },
                  {
                    columns: '12',
                    name: 'country',
                    type: FieldType.String,
                    title: 'Страна',
                  },
                  {
                    columns: '12',
                    name: 'city',
                    type: FieldType.String,
                    title: 'Город',
                  },
                  {
                    columns: '12',
                    name: 'state',
                    type: FieldType.String,
                    title: 'Область',
                  },
                  {
                    columns: '12',
                    name: 'address',
                    type: FieldType.String,
                    title: 'Адрес',
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
      const change = (obj) => setChangedObj(obj);

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
