import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase.config';
import { Link } from 'react-router-dom';


const auth = getAuth(app);

const Register = () => {
    const [email , setEmail] = useState('');
    const [regerror , setRegerror] = useState('');
    const [success , setSuccess] = useState('');

    const handleemailchange = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);

    }
        const  handlepassblur = (event) => {
            console.log(event.target.value);
        }

        const regsubmit = (event) => {
            event.preventDefault();
            setSuccess('');
            setRegerror('');
            const email = event.target.email.value;
            const password = event.target.password.value;
            const name = event.target.name.value;
            console.log(email,password);
if (!/(?=.*[A-Z])/.test(password)){
    setRegerror('add at least one uppercase');
    return;
}

else if (!/(?=.*[0-9].*[0-9])/.test(password)){
    setRegerror('add at least two digits');
    return;
}

else if (password.length<8){
    setRegerror('password must contain 8 characters');
    return;
}



            createUserWithEmailAndPassword(auth, email,password)
            .then(result => {
                const loggeduser = result.user;
                console.log(loggeduser);
                setRegerror('');
                event.target.reset();
                setSuccess('Account created successfully');
                sendEmailVerification(result.user);
                updateUserData(result.user, name);
            })
            .catch(error =>{
                console.log(error.message);
                setRegerror(error.message);
            })
        
             const sendEmail = (user) => {
                sendEmailVerification(user)
                .then(result => {
                    console.log(result);
                    alert('please verify your email address')
                } )
            }
                const updateUserData = (user, name) => {
                    updateProfile(user, {
                        displayName: name
                    })
                        .then(() => {
                            console.log('user name updated')
                        })
                        .catch(error => {
                            setRegerror(error.message);
                        })
                }
                
             
            }
    return (
        <div>
            <h1>Register page</h1>
            <form onSubmit={regsubmit}>
<br />
<input  type="text" name="name" id="name" placeholder='Your Name' required /> <br />
                <input required onChange={handleemailchange} type="email" name="email" id="" placeholder='your mail' /> <br />

                <input required  onBlur={handlepassblur} type="password" name="password" id="" placeholder='password' /> <br />
                <input type="submit" value="Register" />
                <p className='text-danger'>{regerror}</p>
                <p className='text-success'>{success}</p>
            </form>
            <p>Already have an account? try <Link to="/login">Logging in</Link></p>
        </div>
    );
};

export default Register;