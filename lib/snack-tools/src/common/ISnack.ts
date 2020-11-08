namespace snack {

  export interface ISnack {
    type?: SnackType,
    transition?: TransitionType,
    transitionDirection?: TransitionDirection,
    timeout?: number,
    onClose?: CallableFunction,
    onAction?: CallableFunction,
    action?: string,
    anchorVertical?: VerticalAlign,
    anchorHorizontal?: HorizontalAlign,
    message?: string,
  }

} // namespace snack
