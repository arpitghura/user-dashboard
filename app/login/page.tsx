'use client'
import React, { useState, useEffect, Fragment } from 'react';
import { toast } from 'react-toastify';

const MultiStepForm = () => {

    const formInitialState = {
        email: '',
        password: '',
        username: '',
        phone: '',
        name: '',
        created_at: new Date()
    };

    const [usernameError, setusernameError] = useState('')
    const [allUsernames, setAllUsernames] = useState<string[]>([]);
    const [allEmails, setAllEmails] = useState<string[]>([]);
    const [step, setStep] = useState(1);
    const [emailError, setEmailError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        phone: '',
        name: '',
        created_at: new Date()
    });

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!usernameError && !emailError && !phoneError) {
            setIsLoading(true);
            setIsFormVisible(false);
            try {
                const response = await fetch('/api/userData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })

                if (response.ok) {
                    console.log('User Added')
                    toast.success('User Added successfully!', { position: toast.POSITION.TOP_CENTER });
                    setFormData(formInitialState)
                    setStep(1)
                }
                else {
                    console.log('User was not added')
                }
            }
            catch (error) {
                console.log("Error:", error)
            }
            setIsLoading(false);
            setIsFormVisible(true);
        }
        else {
            console.log('Please enter a valid username')
        }
    };

    const getAllUsernamesAndEmail = async () => {
        try {
            const response = await fetch('/api/userData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const data = await response.json()
                const usrname = data.userData.map((user: { username: string }) => user.username)
                const emails = data.userData.map((user: { email: string }) => user.email)
                setAllUsernames(usrname)
                setAllEmails(emails)
            }
            else {
                console.log('ServerError: Could not fetch Data')
            }
        }
        catch (error) {
            console.log("Error:", error)
        }
    }

    const checkValidUsername = (username: string) => {
        if (allUsernames.includes(username)) {
            setusernameError('Username already exists')
            return false
        }
        else {
            return true
        }
    }

    const checkValidEmail = (email: string) => {
        if (allEmails.includes(email)) {
            setEmailError('Email Already in use.')
            return false
        }
        else {
            setEmailError('')
            return true
        }
    }

    const checkValidPhone = (phone: string) => {
        if (phone.length !== 10 || isNaN(Number(phone))) {
            setPhoneError('Invalid Phone Number')
            return false
        }
        else {
            setPhoneError('')
            return true
        }
    }

    const handleChange = (event: { target: { name: any; value: any } }) => {
        if (event.target.name === 'email') {
            if (!checkValidEmail(event.target.value)) {
                setEmailError('Email Already in use.')
            }
            else {
                setEmailError('')
            }
        }
        else if (event.target.name === 'username') {
            if (!checkValidUsername(event.target.value)) {
                setusernameError('Username already exists')
            }
            else {
                setusernameError('')
            }
        }
        else if(event.target.name === 'phone'){
            if(!checkValidPhone(event.target.value)){
                setPhoneError('Invalid Phone Number')
            }
            else{
                setPhoneError('')
            }
        }
        setFormData((prevData) => ({ ...prevData, [event.target.name]: event.target.value }));
    }

    useEffect(() => {
        getAllUsernamesAndEmail()
    }, [])


    return (
        <Fragment>
            <h1 className='mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 text-center mt-4'>Create Account</h1>
            {isFormVisible && (<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                {step === 1 && (
                    <form onSubmit={nextStep} method='POST'>
                        <label className="block mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />
                        {emailError && (
                            <p className="text-red-500 text-sm mb-2">{emailError}</p>
                        )}
                        <label className="block mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        >
                            Next
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit}>
                        <label className="block mb-2">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 mb-2 border rounded-md"
                            required
                        />
                        {usernameError && (
                            <p className="text-red-500 text-sm mb-2">{usernameError}</p>
                        )}
                        <label className="block mb-2">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />
                        <label className="block mb-2">Phone:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 mb-2 border rounded-md"
                            required
                        />
                        {phoneError && (
                            <p className="text-red-500 text-sm mb-4">{phoneError}</p>
                        )}
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
                            >
                                Previous
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </div>
            )}
            {isLoading && (
                <div className='items-center text-center justify-center'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-16 h-16 animate-spin m-auto"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            strokeWidth="2"
                            className="opacity-25"
                        ></circle>
                        <path
                            d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10"
                            strokeLinecap="round"
                            strokeWidth="2"
                            className="opacity-75"
                        ></path>
                    </svg>
                </div>
            )}
        </Fragment>
    );
};

export default MultiStepForm;