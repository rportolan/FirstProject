import PropTypes from 'prop-types';
import classNames from 'classnames';

const Input = ({ type, placeholder, value, onChange, className, text }) => {
    return (
        <>
            <p className='mb-1 text-sm'>{text}</p>
            <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={classNames(
                'text-secondary border border-2 border-gray-400 rounded',
                className
            )}
            />
        </>
        
    );
};

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    text: PropTypes.string.isRequired
};

Input.defaultProps = {
    type: 'text',
    placeholder: '',
    className: '',
};

export default Input;
