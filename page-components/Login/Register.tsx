import axios from "axios";
import { useFormik } from "formik";
import router from "next/router";
import { useState } from "react";
import styles from "../../styles/page-components/Login/Register.module.css"


interface IRegister{
    email: string,
    password: string
}

interface IRegisterProps{
    registerHandler: (showRegister: boolean) => void
}

const Register = (props: IRegisterProps) => {

    const[success, setSuccess] = useState("")

     
    const client = axios.create({
        baseURL: `${process.env.API_URL}/api/UsersAuth/register`
      });
  
      const addPost = (obj: IRegister) => {
        client
           .post('', obj)
           .then((response) => {
              console.log(response.data)
              setSuccess("Success");
              setTimeout(() => {
              setSuccess("");
              props.registerHandler(false)
              }, 2000);
           }).catch((error) => {
            console.log(error);
            error.response.data?.errorMesseges[0] ? alert(error.response.data.errorMesseges[0]) : alert(error.message)
         });
      };

    const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

    const validate = (values : IRegister) => {

        return sleep(500).then(() => {

            const errors = {} as IRegister;

            if (values.email == ""){
                errors.email = "Required"
            }

            if (values.password == ""){
                errors.password = "Required"
            } else if (values.password.length < 6){
                errors.password = "Password lenght must be minimum of 6 characters"
            }

            return errors;
        });
      };
  
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""

        },
        validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            addPost(values)
            formik.resetForm()
        },
    });
    return (
        <div className={styles.container}>
            <div className={styles.registertxt}>Register</div>
            <form className={styles.formcontainer} onSubmit={formik.handleSubmit}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                    className={styles.input}
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email ? <div className={styles.error}>{formik.errors.email}</div> : <div className={styles.error}></div>}

                <label className={styles.label} htmlFor="password">Password</label>
                <input
                    className={styles.input}
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password ? <div className={styles.error}>{formik.errors.password}</div> : <div className={styles.error}></div>}

                <span><button className={styles.button} type="submit">Submit</button>&nbsp;<button className={styles.button} type="button" onClick={()=>router.push("/")}>Cancel</button></span>
                <div className={styles.success}>{success}</div>
            </form>
        </div>
    )
}
export default Register;