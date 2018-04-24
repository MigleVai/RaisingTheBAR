import axios from 'axios';

export default function addTempCartCheck(islogged) {
    var array = localStorage.getItem('cartNotLogged');
    if (islogged === true && array !== null) {
        axios.post(`/api/Cart/AddTemporaryCartToDatabase`, JSON.parse(array))
            .then(res => {
                return res.data;
            })
            .catch(error => {
                return error.response.data;
            });
    }
}