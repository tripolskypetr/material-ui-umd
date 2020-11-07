
/// <reference path="../data/peoples.ts"/>

namespace app {

  const {
    Breadcrumbs,
    FieldType,
    One,
  } = form;

  const {
    Box
  } = material.core;

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
            type: FieldType.Group,
            fields: [
              {
                type: FieldType.Group,
                columns: "2",
                fields: [
                  {
                    type: FieldType.Component,
                    compute: () => (
                      <Box display="flex" justifyContent="center">
                        <Box style={{
                          background: "#54545447",
                          height: '200px',
                          width: '100%',
                        }}/>
                      </Box>
                    ),
                  },
                  {
                    type: FieldType.Rating,
                    name: 'rate',
                  }
                ]
              },
              {
                type: FieldType.Group,
                columns: "10",
                fields: [
                  {
                    type: FieldType.Line,
                    title: 'Профиль'
                  },
                  {
                    type: FieldType.Combo,
                    title: 'Пол',
                    placeholder: 'Выберите один',
                    name: 'gender',
                    itemList: ['Male', 'Female', 'Other']
                  },
                  {
                    type: FieldType.Items,
                    title: 'Списки',
                    placeholder: 'Выберите несколько',
                    name: 'list',
                    itemList: ['Blocklist', 'VIP', 'Other people']
                  },
                  {
                    type: FieldType.Group,
                    fields: [
                      {
                        type: FieldType.Group,
                        columns: "9",
                        fields: [
                          {
                            type: FieldType.Text,
                            outlined: false,
                            title: 'Кодовая фраза',
                            name: 'keyword',
                            placeholder: 'September',
                            isDisabled: (obj) => !obj.keywordEnabled,
                          },
                        ]
                      },
                      {
                        type: FieldType.Group,
                        columns: "3",
                        fields: [
                          {
                            type: FieldType.Checkbox,
                            title: 'Кодовая фраза',
                            name: 'keywordEnabled',
                          },
                        ]
                      },
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: FieldType.Line,
            title: 'Общая информация',
          },
          {
            name: 'firstName',
            type: FieldType.Text,
            title: 'Имя',
            description: 'Felton',
          },
          {
            name: 'lastName',
            type: FieldType.Text,
            title: 'Фамилия',
            description: 'Cruickshank',
          },
          {
            name: 'age',
            type: FieldType.Text,
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
                    type: FieldType.Text,
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
                    type: FieldType.Text,
                    title: 'Должность',
                  },
                  {
                    name: 'jobArea',
                    type: FieldType.Text,
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
                    type: FieldType.Text,
                    title: 'Страна',
                  },
                  {
                    name: 'city',
                    type: FieldType.Text,
                    title: 'Город',
                  },
                  {
                    name: 'state',
                    type: FieldType.Text,
                    title: 'Область',
                  },
                  {
                    name: 'address',
                    type: FieldType.Text,
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
