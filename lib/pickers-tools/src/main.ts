
/// <reference path="./interop.ts"/>
/// <reference path="./utils/index.ts"/>
/// <reference path="./components/index.ts"/>

namespace pickers {

  const {
    TimeProvider: TimeProviderDefault,
    useTime: useTimeDefault,
    DateProvider: DateProviderDefault,
    useDate: useDateDefault,
    PromptProvider: PromptProviderDefault,
    usePrompt: usePromptDefault,
    RadioProvider: RadioProviderDefault,
    useRadio: useRadioDefault,
  } = components;

  export const TimeProvider = TimeProviderDefault;
  export const useTime = useTimeDefault;

  export const DateProvider = DateProviderDefault;
  export const useDate = useDateDefault;

  export const PromptProvider = PromptProviderDefault;
  export const usePrompt = usePromptDefault;

  export const RadioProvider = RadioProviderDefault;
  export const useRadio = useRadioDefault;

} // namespace pickers
