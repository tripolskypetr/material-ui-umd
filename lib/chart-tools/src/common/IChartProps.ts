namespace chart {

  type func = (...args: any[]) => any;

  export interface IChartConfiguration {
    type: Chart.ChartType;
    data: Chart.ChartData;
    options: Chart.ChartOptions;
    plugins: Chart.PluginServiceRegistrationOptions[];
  }

  export interface IChartProps extends IChartConfiguration {
    getDatasetAtEvent: func;
    getElementAtEvent: func;
    getElementsAtEvent: func;
    height: number;
    legend: any;
    onElementsClick: func;
    redraw: boolean;
    width: number;
    trackBy: func;
  }

} // namespace chart
