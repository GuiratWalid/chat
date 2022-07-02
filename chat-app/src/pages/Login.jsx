import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import { ToastContainer, toast } from 'react-toastify';
import { loginRoute } from '../utils/APIRoutes';
import FormContainer from '../styled-components/FormContainer';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import toastOptions from '../utils/ToastOptions';


const Login = () => {

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user'))
            navigate('/');
    }, [navigate]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (handleValidation()) {
            const { password, username } = user;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });
            if (!data.status)
                toast.error(data.msg, toastOptions);
            else {
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate("/");
            }
        }
    };

    const handleValidation = () => {
        const { password, username } = user;
        if (username.length === 0) {
            toast.error(
                "Username is required.",
                toastOptions
            );
            return false;
        }
        else if (password.length === 0) {
            toast.error(
                "Password is required.",
                toastOptions
            );
            return false;
        }
        return true;
    };

    const handleChange = e => {
        setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }));
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="brand">
                        <img
                            src={Logo}
                            alt="Friends Logo"
                        />
                        <h1>
                            الأصدقاء
                        </h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={e => handleChange(e)}
                        minLength="6"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={e => handleChange(e)}
                        minLength="8"
                    />
                    <button type="submit">
                        Login
                    </button>
                    <span>
                        you don't have an account ? {" "}
                        <Link to="/register">Register</Link>
                    </span>
                </form>
            </FormContainer >
            <ToastContainer />
        </>
    )
};


export default Login;