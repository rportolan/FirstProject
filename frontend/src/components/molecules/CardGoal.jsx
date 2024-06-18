import ProgressBar from "../atoms/ProgressBar";
import Tag from "../atoms/Tag";
import classNames from "classnames";
import PropTypes from 'prop-types';

const CardGoal = ({ progress }) => {

        let cardColor;
    
        if (progress === 0) {
            cardColor = 'bg-red-400';
        } else if (progress === 100) {
            cardColor = 'bg-green-400';
        } else {
            cardColor = 'bg-indigo-400';
        }
        const basesClasses = "w-64 h-28 px-4 py-0.5 rounded-lg"
    return(
        <>
            <div className={classNames(basesClasses, cardColor)}>
                <div className="mt-5">
                    <div className="flex justify-between">
                        <h4 className="text-sm">Apprendre le piano</h4>
                        <Tag progress={progress}/>
                    </div>
                    <div className="flex justify-center mt-4">
                        <ProgressBar progress={progress} max={100} className="mb-4s w-full" />
                    </div>
                </div>
            </div>     
        </>
    )
}
CardGoal.propTypes = {
    progress: PropTypes.number.isRequired,
};

export default CardGoal;