
/// <reference path="./common/index.ts"/>
/// <reference path="./components/index.ts"/>

namespace other {

  const {
    SnackProvider: SnackProviderDefault,
    useSnack: useSnackDefault,
  } = components;

  const {
    DispatchProvider: DispatchProviderDefault,
    connectState: connectStateDefault,
    useDispatch: useDispatchDefault,
  } = components;

  const {
    FetchProvider: FetchProviderDefault,
    useFetch: useFetchDefault,
  } = components;

  const {
    TranslationProvider: TranslationProviderDefault,
    useTr: useTrDefault,
  } = components;

  const {
    ErrorBoundary: ErrorBoundaryDefault,
  } = components;

  export namespace snack {
    export const SnackProvider = SnackProviderDefault;
    export const useSnack = useSnackDefault;
  } // namespace snack

  export namespace state {
    export const DispatchProvider = DispatchProviderDefault;
    export const useDispatch = useDispatchDefault;
    export const connect = connectStateDefault;
  } // namespace state

  export namespace fetch {
    export const FetchProvider = FetchProviderDefault;
    export const useFetch = useFetchDefault;
  } // namespace fetch

  export namespace i11n {
    export const TranslationProvider = TranslationProviderDefault;
    export const useTr = useTrDefault;
  } // namespace i11n

  export namespace error {
    export const ErrorBoundary = ErrorBoundaryDefault;
  } // namespace error

} // namespace other
