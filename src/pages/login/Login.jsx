import { useFormik } from 'formik'
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import * as yup from 'yup';
import { authContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2';
const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(true);
    const [loggedInError, setLoggedInError] = useState("")
    const { logInUser } = useContext(authContext);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().email().required(),
            password: yup.string().matches(
                /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                "Password at least one uppercase one number and min 6 char"
            ).required()
        }),

        onSubmit: (values, { resetForm }) => {
            const { email, password } = values;
            setLoggedInError("")
            // user login process
            logInUser(email, password)
                .then((userCredential) => {
                    if (userCredential.user.emailVerified) {
                        Swal.fire(
                            '✌️❤️✌️',
                            'logged In successfully!',
                            'success'
                        )
                        navigate("/")
                    } else {
                        setLoggedInError("Please Active Your Email Address")
                    }


                })
                .catch((err) => {
                    console.log(err.message);
                    setLoggedInError(err.message)
                })
            resetForm({ values: "" })

        }
    });

    return (
        <div className='flex h-screen justify-center items-center px-4 md:px-0'>
            <div className="w-full max-w-md p-4 bg-white  rounded-md  sm:p-6 md:p-8 dark:bg-[#1d232a]">
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Sign in </h5>
                    <p className='text-center text-sm text-red-600'>
                        {
                            loggedInError && loggedInError
                        }
                    </p>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="your email" onChange={formik.handleChange} value={formik.values.email} />
                        <span className="text-red-600 text-xs">{formik.touched.email ? formik.errors.email : ""}</span>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <div className='relative'>
                            <input type={showPassword ? "password" : "text"} name="password" id="password" placeholder="your password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={formik.handleChange} value={formik.values.password} />
                            <span onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <AiOutlineEyeInvisible size={23} className='absolute right-4 bottom-2 cursor-pointer' /> : <AiOutlineEye size={23} className='absolute right-4 bottom-2 cursor-pointer' />
                                }
                            </span>
                        </div>
                        <span className="text-red-600 text-xs">{formik.touched.password ? formik.errors.password : ""}</span>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <a className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forget Password?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <Link to="/register" className="text-blue-700 hover:underline dark:text-blue-500">Create Account</Link>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login