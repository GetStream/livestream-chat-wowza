import React, { Component } from "react";
import Spinner from "react-spinner-material";

// Utils //
import fetch from "utils/fetch";

// Components
import Logo from "components/Logo";
import Credit from "components/Credit";

// Styles //
import "./styles.css";

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
        const { data } = await fetch("post", "/v1/token", {
            username,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        history.push("/");
    };

    render() {
        const { loading, username } = this.state;
        return (
            <div className='login-root'>
                <div className='login-card'>
                    <Logo width={40} height={20} fill='#2f7deb' />
                    <p>
                        live.<span>stream</span>
                    </p>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            minLength='1'
                            name='username'
                            onChange={this.handleChange}
                            value={username}
                            placeholder='Enter a username'
                        />
                        <button type='submit'>
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
