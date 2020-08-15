namespace form {

  export interface IListHandlerResult {
    /**
     * Обработчик List должен вернуть объект с массивом items.
     */
    items: any[],
    /**
     * Значения для пагинации, где limit это число
     * записей на странице, offset это отступ от начала, а
     * total это общее количество записей
     */
    limit?: number,
    offset?: number,
    total?: number,
  };

} // namespace form
