namespace app {

  const {
    useState,
  } = React;

  const {
    One,
    FieldType,
  } = form;

  const {
    Chart,
    ChartType,
  } = chart;

  export namespace pages {

    export const ChartPage = () => {

      const [options, setOptions] = useState(null);

      const fields: form.IField[] = [
        {
          type: FieldType.Group,
          fields: [
            {
              type: FieldType.Component,
              style: {minHeight: 'calc(100vh - 100px)'},
              columns: '6',
              compute: (props) => <Chart {...props} />,
            },
            {
              type: FieldType.Group,
              columns: '6',
              fields: [
                {
                  type: FieldType.Combo,
                  name: 'type',
                  itemList: [
                    ChartType.Scatter,
                    ChartType.Bubble,
                    ChartType.Polar,
                    ChartType.Radar,
                    ChartType.HorizontalBar,
                    ChartType.Bar,
                    ChartType.Pie,
                    ChartType.Doughnut,
                  ],
                },
              ],
            },
          ],
        },
      ];

      const change = (obj) => setOptions(obj);

      return <One fields={fields} change={change}/>
    };

  } // namespace pages

} // namespace app
