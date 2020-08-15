
/// <reference path="./IListHandlerInput.ts"/>

namespace form {

  /**
   * Обработчик List должен вернуть объект с массивом items.
   * Хорошим тоном является дублировать входные параметры на
   * выходе...
   */
  export interface IListHandlerResult extends IListHandlerInput {
    items: any[],
  };

} // namespace form
