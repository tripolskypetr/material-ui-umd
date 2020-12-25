
/// <reference path="./interop.ts"/>
/// <reference path="./common/index.ts"/>
/// <reference path="./utils/index.ts"/>
/// <reference path="./hooks/index.ts"/>
/// <reference path="./components/index.ts"/>

/// <reference path="./common/TypedField.ts"/>

namespace form {

  const {
    One: OneDefault,
    List: ListDefault,
    OneTyped: OneTypedDefault,
    Scaffold: ScaffoldDefault,
    Breadcrumbs: BreadcrumbsDefault,
  } = components;

  const {
    compose: composeDefault,
    createKey: createKeyDefault,
  } = utils;

  export const One = OneDefault;
  export const List = ListDefault;
  export const OneTyped = OneTypedDefault;
  export const Scaffold = ScaffoldDefault;
  export const Breadcrumbs = BreadcrumbsDefault;

  export const compose = composeDefault;
  export const createKey = createKeyDefault;

} // namespace form
