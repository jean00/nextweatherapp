export const profileService = () => {
  const getSavedCities = async (userId: string | undefined) => {
    const res = await fetch(`/api/users/${userId}/cities`);

    if (res.ok) return await res.json();

    return;
  };

  const saveCity = async (userId: string, name: string, country: string) => {
    const res = await fetch("/api/city/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, name, country }),
    });

    if (res.ok) return await res.json();

    return res.status;
  };

  const deleteSavedCity = async (cityId: string) => {
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
