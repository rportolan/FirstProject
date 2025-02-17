import PropTypes from 'prop-types';

const Textarea = ({ placeholder, className, value, onChange }) => {
    return (
        <textarea
            placeholder={placeholder}
            className={`p-2 bg-tertiary border-secondary mb-4 border rounded text-xs ${className}`}
            value={value}
            onChange={onChange}
        />
    );
};

Textarea.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

Textarea.defaultProps = {
    placeholder: '',
    className: '',
};

export default Textarea;

