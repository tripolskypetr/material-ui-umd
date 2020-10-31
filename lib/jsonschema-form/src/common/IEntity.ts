
/// <reference path="./IField.ts"/>

namespace form {

  type exclude = 'defaultValue'

  /**
   * Объект сущность представляет собой поле прикладного
   * программииста, расширенное входным параметром и
   * коллбеком изменения для внутренней организации
   * работы. ВАЖНО - изменение поля влечет изменение
   * всего целевого объекта, следуя паттерну immutable
   */
  export interface IEntity extends Omit<IField, exclude> {
    change?: (object) => void;
    object: object;
  }

} // namespace form
