import PropTypes from 'prop-types';
import ItemBook from '../molecules/ItemBook';
import Icon from '../atoms/Icon';
import iconArrowLeft from '../../assets/iconArrowLeft.svg';
import iconArrowRight from '../../assets/iconArrowRight.svg';

import { useState } from 'react';


const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === items.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative w-full overflow-hidden">
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {items.map((item, index) => (
                    <div key={index} className="mb-3 p-4 min-w-full">
                        <ItemBook 
                            title={item.title}
                            message={item.message} 
                            tag={item.tag} 
                        />
                    </div>
                ))}
            </div>
            <div className='flex justify-center mb-3'>
                <button onClick={prevSlide} className="m-2 text-xss bg-secondary border border-tertiary p-2 rounded">
                    <Icon iconPath={iconArrowLeft} />
                </button>
                <button onClick={nextSlide} className="m-2 text-xss bg-secondary border border-tertiary p-2 rounded">
                    <Icon iconPath={iconArrowRight}/>
                </button>
            </div>
        </div>
    );
};

Carousel.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
    })).isRequired,
};

export default Carousel;

