import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import { ToastContainer, toast } from 'react-toastify';
import { registerRoute } from '../utils/APIRoutes';
import FormContainer from '../styled-components/FormContainer';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import toastOptions from '../utils/ToastOptions';


const Register = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user'))
            navigate('/');
    }, [navigate]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (handleValidation()) {
            const { password, username, email } = user;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
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
        const { password, confirmPassword, username, email } = user;
        if (username.length < 6) {
            toast.error(
                "Username should contain at least 6 characters.",
                toastOptions
            );
            return false;
        }
        else if (email === "") {
            toast.error(
                "Email is required.",
                toastOptions
            );
            return false;
        }
        else if (password.length < 8) {
            toast.error(
                "Password should contain at least 8 characters.",
                toastOptions
            );
            return false;
        }
        else if (password !== confirmPassword) {
            toast.error(
                "You should confirm your password.",
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
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={e => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={e => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={e => handleChange(e)}
                    />
                    <button type="submit">
                        Create User
                    </button>
                    <span>
                        already have an account ? {" "}
                        <Link to="/login">Login</Link>
                    </span>
                </form>
            </FormContainer >
            <ToastContainer />
        </>
    )
};


export default Register;