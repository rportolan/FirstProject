import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';
import iconArrowDown from '../../assets/iconArrowDown.svg';
import iconArrowUp from '../../assets/iconArrowUp.svg';
import { useState } from 'react';

const ExpandableContainer = ({ title, content }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="border border-secondary rounded p-4 mb-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleExpand}>
                <h2>{title}</h2>
                {isExpanded ? (
                    <Icon iconPath={iconArrowUp} />
                ) : (
                    <Icon iconPath={iconArrowDown} />
                )}
            </div>
            {isExpanded && (
                <div className="mt-4">
                    <p>{content}</p>
                </div>
            )}
        </div>
    );
};

ExpandableContainer.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default ExpandableContainer;
