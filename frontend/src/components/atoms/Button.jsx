import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ className, event, children, ...props }) => {
    const baseClasses = "md:w-48 w-32 md:text-xs text-smm h-9 border-secondary border rounded";
    
    return (
        <button onClick={event} className={classNames(baseClasses, className)} {...props}>
            {children}
        </button>
    );
};

Button.propTypes = {
    event: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Button;
