import { ClientSafeProvider, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [provider, setProvider] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setUpProviders = async (): Promise<void> => {
      const response: Record<string, ClientSafeProvider> | null =
        await getProviders();
      setProvider(response);
    };

    setUpProviders();
  }, []);

  return { provider };
};
