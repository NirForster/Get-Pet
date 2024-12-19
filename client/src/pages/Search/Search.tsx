import { Input } from '@/components/ui/input';
import { FiSearch } from 'react-icons/fi';
import PetCard from '../../pages/gridSearch/gridSearch';

const Search = () => {
  return (
    <>
      <div className="relative w-full max-w-md">
        <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <Input placeholder="Search for dog-sitter" className="pl-10" />
      </div>
      <PetCard />
    </>
  );
};

export default Search;
