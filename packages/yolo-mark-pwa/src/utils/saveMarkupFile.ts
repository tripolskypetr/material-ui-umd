namespace mark {

  export namespace utils {

    export const saveMarkupFile = (content, name = 'file.txt') => {
      const url = window.URL.createObjectURL(new Blob([content], {
        type: 'text/plain'
      }));
      const a = document.createElement('a');
      [a.href, a.download] = [url, name];
      a.click();
    };

  } // namespace utils

} // namespace mark
