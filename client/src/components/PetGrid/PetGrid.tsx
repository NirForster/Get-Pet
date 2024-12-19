import { useState, useEffect, useRef } from "react";
import { Dog, Cat, Heart } from "lucide-react";

const PetCard = ({ pet }) => {
  const associationStyles = {
    "Paws & Care": "bg-blue-100 text-blue-600",
    "Happy Tails": "bg-green-100 text-green-600",
    "Pet Haven": "bg-purple-100 text-purple-600",
    default: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="bg-white rounded-lg p-3 md:p-4 shadow-lg flex flex-col gap-2 md:gap-3 w-full">
      <div className="flex justify-center">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center">
          {pet.type === "dog" ?
            <Dog className="w-6 h-6 md:w-8 md:h-8 text-gray-600" />
          : <Cat className="w-6 h-6 md:w-8 md:h-8 text-gray-600" />}
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-semibold text-base md:text-lg">{pet.name}</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <div
          className={`flex items-center gap-1 ${pet.isAdopted ? "bg-pink-100 text-pink-600" : "bg-green-100 text-green-600"} px-2 md:px-3 py-1 rounded-full`}
        >
          {pet.isAdopted && (
            <Heart className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" />
          )}
          <span className="text-xs md:text-sm">
            {pet.isAdopted ? "Adopted" : "Available"}
          </span>
        </div>

        <span
          className={`${associationStyles[pet.association] || associationStyles.default} px-2 md:px-3 py-1 rounded-full text-xs md:text-sm`}
        >
          {pet.association}
        </span>
      </div>
    </div>
  );
};

const PetGrid = ({
  initialPets = [],
  onLoadMore,
  loading = false,
  enableInfiniteScroll = true,
  itemsPerPage = 8,
  title = "",
}) => {
  const [pets, setPets] = useState(initialPets);
  const [page, setPage] = useState(1);
  const scrollContainerRef = useRef(null);
  const loaderRef = useRef(null);

  // Default pet generation if no onLoadMore provided
  const generateDefaultPets = async () => {
    const names = [
      "Luna",
      "Max",
      "Bella",
      "Charlie",
      "Lucy",
      "Cooper",
      "Daisy",
      "Milo",
      "Lily",
      "Rocky",
    ];
    const associations = ["Paws & Care", "Happy Tails", "Pet Haven"];
    const types = ["dog", "cat"];

    const newPets = Array.from({ length: itemsPerPage }, (_, index) => ({
      id: pets.length + index + 1,
      name: names[Math.floor(Math.random() * names.length)],
      type: types[Math.floor(Math.random() * types.length)],
      isAdopted: Math.random() > 0.5,
      association:
        associations[Math.floor(Math.random() * associations.length)],
    }));

    return new Promise((resolve) => setTimeout(() => resolve(newPets), 1000));
  };

  const fetchMorePets = async () => {
    if (onLoadMore) {
      const newPets = await onLoadMore(page, itemsPerPage);
      setPets((prevPets) => [...prevPets, ...newPets]);
    } else {
      const newPets = await generateDefaultPets();
      setPets((prevPets) => [...prevPets, ...newPets]);
    }
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (enableInfiniteScroll) {
      const observer = new IntersectionObserver(
        (entries) => {
          const firstEntry = entries[0];
          if (firstEntry.isIntersecting && !loading) {
            fetchMorePets();
          }
        },
        {
          root: scrollContainerRef.current,
          threshold: 0.1,
        }
      );

      if (loaderRef.current) {
        observer.observe(loaderRef.current);
      }

      return () => observer.disconnect();
    }
  }, [loading, enableInfiniteScroll]);

  useEffect(() => {
    if (pets.length === 0) {
      fetchMorePets();
    }
  }, []);

  return (
    <div className="flex flex-col h-full min-h-screen max-h-screen p-3 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{title}</h2>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto -mx-3 md:mx-0"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 p-3 md:p-5">
          {pets.map((pet, index) => (
            <PetCard key={index} pet={pet} />
          ))}
        </div>

        {enableInfiniteScroll && (
          <div ref={loaderRef} className="flex justify-center p-4">
            {loading && (
              <div className="text-gray-500">Loading more pets...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetGrid;
