import PropTypes from 'prop-types';
import { IoIosCloseCircle } from "react-icons/io";

const Modal = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 ease-in-out" 
                onClick={onClose}
            ></div>

            {/* Contenu de la modale */}
            <div className="relative bg-tertiary border border-secondary p-6 rounded-lg shadow-2xl z-10 max-w-lg w-full mx-4 md:mx-0 max-h-[80vh] overflow-y-auto">
                {/* Bouton de fermeture */}
                <button 
                    onClick={onClose} 
                    className="absolute text-red-400 text-xl top-3 right-4"
                >
                    <IoIosCloseCircle />
                </button>

                {/* Contenu */}
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;



