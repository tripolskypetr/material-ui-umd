
/// <reference path="./IField.ts"/>

namespace form {

  /**
   * Объект сущность представляет собой поле прикладного
   * программииста, расширенное входным параметром и
   * коллбеком изменения для внутренней организации
   * работы. ВАЖНО - изменение поля влечет изменение
   * всего целевого объекта, следуя паттерну immutable
   */
  export interface IEntity extends IField {
    change?: (object) => void;
    object: object;
  }

} // namespace form
