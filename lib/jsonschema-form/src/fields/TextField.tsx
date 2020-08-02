
/// <reference path="../utils/get.ts"/>

namespace form {

  const {
    Fragment,
    useState,
    useEffect,
  } = React;

  export namespace internal {

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

  } // namespace internal

} // namespace form
