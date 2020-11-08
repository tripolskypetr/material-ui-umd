namespace app {

  const {
    One,
    FieldType,
    Breadcrumbs,
  } = form;

  const {
    useSnack,
    SnackType,
    TransitionType,
    VerticalAlign,
    HorizontalAlign,
  } = snack;

  const {
    useState,
    useCallback,
  } = React;

  const {
    Button,
  } = material.core;

  const {
    Fragment,
  } = React;

  export namespace pages {

    const fields: form.IField[] = [
      {
        type: FieldType.Line,
        title: 'Опциональные параметры'
      },
      {
        type: FieldType.Combo,
        itemList: [
          SnackType.Error,
          SnackType.Info,
          SnackType.Success,
          SnackType.Warning,
          SnackType.Normal,
        ],
        tr(v) {
          if (v === SnackType.Error) {
            return "Ошибка";
          } else if (v === SnackType.Info) {
            return "Информация";
          } else if (v === SnackType.Success) {
            return "Удачно";
          } else if (v === SnackType.Warning) {
            return "Предупреждение";
          } else if (v === SnackType.Normal) {
            return "Material";
          }
        },
        name: 'type',
        title: 'Тип уведомления'
      },
      {
        type: FieldType.Combo,
        itemList: [
          TransitionType.Grow,
          TransitionType.Slide,
        ],
        name: 'transition',
        title: 'Тип появления',
      },
      {
        type: FieldType.Combo,
        itemList: [
          VerticalAlign.Left,
          VerticalAlign.Right,
        ],
        name: 'anchorVertical',
        title: 'Вертикальный якорь',
      },
      {
        type: FieldType.Combo,
        itemList: [
          HorizontalAlign.Left,
          HorizontalAlign.Center,
          HorizontalAlign.Right,
        ],
        name: 'anchorHorizontal',
        title: 'Горизонтальный якорь',
      },
      {
        type: FieldType.Text,
        name: 'timeout',
        title: 'Таймаут',
        inputType: 'number',
      },
      {
        type: FieldType.Text,
        name: 'action',
        title: 'Действие',
      },
      {
        type: FieldType.Line,
        title: 'Обязательные параметры'
      },
      {
        type: FieldType.Text,
        name: 'message',
        title: 'Сообщение',
      },
    ];

    export const SnackPage = () => {
      const [object, setObject] = useState<snack.ISnack>(null);
      const snack = useSnack();
      const onClick = useCallback(() => snack(object), [object]);
      return (
        <Fragment>
          <Breadcrumbs currentTitle="Snack" backwardTitle="Главная"
            saveDisabled={!object} save={() => onClick()}
            saveLabel="Показать" />
          <One fields={fields} change={(s) => setObject(s)}/>
        </Fragment>
      );
    }

  } // namespace pages

} // namespace app
