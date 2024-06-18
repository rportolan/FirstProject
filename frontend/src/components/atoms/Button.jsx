import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ className, children, ...props }) => {
    const baseClasses = "w-48 text-xs h-7 bg-zinc-900 border-zinc-800 border rounded";
    
    return (
        <button className={classNames(baseClasses, className)} {...props}>
            {children}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Button;
