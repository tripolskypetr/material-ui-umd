namespace other {

  export namespace components {

    const fallback = (key) => {
      console.warn(`TranslationProvider unknown key: "${key}"`);
      return key;
    };

    export const TranslationProvider = ({
      children = null,
      locale = {},
    }: i11n.ITranslationProviderProps) => (
      <TranslationContext.Provider value={(key: string) => locale[key] || fallback(key)}>
        {children}
      </TranslationContext.Provider>
    );

  } // namespace components

} // namespace other
