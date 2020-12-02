namespace chart {

  const {
    useRef,
    useEffect,
    useCallback,
    forwardRef,
  } = React;

  export namespace components {

    namespace internal {

      const applyDefaultValues = (props) => ({
        legend: {
          display: true,
          position: 'center',
          ...props.legend,
        },
        type: props.type || 'doughnut',
        height: props.height || 150,
        width: props.width || 300,
        redraw: props.redraw,
        options: props.options || {},
        plugins: props.plugins || [],
        getDatasetAtEvent: props.getDatasetAtEvent,
        getElementAtEvent: props.getElementAtEvent,
        getElementsAtEvent: props.getElementsAtEvent,
        onElementsClick: props.onElementsClick,
        data: props.data || {},
        trackBy: props.trackBy || ((d) => d.label),
      });

      export const Chart = (props: IChartProps, ref) => {

        const {
          legend,
          type,
          height,
          width,
          redraw,
          options,
          plugins,
          getDatasetAtEvent,
          getElementAtEvent,
          getElementsAtEvent,
          onElementsClick,
          data,
          trackBy,
        } = applyDefaultValues(props);

        const chartInstance = useRef(null);
        const element = useRef(null);

        const renderChart = useCallback(() => {
          const { current: node } = element;
          options.legend = legend;
          const config = { type, data, options, plugins, };
          const instance = new window.Chart(node, config);
          if (ref) { ref.current = instance; }
          chartInstance.current = instance;
        }, [type, data, options, plugins]);

        const updateChart = useCallback(() => {
          const {current: chart} = chartInstance;
          if (chart === null) {
            return;
          } else {
            chart.options = window.Chart.helpers.configMerge(chart.options, options);
            const indexed = new Map(data?.datasets?.map((d) => [trackBy(d), d]));
            chart.config.data.datasets.forEach((d) => {
              const key = trackBy(d);
              if (indexed.has(key)) {
                Object.entries(indexed.get(key))
                  .forEach(([k, v]) => d[k] = v);
              } else {
                return;
              }
            });
            chart.update();
          }
        }, [data]);

        const destroyChart = () => {
          const {current: chart} = chartInstance;
          if (chart === null) {
            return;
          } else {
            chart.destroy();
          }
        };

        useEffect(() => {
          const {current: chart} = chartInstance
          if (redraw || chart === null) {
            destroyChart();
            renderChart();
          } else {
            updateChart();
          }
        }, [redraw, data]);

        useEffect(() => () => destroyChart(), []);

        const handleOnClick = (event) => {
          const { current: instance } = chartInstance;
          if (getDatasetAtEvent) { getDatasetAtEvent(instance.getDatasetAtEvent(event), event); }
          if (getElementAtEvent) { getElementAtEvent(instance.getElementAtEvent(event), event); }
          if (getElementsAtEvent) { getElementsAtEvent(instance.getElementsAtEvent(event), event); }
          if (onElementsClick) { onElementsClick(instance.getElementsAtEvent(event), event); }
        }

        return <canvas onClick={handleOnClick} ref={element} height={height} width={width} />
      };

    } // namespace internal

    export const Chart = forwardRef(internal.Chart);

  } // namespace components

} // namespace chart
