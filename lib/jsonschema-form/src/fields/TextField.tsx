
/// <reference path="../utils/get.ts"/>

namespace form {

  const {
    Fragment,
    useState,
    useEffect,
  } = React;

  const {
    get
  } = utils;

  export namespace fields {

    export const TextField = ({object, name}: IEntity) => {

      const [text, setText] = useState('');

      useEffect(() => {
        setText(get(object, name));
      }, [object]);

      return (
        <Fragment>
          {text}
        </Fragment>
      );
    };

  } // namespace fields

} // namespace form
