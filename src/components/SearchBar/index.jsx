import { GoSearch } from "react-icons/go";
import Context from "../../contexts";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types"

function SearchBar({ onSearch }) {
  const {locale, theme} = useContext(Context)
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <GoSearch className="text-gray-500 dark:text-gray-400" size={20} />
      </div>
      <input
        type="text"
        className={ (theme === 'light' ? 'text-gray-900 bg-gray-50 border-gray-300': 'text-white bg-gray-700 border-gray-600 placeholder-gray-400') + " block w-full p-4 ps-10 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"}
        placeholder={locale === 'id' ? "Pencarian..." : "Search..."}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default SearchBar;
