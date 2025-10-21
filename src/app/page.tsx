"use client";

export default function Page() {
  return (
    <div className="flex flex-col items-start justify-center mt-20 w-2/3">
      <h1 className="text-6xl font-bold mb-4">
        Showroom
      </h1>
      <p className="text-gray-300 mb-6 text-sm md:text-base lg:text-lg">
        Your ultimate destination to explore and manage your favorite cars.
      </p>

      <div className="w-full flex overflow-x-auto space-x-4 pb-4">
        {[1, 2, 3, 4, 5].map((car) => (
          <div
            key={car}
            className="min-w-[200px] p-4 flex-shrink-0"
          >
            <div className="bg-gray-700 h-32 rounded mb-4 flex items-center justify-center">
              <span className="text-gray-500">Car Image {car}</span>
            </div>
            <h2 className="text-lg font-semibold mb-2">Car Model {car}</h2>
            <p className="text-gray-400 text-sm">Brief description of Car Model {car}.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
