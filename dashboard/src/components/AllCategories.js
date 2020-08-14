import React, {Component} from 'react';
import CardIndividual from'./CardIndividual'

class AllCategories extends Component {
    constructor(props){
        super(props);
        this.state = {
            categoriesTotal : ""
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

    counter(toCount) {
        var length = 0;
        for( var key in toCount ) {
            if( toCount.hasOwnProperty(key) ) {
                ++length;
            }
        }
        return length;
    };
    
    displayData = (data) => {
        this.setState(
            {
                categoriesTotal : this.counter(data.meta.categorys)
            }
            )
        }

        render(){
            let contenido;
            
            if(this.state.categoriesTotal === ""){
                contenido = <div class="spinner-border text-info" role="status">
                                <span class="sr-only"></span>
                            </div>
            }else{
                contenido = this.state.categoriesTotal
            }
            
            return (
                <div className="col-md-4 mb-4">
                    <CardIndividual bordeColor="border-left-warning" titleColor="text-warning" title="Categorias:" dato={contenido} icon="fas fa-bookmark"/>
                </div>
                )
            }
        }
        
export default AllCategories;