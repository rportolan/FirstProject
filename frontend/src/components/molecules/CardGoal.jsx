import ProgressBar from "../atoms/ProgressBar";
import Tag from "../atoms/Tag";
import classNames from "classnames";
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

const CardGoal = ({ id, title, progress, isSubGoal = false }) => {
  let cardColor;

  if (progress === 0) {
    cardColor = 'bg-red-400';
  } else if (progress === 100) {
    cardColor = 'bg-green-400';
  } else {
    cardColor = 'bg-indigo-400';
  }

const baseClasses = "md:w-full min-w-[250px] mt-2 h-28 pb-6 pt-0.5 px-4 rounded-lg";

const cardContent = (
  <div className={classNames(baseClasses, cardColor)}>
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm truncate max-w-[70%] sm:max-w-[150px]">
          {title}
        </h4>
        <div className="ml-2 flex-shrink-0">
          <Tag progress={progress} />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <ProgressBar progress={progress} max={100} className="mb-4 w-full" />
      </div>
    </div>
  </div>
);


  // Si c'est un sous-objectif, ne pas rendre la carte cliquable
  if (isSubGoal) {
    return cardContent;
  }

  return (
    <RouterLink to={`/goal/${id}`}>
      {cardContent}
    </RouterLink>
  );
};

CardGoal.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  isSubGoal: PropTypes.bool,
};

export default CardGoal;










