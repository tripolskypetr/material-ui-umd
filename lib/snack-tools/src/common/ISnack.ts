namespace snack {

  export interface ISnack {
    type?: SnackType,
    transition?: TransitionType,
    timeout?: number,
    onClose?: CallableFunction,
    onActionClick?: CallableFunction,
    action?: string,
    anchorVertical?: VerticalAlign,
    anchorHorizontal?: HorizontalAlign,
    message: string,
  }

} // namespace snack
