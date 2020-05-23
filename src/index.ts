declare namespace material {
  export type HOC = (...args: any[]) => Component;
  export type Component<T = any> = (props: T) => Element;
  export type Element = any;
}
