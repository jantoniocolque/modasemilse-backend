import axios from 'axios';

//let defaults = require('./defaults');
import defaults from './defaults';

const url = 'users/'

let usersResource = {
    login: function(){
        return axios.post('localhost:3000/v1/users/login', {
            email: 'emilse@modas.com',
            password: 'emilsemodas'
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    login2: function(){
        return axios ({
            ...defaults,
            method : 'POST',
            url : url + 'login',
            body : {
                user : 'emilse@modas.com',
                password : 'emilsemodas'
            }
        })
    }
};

export default usersResource;