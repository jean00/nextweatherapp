import { profileService } from "@/services/profileService";
import { useEffect, useState } from "react";

export const useSavedCity = (
  name: string,
  country: string,
  userId?: string,
) => {
  const [savedId, setSavedId] = useState<string | null>(null);
  const { getSavedCities, saveCity, deleteSavedCity } = profileService();

  useEffect(() => {
    if (!userId) return;
    getSavedCities(userId).then((list) => {
      const city = list.find((c) => c.name === name && c.country === country);
      if (city) setSavedId(city._id);
    });
  }, [userId, name, country]);

  const toggleSave = async () => {
    if (savedId) {
      await deleteSavedCity(savedId);
      setSavedId(null);
    } else {
      if (!userId) return;
      const res = await saveCity(userId, name, country);
      if (res?._id) setSavedId(res._id);
    }
  };

  return { savedId, toggleSave };
};
