
/// <reference path="./color.ts"/>
/// <reference path="./uuid.ts"/>

namespace mark {

  export namespace utils {

    const defaultCord = (type) => ({
      type,
      id: uuid(),
      top: 50,
      left: 50,
      width: 100,
      height: 100,
      name: 'unset',
      color: color(),
    });

    export const readExportCord = ({lines, naturalHeight, naturalWidth}) => lines.map((line) => {
      const items = line.split(" ");
      if (items.length < 5) {
        console.warn('readExportCord parse failure (length)', items);
        return defaultCord('rect');
      } else {
        const cords = items.slice(1).map((i) => parseFloat(i));
        if (cords.find((c) => isNaN(c))) {
          console.warn('readExportCord parse failure (numeric)', cords);
        }
        const [name, x, y, w, h] = [items[0], ...cords];
        const height = h * naturalHeight;
        const width = w * naturalWidth;
        const top = (y * naturalHeight) - (height / 2);
        const left = (x * naturalWidth) - (width / 2);
        return Object.assign(defaultCord('rect'), {
          name, top, left, height, width
        });
      }
    });

  } // namespace utils

} // namespace mark
