namespace chart {

  const {
    forwardRef,
  } = React;

  export namespace components {

    const applyType = (props, ref, type) => ({...props, ref, type});

    export const Scatter = forwardRef((props, ref) => <Chart {...applyType(props, ref, 'scatter')}/>);
    export const Bubble = forwardRef((props, ref) => <Chart {...applyType(props, ref, 'bubble')}/>);
    export const Polar = forwardRef((props, ref) => <Chart {...applyType(props, ref, 'polarArea')}/>);
    export const Radar = forwardRef((props, ref) => <Chart {...applyType(props, ref, 'radar')}/>);
    export const HorizontalBar = forwardRef((props, ref) => <Chart {...applyType(props, ref, 'horizontalBar')}/>);
    export const Bar = forwardRef((props, ref) => <Chart {...applyType(props, ref, 'bar')}/>);
    export const Pie = forwardRef((props, ref) => <Chart {...applyType(props, ref, 'pie')}/>);
    export const Doughnut = forwardRef((props, ref) => <Chart {...applyType(props, ref, 'doughnut')}/>);

  } // namespace components

} // namespace chart
