import React, { Component } from "react";
import Spinner from "react-spinner-material";

// Assets //
import StreamLogo from "../../assets/stream_logo.svg";

// Components //
import Credit from "../../components/Credit";

// Styles //
import "./styles.scss";

class Login extends Component {
    state = {
        loading: false,
        username: "",
    };

    handleChange = ({ target: { name, value } }) =>
        this.setState({
            [name]: value,
        });

    handleSubmit = async (e) => {
        e.preventDefault();
        const { history } = this.props;
        const { username } = this.state;
        await this.setState({
            loading: true,
        });

		const response = await fetch('/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'cors',
			body: JSON.stringify({ username }) 
		});
		console.log(response);
		const data = await response.json();

		if (data) {
			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));
			history.push("/");
		} else {
			throw new Error('Something went wrong.')
		}
    };

    render() {
        const { loading, username } = this.state;
        return (
            <div className='login-root'>
                <div className='login-card'>
                    <img id='logo' src={StreamLogo} />
                    <p>
                        live.<span>stream</span>
                    </p>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            minLength='1'
                            name='username'
                            onChange={this.handleChange}
                            value={username}
                            placeholder='Pick a username'
                        />
                        <button className='primary' type='submit'>
                            {loading ? <Spinner size='16px' spinnerWidth={2} spinnerColor='white' /> : "Login"}
                        </button>
                    </form>
                </div>
                <Credit />
            </div>
        );
    }
}

export default Login;
