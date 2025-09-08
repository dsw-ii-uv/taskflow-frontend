// ReloadContext.tsx
import { createContext, useContext, useState } from "react";

type ReloadContextType = {
  reloadKey: number;
  triggerReload: () => void;
};

const ReloadContext = createContext<ReloadContextType | undefined>(undefined);

export const ReloadProvider = ({ children }: { children: React.ReactNode }) => {
  const [reloadKey, setReloadKey] = useState(0);

  const triggerReload = () => {
    setReloadKey((prev) => prev + 1); // incrementa para forzar render
  };

  return (
    <ReloadContext.Provider value={{ reloadKey, triggerReload }}>
      {children}
    </ReloadContext.Provider>
  );
};

export const useReload = () => {
  const ctx = useContext(ReloadContext);
  if (!ctx) throw new Error("useReload debe usarse dentro de ReloadProvider");
  return ctx;
};
