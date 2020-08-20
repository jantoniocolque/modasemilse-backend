import React from 'react';

class Products extends React.Component {

  render() {
    return (
        <div className="container-fluid">
			<div className="d-sm-flex align-items-center justify-content-between mb-4">
				<h1 className="notFound">Upsss! :(</h1>
                    <div class="spinner-grow text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
			</div>
			<hr />
			<div>
                <h3 className='notFound'>No hemos podido encontrar la página que buscas, Intenta de nuevo</h3>
                <br />
            </div>
		</div>
    )
  }
}

export default Products