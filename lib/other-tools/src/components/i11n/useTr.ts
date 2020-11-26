namespace other {

  const {
    createContext,
    useContext,
  } = React;

  export namespace components {

    type trFunc = (key: string) => string;

    const createTr = (tr: trFunc) => (
      template: TemplateStringsArray,
      ...substitutions: any[]
    ): string => template
      .map((tmpl, idx) => tr(tmpl) + (idx === substitutions.length ? '' : substitutions[idx]))
      .join('');

    export const TranslationContext = createContext<trFunc>(null);

    export const useTr = createTr(useContext(TranslationContext));

  } // namespace components

} // namespace other
