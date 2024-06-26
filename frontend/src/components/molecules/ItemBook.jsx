import Container from "../atoms/Container";
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';


const ItemBook = ({ message, id }) => {
    return(
        <>
            <RouterLink to={`/mybook/${id}`}>
                <Container className="mt-4 mx-2 p-4">
                    <div className="flex justify-between items-center">
                        <h4 className="text-xs">Travailler tous les jours</h4>
                        <span className="text-xss">Conseil</span>
                    </div>
                    <div className="min-h-48 max-h-48 w-full overflow-y-auto mt-4 bg-secondary px-4 py-2 rounded">
                        <p className="text-smm mt-3">{message}</p>
                    </div>
                </Container>
            </RouterLink>
        </>
    )
}
ItemBook.propTypes = {
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};
export default ItemBook;