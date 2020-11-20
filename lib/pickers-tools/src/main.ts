
/// <reference path="./utils/index.ts"/>
/// <reference path="./components/index.ts"/>

namespace pickers {

  const {
    TimeProvider: TimeProviderDefault,
    useTime: useTimeDefault,
    DateProvider: DateProviderDefault,
    useDate: useDateDefault,
  } = components;

  export const TimeProvider = TimeProviderDefault;
  export const useTime = useTimeDefault;

  export const DateProvider = DateProviderDefault;
  export const useDate = useDateDefault;

} // namespace pickers
