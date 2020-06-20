namespace mark {

  export namespace utils {

    const loadImage = (url) => new Promise<HTMLImageElement>((res) => {
      const img = document.createElement('img');
      img.onload = () => res(img);
      img.src = url;
    });

    const saveImage = (blob, name = 'image.png') => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = name;
      a.click();
    };

    export const saveImageFile = async ({
      url, name, top, left, height, width,
    }) => {
      const canvas = document.createElement('canvas');
      [canvas.height, canvas.width] = [height, width];
      const ctx = canvas.getContext('2d');
      const img = await loadImage(url);
      ctx.drawImage(img, left, top, width, height, 0, 0, width, height);
      canvas.toBlob((blob) => saveImage(blob, name), 'image/png');
    };

  } // namespace utils

} // namespace mark
