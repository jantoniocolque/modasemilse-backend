import React, {Component} from 'react';
import CardIndividual from'./CardIndividual'

class AllUsers extends Component {
    constructor(props){
        super(props);
        this.state = {
            usersTotal : ""
        }
    }
    
    apiCall(url, consecuencia){
        let store = JSON.parse(localStorage.getItem('login'));
        fetch(url,{
            method : 'GET',
            headers:{'token':store.store},
        })
        .then( response => response.json())
        .then( data => consecuencia(data))
        .catch( e => console.log(e))
    }
    
    componentDidMount(){
        this.checkApiData();
    }
    
    checkApiData(){
        this.apiCall('http://localhost:3000/v1/users/', this.displayData);
    }
    
    displayData = (data) => {
        this.setState(
            {
                usersTotal : data.meta.total
            }
            )
        }

        render(){
            let contenido;
            
            if(this.state.usersTotal === ""){
                contenido = <div className="spinner-border text-info" role="status">
                                <span className="sr-only"></span>
                            </div>
            }else{
                contenido = this.state.usersTotal
            }
            
            return (
                <div className="col-md-4 mb-4">
                <CardIndividual bordeColor="border-left-success" titleColor="text-success" title="Usuarios:" dato={ contenido } icon="fas fa-users"/>
                </div>
                )
            }
        }
        
export default AllUsers;