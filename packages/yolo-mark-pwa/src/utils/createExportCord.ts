namespace mark {

  export namespace utils {

    export const createExportCord = ({
      name, height, width, top, left, naturalHeight, naturalWidth
    }) => {
      console.log({name, height, width, top, left, naturalHeight, naturalWidth});

      const x = (left + (width/2)) / naturalWidth;
      const y = (top + (height/2)) / naturalHeight;
      const w = width / naturalWidth;
      const h = height / naturalHeight;

      return [name, ...[x, y, w, h].map((v) => v.toFixed(6))].join(' ');
    }

  } // namespace utils

} // namespace mark
