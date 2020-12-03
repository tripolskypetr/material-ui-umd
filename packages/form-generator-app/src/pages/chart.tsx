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

    const applyData= (options) => ({
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      },
      ...options,
    });

    export const ChartPage = () => {

      const fields: form.IField[] = [
        {
          type: FieldType.Component,
          style: {
            minHeight: 'calc(100vh - 100px)',
            position: 'sticky',
            padding: '10px',
          },
          columns: '6',
          compute: (props) => <Chart {...applyData(props)} />,
        },
        {
          type: FieldType.Group,
          columns: '6',
          fields: [
            {
              type: FieldType.Line,
              title: 'Общие параметры',
            },
            {
              type: FieldType.Checkbox,
              name: 'redraw',
              title: 'Полная перерисовка',
              defaultValue: true,
            },
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
              defaultValue: ChartType.Doughnut,
            },
          ],
        },
      ];

      return <One fields={fields} />
    };

  } // namespace pages

} // namespace app
