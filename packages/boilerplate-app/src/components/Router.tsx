
/// <reference path="../pages/index.ts"/>

namespace boilerplate {

  const {
    BriefingPage,
    ComponentsPage,
  } = pages;

  const {
    connect
  } = ReactRedux;

  const {
    Fragment
  } = React;

  export namespace components {

    namespace internal {
      export const Router = ({type, args}) => {
        if (type === 'briefing') {
          return <BriefingPage {...args} />;
        } else if (type === 'components') {
          return <ComponentsPage {...args} />;
        } else {
          throw new Error('Router unknown route type');
        }
      };
    } // namespace internal

    const mapStateToProps = (state) => ({
      type: state.route.current.type,
      args: state.route.current.args
    });

    export const Router = connect(mapStateToProps)(internal.Router);

  } // namespace components

} // namespace boilerplate
