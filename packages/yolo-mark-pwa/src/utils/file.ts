namespace mark {

  export namespace utils {

    const readSize = (src) => new Promise<{naturalHeight: number, naturalWidth: number}>((res) => {
      const img = document.createElement('img');
      img.onload = () => {
        const {naturalHeight, naturalWidth} = img;
        res({naturalHeight, naturalWidth});
      };
      img.src = src;
    });

    export const openImage = () => new Promise<any>((res) => {
      let changed = false;
      const input = document.createElement('input');
      input.type = 'file';
      input.accept='.png, .jpg';
      input.onchange = ({target}) => {
        const file = (target as any).files[0];
        const name = file.name;
        changed = true;
        const extension = name.split('.').pop().toLowerCase();
        if (extension === 'png' || extension === "jpg") {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = async () => {
            const {result} = reader;
            const blob = new Blob([result], {type: file.type});
            const url = URL.createObjectURL(blob);
            const date = new Date(file.lastModified).toISOString();
            const {naturalHeight, naturalWidth} = await readSize(url);
            res({url, name, date, naturalHeight, naturalWidth});
          };
        }
      };
      input.click();
    });

  } // namespace utils

} // namespace mark
