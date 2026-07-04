import { ISavedCity } from "@/utils/weatherInterfaces";

export const profileService = () => {
  const getSavedCities = async (
    userId: string | undefined,
  ): Promise<ISavedCity[]> => {
    const res = await fetch(`/api/users/${userId}/cities`);

    if (!res.ok) throw new Error("Failed to fetch saved cities");
    return res.json();
  };

  const saveCity = async (
    userId: string,
    name: string,
    country: string,
  ): Promise<ISavedCity> => {
    const res = await fetch("/api/city/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, name, country }),
    });

    if (!res.ok) throw new Error("Failed to save city");
    return res.json();
  };

  const deleteSavedCity = async (cityId: string): Promise<void> => {
    await fetch(`/api/city/delete/${cityId}`, {
      method: "DELETE",
    });
  };

  return {
    getSavedCities,
    saveCity,
    deleteSavedCity,
  };
};
