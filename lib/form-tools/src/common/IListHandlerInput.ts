namespace form {

  export type order = 'desc' | 'asc' | '';

  /**
   * Входные параметры обработчику List
   */
  export interface IListHandlerInput {
    /**
     * Ключевое слово для поиску по базе данных
     */
    keyword?: string,
    /**
     * Значения для пагинации, где limit это число
     * записей на странице, offset это отступ от начала, а
     * total это общее количество записей
     */
    limit?: number,
    offset?: number,
    total?: number,
    /**
     * Значения для сортировки по полю
     */
    order?: order,
    orderBy?: string,
  };

} // namespace form
