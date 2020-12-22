namespace mobxApp {

  const {
    ItemService,
  } = services;

  export namespace hoc {

    export const withItemService = withService(ItemService, 'itemService');

  } // namespace hooks

} // namespace mobxApp
