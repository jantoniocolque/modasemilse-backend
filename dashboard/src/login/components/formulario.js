import React , {Component} from 'react';
import modasLogo from '../../assets/images/logo512.png';

class formulario extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : null,
            password : null,
            login:false,
            error:"",
        }
    }
    
    apiCall(url, consecuencia){
        fetch(url)
        .then( response => response.json())
        .then( data => consecuencia(data))
        .catch( e => console.log(e))
    }
    storeToken(){
        let store = JSON.parse(localStorage.getItem('login'));
        this.setState({login:true,store: store.store});
    }

    login(){
        fetch("http://localhost:3000/v1/users/login",{
            method : 'POST',
            body : JSON.stringify(this.state),
            headers:{'Content-Type':'application/json'},
        }).then((response)=>{
            return response.json();
        }).then((result)=>{
            if(result.token != undefined){
                localStorage.setItem('login',JSON.stringify({
                    login:true,
                    store:result.token
                }));
                this.storeToken();
            }
            else{
                this.setState({error:result});
            }
        }).catch(e => {
            console.log(e);
        });
    }

    render(){
        return (
            <div className = "row login-page">
                <div className = "login-form">
                    <img src={modasLogo} width="60" alt='' />
                    {
                        (localStorage.getItem('login') != null)?
                        <div>
                            {window.location.href="http://localhost:3001/home"}
                        </div>
                        :
                        <div>
                            <p className="error">{this.state.error}</p>
                        </div>
                    }
                    <input type="email" className="form-control email" onChange={(event) =>{this.setState({email:event.target.value})}} name="email" id="email" placeholder="Tu correo"/>
                    <br />
                    <input type="password" className="form-control password" onChange={(event) =>{this.setState({password:event.target.value})}} name="password" id="password" placeholder="Tu contraseña"/>
                    <br/>
                    <button type="submit" className="col-12" onClick={()=>{this.login()}}>
                        Iniciar sesión <i className="fas fa-chevron-right"></i><i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default formulario;