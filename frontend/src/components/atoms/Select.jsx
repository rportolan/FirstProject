import PropTypes from 'prop-types';

const Select = ({ options, value, onChange }) => {
    return (
        <select
            className="w-48 mr-2 text-xs h-9 px-2 bg-tertiary border-secondary border rounded"
            value={value}
            onChange={onChange}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Select;


