
/// <reference path="../data/peoples.ts"/>

namespace app {

  const {
    makeStyles,
  } = material.core;

  const {
    List: ListForm,
    SelectionMode,
    FieldType,
  } = form;

  const {
    useRouter,
  } = router;

  export namespace pages {

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

    const remove = ({id}) => data.remove(id);

    const select = (items) => console.log('select', {items});

    export const List = ({}) => {
      const classes = useStyles();
      const go = useRouter();
      return (
        <div className={classes.root}>
          <ListForm click={({id}) => go(`/one/${id}`)}
            remove={remove} handler={handler}
            select={select}
            selection={SelectionMode.Single}
            fields={fields}/>
        </div>
      );
    };

  } // namespace pages

} // namespace app
