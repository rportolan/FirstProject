import PropTypes from 'prop-types';
import Icon from './Icon';
import iconSearch from '../../assets/iconSearch.svg';

const SearchBar = ({ placeholder, value, onChange }) => {
    return (
        <div className="relative">
            <input
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-96 text-xs h-7 px-2 pl-10 bg-zinc-900 border-zinc-800 border rounded"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon iconPath={iconSearch} iconWidth="16" iconHeight="16" />
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

