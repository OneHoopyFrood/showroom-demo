import { AutoDTO } from "@api/AutoDTO";


export const fetchAutos = async (): Promise<AutoDTO[]> => {
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `#graphql
        query Query {
          cars {
            make
            model
            year
            features
          }
        }`,
    }),
  });
  const res = await response.json();
  return res.data.cars;
};
