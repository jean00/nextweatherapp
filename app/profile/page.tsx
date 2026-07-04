"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { SavedCity } from "@/components/SavedCity";
import { ISavedCity } from "@/utils/weatherInterfaces";
import { useSavedCitiesList } from "@/hooks/use-saved-cities-list";

const MyProfile = () => {
  const { data: session }: any = useSession();
  const { savedCities, handleDeleteCity } = useSavedCitiesList(
    session?.user?.id,
  );

  const handleDelete = async (id: string) => {
    const hasConfirmed = confirm("Are you sure you want to delete this city?");
    if (hasConfirmed) {
      try {
        await handleDeleteCity(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

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
