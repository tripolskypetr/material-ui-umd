namespace form {

  export interface IListHandlerResult {
    /**
     * Обработчик List должен вернуть объект с массивом items.
     */
    items: any[],
    /**
     * Возвращает общее число элементов
     */
    total?: number,
  };

} // namespace form
