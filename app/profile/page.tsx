"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SavedCity } from "@/components/SavedCity";
import { ISavedCity } from "@/utils/weatherInterfaces";
import { profileService } from "@/services/profileService";

const MyProfile = () => {
  const { getSavedCities, deleteSavedCity } = profileService();
  const { data: session }: any = useSession();
  const [savedCities, setSavedCities] = useState([]);

  const getCities = async () => {
    try {
      const res = await getSavedCities(session?.user?.id);
      setSavedCities(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (data: ISavedCity) => {
    const hasConfirmed = confirm("Are you sure you want to delete this city?");
    if (hasConfirmed) {
      try {
        await deleteSavedCity(data._id);
        await getCities();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (session?.user?.email) getCities();
  }, []);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Welcome to your profile</span>
      </h1>
      <p className="desc text-left">Here you can find your saved cities</p>
      <div className="mt-10 prompt_layout">
        {savedCities.length !== 0 ? (
          savedCities.map((city: ISavedCity) => (
            <SavedCity key={city._id} data={city} onDelete={handleDelete} />
          ))
        ) : (
          <h1>You have no saved cities</h1>
        )}
      </div>
    </section>
  );
};

export default MyProfile;
