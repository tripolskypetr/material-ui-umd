namespace other {

  export namespace error {

    export class IErrorBoundaryProps {
      ErrorPlaceholder?: material.Component;
      onError: (error, errorInfo) => void;
      children?: React.ReactNode;
    }

  } // namespace eror

} // namespace other
