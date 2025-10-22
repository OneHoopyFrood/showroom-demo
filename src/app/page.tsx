"use client";

import { AutoDTO } from "@api/AutoDTO";
import { useEffect, useState } from "react";
import AutoCard from "./components/AutoCard";
import { fetchAutos } from "./services/AutoService";


export default function Page() {
  const [autos, setAutos] = useState<AutoDTO[]>([]);

  useEffect(() => {
    (async () => {
      setAutos(await fetchAutos());
    })();
  }, []);

  return (
    <div className="flex flex-col items-start justify-center mt-20 w-2/3">
      <h1 className="text-6xl font-bold mb-4">
        Showroom
      </h1>
      <p className="text-gray-300 mb-6 text-sm md:text-base lg:text-lg">
        Your ultimate destination to explore and manage your favorite autos.
      </p>

      <div className="w-full flex overflow-x-auto space-x-4 pb-4">
        {autos.map((auto) => (
          <AutoCard key={auto.id} auto={auto} />
        ))}
      </div>
    </div>
  );
}
