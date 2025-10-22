"use client";

import { AutoDTO } from "@api/AutoDTO";
import { useEffect, useState } from "react";
import { ActionButton } from "../components/ActionButton";
import { fetchAutos } from "../services/AutoService";

export default function Page() {
  const [autos, setAutos] = useState<AutoDTO[]>([]);

  useEffect(() => {
    (async () => {
      setAutos(await fetchAutos());
    })();
  }, []);
  

  // const handleAddCar = async () => {
  //   const response = await fetch("http://localhost:4000/graphql", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       query: `#graphql
  //         mutation AddCar($make: String!, $model: String!, $year: Int!, $features: [String!]) {
  //           addCar(make: $make, model: $model, year: $year, features: $features) {
  //             success
  //             message
  //           }
  //         }
  //       `,
  //       variables: { make, model, year, features },
  //     }),
  //   });
  //   const data = await response.json();
  //   if (response.ok) {
  //     if (data.data.addCar.success) {
  //       alert("Car added successfully!");
  //     } else {
  //       alert(`Error: ${data.data.addCar.message}`);
  //     }
  //   } else {
  //     alert(`Error: ${data.message}`);
  //   }
  // };

  return (
    <div className="flex flex-col items-start justify-center mt-20 w-2/3">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

      <table className="w-full [&_th,&_td]:border-gray-700 [&_th,&_td]:border-b [&_th]:text-left">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Model</th>
            <th>Make</th>
            <th>Year</th>
            <th>Features</th>
          </tr>
        </thead>
        <tbody>
          {autos.map((auto) => (
            <tr key={auto.id} >
              <td>
                <ActionButton
                  type="delete"
                  onClick={async () => {
                    // TODO: replace with real delete handler (call API, update state)
                    console.log("delete", auto.id);
                  }}
                  ariaLabel={`Delete ${auto.make} ${auto.model}`}
                />
              </td>
              <td>
                <ActionButton
                  type="edit"
                  onClick={() => {
                    // TODO: replace with real edit handler (open form/modal or navigate)
                    console.log("edit", auto.id);
                  }}
                  ariaLabel={`Edit ${auto.make} ${auto.model}`}
                />
              </td>
              <td>{auto.make}</td>
              <td>{auto.model}</td>
              <td>{auto.year}</td>
              <td>
                <ul className="list-disc list-inside">
                  {auto.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} className="py-4 border-none">
              <ActionButton
                type="add"
                onClick={() => {  
                }}
                ariaLabel="Add New Auto"
              />
              Add a new auto
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
