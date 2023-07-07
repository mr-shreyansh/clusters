import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";


const registerSchema = yup.object().shape({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    location: yup.string().required("Location is required"),
    occupation: yup.string().required("Occupation is required"),
    picture: yup.string().required("Picture is required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
})

const initialValuesRegister = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        // this allows us to send form info wiht image
        const formData = new FormData();
        for(let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);

        const savedUserResponse = await fetch("http://localhost:4000/auth/register", {
            method: "POST",
            body: formData,
    }
    );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if(savedUser) {
            setPageType("login");
        };
    }

    const login = async (values, onSubmitProps) => {
        const loginResponse = await fetch("http://localhost:4000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        const loggedInUser = await loginResponse.json();
        onSubmitProps.resetForm();
        if(loggedInUser) {
            dispatch(setLogin({
                user: loggedInUser.result,
                token: loggedInUser.token,
            })
            );
            if(loggedInUser.result)
            navigate("/home");
        };
    }


    const handleFormSubmit = async (values, onSubmitProps) => {
        if(isLogin) await login(values,onSubmitProps);
        if(isRegister) await register(values,onSubmitProps);
     }
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form className="flex flex-col items-center justify-center w-full dark:text-white " onSubmit={handleSubmit}>
                    <div className="px-3 py-2 mx-4 my-4 bg-white rounded-3xl md:min-w-[700px] max-w-[1000px] dark:bg-stone-900">
                        <h1 className="mx-3 font-medium text-md">Welcome to Sociopedia, the Social Media For Sociopaths!</h1>
                        <div className="flex flex-col flex-grow w-full gap-2">
                            {
                                isRegister && (
                                    <div className="flex flex-col justify-between gap-2 mx-3 sm:flex-row">
                                        <div className="flex flex-col flex-grow">
                                            <input className="px-3 py-1 my-2 rounded-sm bg-stone-200 dark:bg-stone-700" type="text" name="firstname" placeholder="First Name" value={values.firstname} onChange={handleChange} onBlur={handleBlur} />
                                            {touched.firstname && errors.firstname && <span className="text-xs text-red-500">{errors.firstname}</span>}
                                        </div>
                                        <div className="flex flex-col flex-grow">
                                            <input className="px-3 py-1 my-2 rounded-sm bg-stone-200 dark:bg-stone-700" type="text" name="lastname" placeholder="Last Name" value={values.lastname} onChange={handleChange} onBlur={handleBlur} />
                                            {touched.lastname && errors.lastname && <span className="text-xs text-red-500">{errors.lastname}</span>}
                                        </div>
                                    </div>
                                )
                            }
                            {
                                isRegister && (
                                    <div className="flex flex-col flex-grow">
                                        <input className="px-3 py-1 mx-3 my-2 rounded-sm bg-stone-200 dark:bg-stone-700" type="text" name="location" placeholder="Location" value={values.location} onChange={handleChange} onBlur={handleBlur} />
                                        {touched.location && errors.location && <span className="text-xs text-red-500">{errors.location}</span>}
                                    </div>
                                )
                            }
                            {
                                isRegister && (
                                    <div className="flex flex-col flex-grow">
                                        <input className="px-3 py-1 mx-3 my-2 rounded-sm bg-stone-200 dark:bg-stone-700" type="text" name="occupation" placeholder="Occupation" value={values.occupation} onChange={handleChange} onBlur={handleBlur} />
                                        {touched.occupation && errors.occupation && <span className="text-xs text-red-500">{errors.occupation}</span>}
                                    </div>
                                )
                            }

                            {
                                isRegister && (
                                    <div className="flex flex-col flex-grow">
                                        <Dropzone 
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) => {
                                            setFieldValue("picture", acceptedFiles[0]);
                                        }}>
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()} className="px-3 py-2 mx-3 my-2 rounded-sm bg-stone-200 dark:bg-stone-700">
                                                    <input {...getInputProps()} />
                                                    {
                                                        values.picture ? 
                                                            <p className="px-3 py-3 text-xs border border-dashed rounded-sm border-cyan-500">{values.picture.name}</p>
                                                          :
                                                            <p className="px-3 py-3 text-xs border border-dashed rounded-sm border-cyan-500">Add Picture Here</p>
                                                    }
                                                </div>
                                            )}
                                        </Dropzone>
                                        {touched.picture && errors.picture && <span className="text-xs text-red-500">{errors.picture}</span>}
                                    </div>
                                )
                            }

                            <input className="px-3 py-1 mx-3 my-2 rounded-sm bg-stone-200 dark:bg-stone-700" type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                            {touched.email && errors.email && <span className="text-xs text-red-500">{errors.email}</span>}

                            <input className="px-3 py-1 mx-3 my-2 rounded-sm bg-stone-200 dark:bg-stone-700" type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                            {touched.password && errors.password && <span className="text-xs text-red-500">{errors.password}</span>}

                            <button className="py-1 mx-3 text-center rounded-lg bg-cyan-500" type="submit">{isLogin ? "Login" : "Register"}</button>
                        </div>
                        <a className="mx-3 text-sm font-light cursor-pointer text-cyan-500" type="button" onClick={() => setPageType(isLogin ? "register" : "login")}>{isLogin ? "Don't have an Account? Register" : "Already have an account? Login here"}</a>
                    </div>
                </form>
            )}
        </Formik>

    );

}

export default Form;