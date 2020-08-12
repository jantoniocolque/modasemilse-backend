import axios from 'axios';

let loginData = require('./loginData');

const url = 'products/'

let productsResource = {
    login: function(){
        return axios ({
            ...loginData,
            method : 'GET',
            url : url + 'random',
            params : {
                api_key: 'Ip28j771T8gnDSra04H8eFlEjfoIjO4d'
            }
        })
    },
    trending : function(){

    },
    search : function(query){

    }
};

export default productsResource;