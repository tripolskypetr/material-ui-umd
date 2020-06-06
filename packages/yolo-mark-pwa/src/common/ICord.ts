namespace mark {

  export interface ICord {
    type: 'rect' | 'square',
    id: string,
    top: number,
    left: number,
    width: number,
    height: number,
  };

} // namespace mark
