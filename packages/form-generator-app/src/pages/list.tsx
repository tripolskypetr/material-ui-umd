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
      columns: '6',
      name: 'a',
      type: FieldType.Text,
      title: 'First',
    },
    {
      columns: '6',
      name: 'b',
      type: FieldType.Text,
      title: 'Second',
    },
    {
      columns: '6',
      name: 'c',
      type: FieldType.Text,
      title: 'Third',
    },
  ];

  const flat = (arr) => arr.reduce((a, v) => Array.isArray(v) ? a.concat(flat(v)) : a.concat(v), []);

  const handler = () => flat([...new Array(50)].map(() => [
    {id: 1, a: 'a', b: 'b', c: 'c'},
    {id: 2, a: 'c', b: 'a', c: 'b'},
    {id: 3, a: 'b', b: 'c', c: 'a'},
  ]);

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
