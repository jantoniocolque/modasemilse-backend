import React, {Component} from 'react';
import CardIndividual from'./CardIndividual'

class AllProducts extends Component {
    constructor(props){
        super(props);
        this.state = {
            productsTotal : ""
        }
    }
    
    apiCall(url, consecuencia){
        fetch(url)
        .then( response => response.json())
        .then( data => consecuencia(data))
        .catch( e => console.log(e))
    }
    
    componentDidMount(){
        this.checkApiData();
    }
    
    checkApiData(){
        this.apiCall('http://localhost:3000/v1/products/', this.displayData);
    }
    
    displayData = (data) => {
        this.setState(
            {
                productsTotal : data.meta.total
            }
            )
        }

        render(){
            let contenido;
            
            if(this.state.productsTotal === ""){
                contenido = <div class="spinner-border text-info" role="status">
                                <span class="sr-only"></span>
                            </div>
            }else{
                contenido = this.state.productsTotal
            }
            
            return (
                <div className="col-md-4 mb-4">
                    <CardIndividual bordeColor="border-left-primary" titleColor="text-primary" title="Productos:" dato={contenido} icon="fas fa-box-open"/>
                </div>
                )
            }
        }
        
export default AllProducts;