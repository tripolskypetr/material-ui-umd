namespace mark {

  export interface ICord {
    type: 'rect' | 'square',
    name: string,
    id: string,
    top: number,
    left: number,
    width: number,
    height: number,
  };

} // namespace mark
