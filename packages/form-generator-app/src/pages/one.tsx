
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
        fields: [
          {
            type: FieldType.Line,
            title: 'Общая информация',
          },
          {
            name: 'firstName',
            type: FieldType.String,
            title: 'Имя',
            description: 'Felton',
          },
          {
            name: 'lastName',
            type: FieldType.String,
            title: 'Фамилия',
            description: 'Cruickshank',
          },
          {
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
            title: 'Подписка',
            description: 'Подписка на уведомления',
            fields: [
              {
                type: FieldType.Group,
                fields: [
                  {
                    type: FieldType.Switch,
                    name: 'subscribed',
                    title: 'Разрешить рассылку',
                  },
                  {
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
            fields: [
              {
                type: FieldType.Group,
                columns: '6',
                fields: [
                  {
                    type: FieldType.Line,
                    title: 'Работа',
                  },
                  {
                    name: 'jobTitle',
                    type: FieldType.String,
                    title: 'Должность',
                  },
                  {
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
                  },
                  {
                    name: 'country',
                    type: FieldType.String,
                    title: 'Страна',
                  },
                  {
                    name: 'city',
                    type: FieldType.String,
                    title: 'Город',
                  },
                  {
                    name: 'state',
                    type: FieldType.String,
                    title: 'Область',
                  },
                  {
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
        setChangedObj(null);
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
