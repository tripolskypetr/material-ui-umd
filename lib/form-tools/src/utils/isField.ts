namespace form {

  export namespace utils {

    const layouts = [
      FieldType.Group,
      FieldType.Paper,
      FieldType.Expansion,
    ];

    export const isField = ({type, name}) => name && !layouts.includes(type);

  } // namespace utils

} // namespace form
