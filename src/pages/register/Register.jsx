import { useContext, useState } from 'react';
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import * as yup from 'yup';
import { authContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2';
import { sendEmailVerification } from 'firebase/auth';
const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(true);
    const [registerError, setRegisterError] = useState("");
    const { registerUser } = useContext(authContext);
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().matches(
                /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                "Password at least one uppercase one number and min 6 char"
            ).required()
        }),

        onSubmit: (values, { resetForm }) => {

            const { email, password, name } = values;
            setRegisterError("")
            // user register process
            registerUser(email, password)
                .then((userCredential) => {
                    sendEmailVerification(userCredential.user)
                        .then(() => {
                            Swal.fire(
                                '✌️❤️✌️',
                                'Please Chek Your Email Address!',
                                'success'
                            )
                            navigate("/login")
                        })


                })
                .catch((err) => {
                    console.log(err.message)
                    setRegisterError(err.message)
                    navigate("/register")
                })


            resetForm({ values: "" })
        }
    });

    return (
        <div className='flex h-screen mt-8 sm:mt-0 justify-center items-center px-4 md:px-0'>
            <div className="w-full max-w-md p-4 bg-white  rounded-md  sm:p-6 md:p-8 dark:bg-[#1d232a]">
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Sign Up </h5>
                    <p className='text-center text-sm text-red-600'>
                        {
                            setRegisterError && registerError
                        }
                    </p>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="your email" onChange={formik.handleChange} value={formik.values.name} />
                        <span className="text-red-600 text-xs">{formik.touched.name ? formik.errors.name : ""}</span>
                    </div>
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

                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register </button>

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already registered? please <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login