namespace other {

  export namespace components {


    export class ErrorBoundary extends React.Component<error.IErrorBoundaryProps, any> {

      static defaultProps = {
        ErrorPlaceholder: null,
      };

      constructor(props) {
        super(props);
        this.state = { hasError: false };
      }

      static getDerivedStateFromError() {
        return { hasError: true };
      }

      componentDidCatch(error, errorInfo) {
        this.props.onError(error, errorInfo);
      }

      render() {
        if (this.state.hasError) {
          return this.props.ErrorPlaceholder;
        }

        return this.props.children;
      }

    } // class ErrorBoundary

  } // namespace components

} // namespace other
