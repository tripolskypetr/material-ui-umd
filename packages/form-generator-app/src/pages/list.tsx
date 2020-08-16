
/// <reference path="../data/peoples.ts"/>

namespace app {

  const {
    SelectionMode,
    FieldType,
    List,
  } = form;

  const {
    makeStyles,
  } = material.core;

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

    export const ListPage = ({}) => {

      const classes = useStyles();
      const go = useRouter();

      const handler = ({limit, offset, order, orderBy, keyword}) => data.list({limit, offset, order, orderBy, keyword});
      const select = (items) => console.log('select', {items});
      const remove = ({id}) => data.remove(id);
      const click = ({id}) => go(`/one/${id}`);

      return (
        <div className={classes.root}>
          <List selection={SelectionMode.Single}
            remove={remove} handler={handler}
            fields={fields} click={click}
            select={select} />
        </div>
      );
    };

  } // namespace pages

} // namespace app
