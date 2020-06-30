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

    export const loadFile = (file: File) => new Promise<IFile>((res) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        const {result} = reader;
        const blob = new Blob([result], {type: file.type});
        const url = URL.createObjectURL(blob);
        const date = new Date(file.lastModified).toISOString();
        const {naturalHeight, naturalWidth} = await readSize(url);
        const color = await averageColor(url);
        res({url, name: file.name, date, naturalHeight, naturalWidth, color});
      };
    });

    export const loadMarkup = (file: File) => new Promise<string[]>((res) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const {result} = reader;
        res((result as string).split('\n'));
      };
    });

    export const openImage = () => new Promise<any>((res) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept='.png, .jpg';
      input.onchange = async ({target}) => {
        const file = (target as any).files[0];
        const name = file.name;
        const extension = name.split('.').pop().toLowerCase();
        if (extension === 'png' || extension === "jpg") {
          res(await loadFile(file));
        }
      };
      input.click();
    });

    export const openMarkup = () => new Promise<any>((res) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept='.txt';
      input.onchange = async ({target}) => {
        const file = (target as any).files[0];
        const name = file.name;
        const extension = name.split('.').pop().toLowerCase();
        if (extension === 'txt') {
          res(await loadMarkup(file));
        }
      };
      input.click();
    });

  } // namespace utils

} // namespace mark
