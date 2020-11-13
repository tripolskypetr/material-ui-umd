
/// <reference path="./common/index.ts"/>
/// <reference path="./components/index.ts"/>

namespace other {

  const {
    SnackProvider: SnackProviderDefault,
    useSnack: useSnackDefault,
  } = components;

  export namespace snack {
    export const SnackProvider = SnackProviderDefault;
    export const useSnack = useSnackDefault;
  } // namespace snack

} // namespace other
