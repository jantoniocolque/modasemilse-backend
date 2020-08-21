import React from 'react';
import TableForUsers from './Tables/TableForUsers'


class Products extends React.Component {
      constructor(props){
        super(props);
        this.state = {
            productsInDB : ""
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
                productsInDB : data.data
            }
            )
        }

  render() {
    return (
      <div className="container-fluid">
				<div className="d-sm-flex align-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-800">Usuarios:</h1>
				</div>
				<hr />
				<TableForUsers arrayInfo={ this.state.productsInDB }/>
		</div>
    )
  }
}

export default Products