import PropTypes from 'prop-types';
import classNames from 'classnames';

const Tag = ({ progress }) => {
    let status;
    let tagColor;

    if (progress === 0) {
        status = 'En attente';
        tagColor = 'bg-red-700';
    } else if (progress === 100) {
        status = 'Terminé';
        tagColor = 'bg-green-700';
    } else {
        status = 'En cours';
        tagColor = 'bg-indigo-700';
    }

    const baseClasses = 'text-xss px-2 py-1 text-white rounded-full';

    return (
        <div>
            <span className={classNames(baseClasses, tagColor)}>
            {status}
            </span>
            <div className='mt-1.5'></div>
        </div>
        
    );
};

Tag.propTypes = {
    progress: PropTypes.number.isRequired,
};

export default Tag;
