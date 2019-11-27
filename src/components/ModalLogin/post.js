import React from 'react';
import axios from 'axios';

export default class Posts extends React.Component {
    state = {
        email: '',
        senha: '',
        nome: 'Teste',
    }

    handleEmail = event => {
        this.setState({ email: event.target.value });
    }
    
    handleSenha = event => {
        this.setState({ senha: event.target.value });
    }

    handleLogin = event => {
        this.setState({nome: this.state.email})
        console.log(this.state.nome)
    }

    Login = event => {
        event.preventDefault();

        document.cookie = 'isLogged';

    const Post = {
        email: this.state.email,
        senha: this.state.senha
    }

    axios.post(`http://localhost:3001/api/users/${this.state.email}`, Post)
        .then(res => {
            console.log(res.data)
        })
        window.location.reload()
    }

    render() {
        return (
            <>
                <form onSubmit={this.Login}>
                    <input type="email" placeholder="Email" onChange={this.handleEmail} autoComplete='off'/>
                    <input type="password" placeholder="Senha" onChange={this.handleSenha} autoComplete='off'/>
                    <input type="submit" value='Enviar'  onClick={this.handleLogin} />
                </form>
            </>
        )
    }
}