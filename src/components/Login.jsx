// import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
// import React, { useRef, useState } from 'react';
// import app from '../firebase.config';
// import { Link } from 'react-router-dom';


// const auth = getAuth(app);

// const Login = () => {
//     const [error, setError] = useState('');
//     const [success , setSuccess] = useState('');
//     const emailRef = useRef;

//     const  handlelogin = event => {
//         event.preventDefault();
//         const form = event.target ;
//         const email = form.email.value ;
//         const password = form.password.value;
//         console.log(email, password);
// setError('');
//         if (!/(?=.*[A-Z])/.test(password)){
//             setError('add at least one uppercase');
//             return;
//         }
        
//         else if (!/(?=.*[0-9].*[0-9])/.test(password)){
//             setError('add at least two digits');
//             return;
//         }
        
//         else if (password.length<8){
//             setError('password must contain 8 characters');
//             return;
//         }
    
//         signInWithEmailAndPassword(auth, email, password)
//         .then(result => {
//             const loggedUser = result.user;
//             console.log(loggedUser)
//             if (!loggedUser.emailVerified) {

//             }
//             setSuccess('User login successful.');
//             setError('');
//         })
//         .catch(error => {
//             setError(error.message);
//         })

// }

// const handleresetPass = event =>{
//     const email = emailRef.current.value ;
//     if(!email){
//         alert('please provide your email address')
//     }

//     sendPasswordResetEmail(auth,email)
//     .then(() => {
//         alert('check your email')
//     })
//     .catch(error =>{
//         console.log(error);
//         setError(error.message)
//     })
// }

    
    
       
    

   
    

    
    
    

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handlelogin}>
//       <div className="form-group">
//         <label htmlFor="username">Email</label>
//         <input required type="text" ref={emailRef}  name='email' className="form-control" id="username" placeholder="Enter username" />
//       </div>
//       <div className="form-group">
//         <label htmlFor="password">Password</label>
//         <input required type="password" name='password' className="form-control" id="password" placeholder="Password" />
//       </div>
//       <input type="submit" value="Login" />
//     </form>
//     <p><small>Forgot password? please <button onClick={handleresetPass}>reset password</button></small></p>
//     <p>New to our site? please <Link to="/register">Register</Link></p>
//     <p className='text-danger'>{error}</p>
//     <p className='text-success'>{success}</p>
//         </div>
        
//     );
// };

// export default Login;
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import app from '../firebase.config';

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const handleLogin = event => {
        event.preventDefault();
        
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        // validation
        setError('');
        setSuccess('');
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Please add at least two uppercase.');
            return
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Please add a special character.');
            return
        }
        else if (password.length < 6) {
            setError('Password must be 6 characters long');
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                if (!loggedUser.emailVerified) {
console.log(loggedUser);
                }
                setSuccess('User login successful.');
                setError('');
            })
            .catch(error => {
                setError(error.message);
            })

    }

    const handleResetPassword = event => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide your email address to reset password')
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please check your email')
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })
    }

    return (
        <div className='w-25 mx-auto'>
            <h2>Please Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='email' ref={emailRef} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />

                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' className="form-control" id="password" placeholder="Password" required />
                </div>
                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>
            <p><small>New to this website? Please <Link to="/register">Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;