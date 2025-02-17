import PropTypes from 'prop-types';
import classNames from 'classnames';

const Container = ({ bgColor, borderColor, borderRadius, width, height, children, className }) => {
    const containerClasses = classNames(
        bgColor,
        borderColor,
        borderRadius,
        width,
        height,
        className
    );

    return (
        <div className={containerClasses}>
            {children}
        </div>
    );
};

Container.propTypes = {
    bgColor: PropTypes.string,
    borderColor: PropTypes.string,
    borderRadius: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Container.defaultProps = {
    bgColor: 'bg-black',
    borderColor: 'border border-secondary',
    borderRadius: 'rounded-xl',
};

export default Container;



