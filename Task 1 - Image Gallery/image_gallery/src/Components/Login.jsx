import { useEffect, useState } from 'react';
import './LoginCss.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [showSplash, setShowSplash] = useState(true);
    const [isLogin, setLogin] = useState(true)
    const [isRegister, setRegister] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const registerClick = () => {
        setLogin(false)
        setRegister(true)
    }
    const loginClick = () => {
        setLogin(true)
        setRegister(false)
    }

    const [registerForm, setRegisterForm] = useState({
        fullName: '',
        emailAddress: '',
        password: '',
        cpassword: ''
    })

    const [loginForm, setLoginForm] = useState({
        emailAddress: '',
        password: ''
    })

    const handleChange = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const onRegister = async (e) => {
        e.preventDefault()
        if (registerForm.password !== registerForm.cpassword) {
            toast.error('Password Must Be Same !!')
            setRegisterForm({
                password: '',
                cpassword: ''
            })
            return
        }
        if (registerForm.fullName === '' || registerForm.emailAddress === '' || registerForm.password === '' || registerForm.cpassword === '') {
            toast.error('All Fields Must Be Filled !!')
        }
        else {
            const res = await fetch('http://localhost:3200/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerForm)
            })
            const data = await res.json()
            if (data.status) {
                toast.success(data.message)
                setRegisterForm({
                    fullName: '',
                    emailAddress: '',
                    password: '',
                    cpassword: ''
                })
            } else {
                toast.error(data.message)
            }
        }
    }

    const onLogin = async (e) => {
        e.preventDefault()
        if (loginForm.username === '' || loginForm.password === '') {
            toast.error('Enter credentials to login !!')
            return
        }
        const res = await fetch('http://localhost:3200/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginForm)
        })
        const data = await res.json()
        if (data.status) {
            toast.success(data.message)
            navigate('/home')
            localStorage.setItem('username', loginForm.username);
            // console.log(username + " " + password)
        }
        else {
            toast.error(data.message)
            if (data.message === 'Login Failed !!') {
                setPassword('')
            } else {
                setPassword('')
                setUsername('')
            }
        }
    }

    const adminLogin = () => {
        navigate('/admin')
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false); // Hide splash screen after 2 seconds
        }, 3000);

        return () => clearTimeout(timer); // Cleanup timer
    }, []);

    return (
        <>
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                {showSplash ? (
                    <div className="splash-screen">
                        <h3 className='count'>1</h3>
                        <h1>Image Gallery</h1>
                    </div>
                ) : (
                    <div className="banner">
                        <div className={isLogin ? 'login' : 'register'}>
                            <div className="title">
                                <h2 className={isLogin ? 'active1' : ''} onClick={loginClick}>
                                    Login
                                </h2>
                                <h2 className={isRegister ? 'active2' : ''} onClick={registerClick}>
                                    Sign Up
                                </h2>
                            </div>
                            {isLogin && (
                                <form onSubmit={onLogin}>
                                    <div className="form-container">
                                        <div className="input-field">
                                            <label>
                                                Username <span>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={loginForm.username}
                                                onChange={handleEdit}
                                            ></input>
                                        </div>
                                        <div className="input-field">
                                            <label>
                                                Password <span>*</span>
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={loginForm.password}
                                                onChange={handleEdit}
                                            ></input>
                                        </div>
                                        <div className="action-button">
                                            <input type="submit" value="Login"></input>
                                        </div>
                                    </div>
                                </form>
                            )}
                            {isRegister && (
                                <form onSubmit={onRegister}>
                                    <div className="form-container">
                                        <div className="input-field">
                                            <label>
                                                Fullname <span>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={registerForm.fullName}
                                                onChange={handleChange}
                                            ></input>
                                        </div>
                                        <div className="input-field">
                                            <label>
                                                Username or Email Address <span>*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="emailAddress"
                                                value={registerForm.emailAddress}
                                                onChange={handleChange}
                                            ></input>
                                        </div>
                                        <div className="input-field">
                                            <label>
                                                Password <span>*</span>
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={registerForm.password}
                                                onChange={handleChange}
                                            ></input>
                                        </div>
                                        <div className="input-field">
                                            <label>
                                                Confirm Password <span>*</span>
                                            </label>
                                            <input
                                                type="password"
                                                name="cpassword"
                                                value={registerForm.cpassword}
                                                onChange={handleChange}
                                            ></input>
                                        </div>
                                        <div className="action-button">
                                            <input type="submit" value="Sign Up"></input>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                        <button className="adminBtn" onClick={adminLogin}>
                            Admin Login
                        </button>
                    </div>
                )}
            </>
        </>
    )
}
