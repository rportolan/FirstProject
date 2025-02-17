import PropTypes from 'prop-types';
import classNames from 'classnames';

const ProgressBar = ({ max, className, progress }) => {
  const percentage = max ? (progress / max) * 100 : 0;

  // Déterminer la couleur de la barre de progression
  const progressColor = progress === 0 
      ? 'bg-red-700' 
      : progress === max 
          ? 'bg-green-700' 
          : 'bg-indigo-700';

  const baseClasses = 'w-56 bg-gray-200 rounded h-2 overflow-hidden';
  const progressClasses = classNames(progressColor, 'h-full rounded-full transition-all duration-500 ease-in-out'); // Ajout de la transition

  // Définir une largeur minimale pour la barre de progression
  const progressWidth = progress === 0 ? '4%' : `${percentage}%`;

  return (
    <div className='w-full'>
      <div className='flex justify-between mb-1'>
        <p className='text-xs'>Progression</p>
        <p className='text-xs'>{percentage.toFixed(2)}%</p>
      </div>
      <div className={classNames(baseClasses, className)}>
        <div
          className={progressClasses}
          style={{ width: progressWidth }}
        ></div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  max: PropTypes.number.isRequired,
  className: PropTypes.string,
  progress: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  className: '',
};

export default ProgressBar;




