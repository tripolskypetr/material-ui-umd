
/// <reference path="./common/index.ts"/>
/// <reference path="./components/index.ts"/>

namespace snack {

  const {
    SnackProvider: SnackProviderDefault,
    useSnack: useSnackDefault,
  } = snack.components;

  export const SnackProvider = SnackProviderDefault;
  export const useSnack = useSnackDefault;

} // namespace snack
