import { profileService } from "@/services/profileService";
import { ISavedCity } from "@/utils/weatherInterfaces";
import { useEffect, useState } from "react";

export const useSavedCitiesList = (userId: any) => {
  const [savedCities, setSavedCities] = useState<ISavedCity[]>([]);
  const { getSavedCities, deleteSavedCity } = profileService();

  const getCities = async () => {
    try {
      const res = await getSavedCities(userId);
      setSavedCities(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCity = async (cityId: string) => {
    try {
      await deleteSavedCity(cityId);
      await getCities();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    getCities();
  }, [userId]);

  return { savedCities, handleDeleteCity };
};
