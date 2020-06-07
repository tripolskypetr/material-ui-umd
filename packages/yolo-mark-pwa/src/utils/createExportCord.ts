namespace mark {

  export namespace utils {

    export const createExportCord = ({
      name, height, width, top, left, right, bottom
    }) => {
      const dw = 1.0 / width;
      const dh = 1.0 / height;
      const xmin = left;
      const xmax = right;
      const ymin = top;
      const ymax = bottom;
      let x = (xmin + xmax) / 2.0;
      let y = (ymin + ymax) / 2.0;
      let w = xmax - xmin;
      let h = ymax - ymin;
      x = x * dw;
      w = w * dw;
      y = y * dh;
      h = h * dh;
      return [name, ...[x, y, w, h].map((v) => v.toFixed(16))].join(' ');
    }

  } // namespace utils

} // namespace mark
