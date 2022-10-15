import axios from "axios";
import { useFormik } from "formik";
import router from "next/router";
import { useState } from "react";
import Register from "../../page-components/Login/Register";
import { useLoginContext } from "../../store/useLogincontext";
import styles from "../../styles/pages/Login/Login.module.css"


interface ILogin{
    email: string,
    password: string
}
const Login = () => {

    const[showRegister, setShowRegister] = useState(false);
    const{isLoggedIn, setIsLoggedIn} = useLoginContext()

    const client = axios.create({
        baseURL: "https://localhost:7104/api/UsersAuth/login"
      });
  
      const AddPost = (obj: ILogin) => {
        client
           .post('', obj)
           .then((response) => {
              console.log(response.data)
              if(response.data.result.token){
                setIsLoggedIn(true)
              }
           }).catch((error) => {
            console.log(error);
         });
      };

    const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
    const validate = (values : ILogin) => {

        return sleep(500).then(() => {

            const errors = {} as ILogin;

            if (values.email == ""){
                errors.email = "Required"
            }

            if (values.password == ""){
                errors.password = "Required"
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
            //alert(JSON.stringify(values, null, 2));
            AddPost(values)
            formik.resetForm()
        },
    });
    return (
        <div className={styles.container}>
            <div className={styles.logintxt}>Login</div>
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
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password ? <div className={styles.error}>{formik.errors.password}</div> : <div className={styles.error}></div>}

                <span><button className={styles.button} type="submit">Submit</button>&nbsp;<button className={styles.button} type="button" onClick={()=>router.push("/")}>Cancel</button></span>
                <div className={styles.success}>Success {JSON.stringify(isLoggedIn)}</div>

                <div className={styles.registertxt} onClick={() => setShowRegister(true)}>Register</div>

            </form>
            {showRegister && <Register/>}
        </div>
    )
}
export default Login