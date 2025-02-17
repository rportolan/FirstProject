import PropTypes from 'prop-types';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ placeholder, value, onChange }) => {
    return (
        <div className="relative text-center md:text-left">
            <input
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full md:w-96 text-xs h-9 px-2 pl-10 bg-black border-secondary border rounded"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch />
            </div>
        </div>
    );
};

SearchBar.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
    placeholder: 'Search...',
};

export default SearchBar;


