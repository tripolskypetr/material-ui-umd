
/// <reference path="../data/peoples.ts"/>

namespace app {

  const {
    makeStyles,
  } = material.core;

  const {
    List: ListForm,
    FieldType,
  } = form;

  const useStyles = makeStyles({
    root: {
      width: '100vw - 20px',
      height: 'calc(100vh - 85px)'
    }
  });

  const fields = [
    {
      name: 'id',
      type: FieldType.Text,
      title: 'Идентификатор',
    },
    {
      name: 'firstName',
      type: FieldType.Text,
      title: 'Имя',
    },
    {
      name: 'lastName',
      type: FieldType.Text,
      title: 'Фамилия',
    },
  ];

  const handler = ({
    limit,
    offset,
    order,
    orderBy,
    keyword,
  }) => data.list({limit, offset, order, orderBy, keyword});

  export namespace pages {

    export const List = ({}) => {
      const classes = useStyles();
      return (
        <div className={classes.root}>
          <ListForm click={(v) => console.log(v)}
            handler={handler} fields={fields}/>
        </div>
      );
    };

  } // namespace pages

} // namespace app
