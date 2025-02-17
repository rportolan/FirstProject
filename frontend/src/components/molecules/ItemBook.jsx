import Container from "../atoms/Container";
import PropTypes from 'prop-types';

const ItemBook = ({ message, title, tag }) => {
    return (
        <Container className="p-4 md:p-6 w-full bg-black shadow-md rounded-lg h-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-tertiary pb-2 mb-4">
                <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-0">{title}</h4>
                <span className="text-xs md:text-sm bg-tertiary px-2 py-1 rounded-full">{tag}</span>
            </div>
            <div className="h-32 md:h-48 bg-tertiary overflow-y-auto px-4 py-3 rounded-xl">
                <p className="text-xs md:text-sm leading-relaxed">{message}</p>
            </div>
        </Container>
    );
}


ItemBook.propTypes = {
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired
};

export default ItemBook;



