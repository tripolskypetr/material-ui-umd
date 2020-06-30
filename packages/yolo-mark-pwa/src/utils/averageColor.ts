namespace mark {

  export namespace utils {

    export const averageColor = async (url) => {

      const loadImage = (url) => new Promise<HTMLImageElement>((res) => {
        const img = document.createElement('img');
        img.onload = () => res(img);
        img.src = url;
      });

      const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      };

      const img = await loadImage(url);
      const [height, width] = [
        img.naturalHeight,
        img.naturalWidth
      ];

      const canvas = document.createElement('canvas');
      [canvas.height, canvas.width] = [height, width];
      const context = canvas.getContext('2d');
      context.drawImage(img, 0, 0);

      const {data} = context.getImageData(0, 0, width, height);
      let [red, green, blue, count] = [...new Array(4)].fill(0);
      const step = data.length / (height * width);

      for (let i = 0; i !== data.length; i += step) {
        [red, green, blue] = [
          red + data[i],
          green + data[i + 1],
          blue + data[i + 2],
        ];
      }

      count = data.length / step;

      [red, green, blue] = [red, green, blue].map((v) => Math.round(v / count));

      return `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}`;

    };

  } // namespace utils

} // namespace mark
