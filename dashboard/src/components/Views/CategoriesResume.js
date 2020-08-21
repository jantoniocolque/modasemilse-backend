import React from 'react';
import Category from '../Category'


class CategoriesResume extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        categoriesOnDB : ""
    }
}

apiCall(url, consecuencia){
    let store = JSON.parse(localStorage.getItem('login'));
    fetch(url,{
        method : 'GET',
        headers : {'token':store.store},
    })
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
            categoriesOnDB : data.meta.categorys
        }
        )
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

render(){
    let cat;
    let allCategories = this.state.categoriesOnDB
    //let categoriesTotal = this.counter(this.state.categoriesOnDB); -->not fully implemented yet

    let categoriesAv = [];

    for(cat in allCategories) {
        categoriesAv.push(<Category bgcolor="bg-info" txtcolor="text-white" text={ cat } />)
    }

    if(categoriesAv.length < 3){
        categoriesAv.push(
            <div className="spinner-border text-info" role="status">
                    <span className="sr-only"></span>
            </div>
        )
    }

    return (
      <div className="container-fluid">
				<div className="d-sm-flex align-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-800">Categorías:</h1>
				</div>
				<hr />
				  <div className="card-body">
              <div className="row">
                      {
                          categoriesAv.map((oneCat, i) => <div key={oneCat + i} className="col-lg-6 mb-4"> { oneCat } </div>)
                      }
              </div>
          </div>
		  </div>
    )
}
}

export default CategoriesResume