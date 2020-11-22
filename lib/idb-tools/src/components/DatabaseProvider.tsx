namespace idb {

  const {
    createContext,
    useContext,
    useEffect,
    useState,
  } = React;

  const DatabaseContext = createContext(null);

  export interface IDatabaseProviderProps extends OpenDBCallbacks<any> {
    name?: string;
    version?: number;
    children?: React.ReactNode;
  }

  export const DatabaseProvider = ({
    name = 'idb-tools',
    version = 1,
    children = null,
    ...otherProps
  }: IDatabaseProviderProps) => {
    const [db, setDB] = useState(null);
    useEffect(() => {
      const process = async () => {
        const db = await openDB(name, version, otherProps);
        setDB(db);
      };
      process();
    }, []);
    return (
      <DatabaseContext.Provider value={() => db}>
        {db && children}
      </DatabaseContext.Provider>
    );
  };

  export type useDBHook = <DBTypes extends DBSchema | unknown = unknown>() => IDBPDatabase<DBTypes>;
  export const useDB: useDBHook = () => useContext(DatabaseContext)();

} // namespace idb
