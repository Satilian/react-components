export interface IIndexConfig {
  key: string;
  IConfig?: Record<string, unknown>;
}

export interface ITabelConfig {
  name: string;
  rows: Record<string, unknown>[];
  indexes?: IIndexConfig[];
  TConfig?: Record<string, unknown>;
}

export const open = (varsion: number, dbData: ITabelConfig[]) => {
  return new Promise((resolve) => {
    const request = indexedDB.open("messanger", varsion);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => console.log(request.error);

    request.onupgradeneeded = () => {
      dbData.forEach(({ name, rows, TConfig, indexes }) => {
        const table = request.result.createObjectStore(name, {
          autoIncrement: true,
          keyPath: "id",
          ...TConfig,
        });

        indexes?.forEach(({ key, IConfig }) =>
          table.createIndex(key, key, { unique: true, ...IConfig })
        );

        rows.forEach((row) => table.add(row));
      });
    };
  });
};

export const remove = () => {
  return new Promise<void>((resolve) => {
    indexedDB.deleteDatabase("messanger").onsuccess = () => resolve();
  });
};
