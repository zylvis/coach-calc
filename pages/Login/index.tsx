import axios from "axios";
import { useFormik } from "formik";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import userAuth from "../../Helpers/userAuth";
import Register from "../../page-components/Login/Register";
import { useLoginContext } from "../../store/useLogincontext";
import styles from "../../styles/pages/Login/Login.module.css"



interface ILogin{
    email: string,
    password: string
}
const Login = () => {
    
    const router = useRouter()

    const[showRegister, setShowRegister] = useState(false);
    const{isLoggedIn, setIsLoggedIn} = useLoginContext()

    const client = axios.create({
        baseURL: `${process.env.API_URL}/api/UsersAuth/login`
      });
  
      const AddPost = (obj: ILogin) => {
        client
           .post('', obj)
           .then((response) => {
              console.log(response.data)
              if(response.data.result.token){
                setIsLoggedIn(true)
                localStorage.setItem("coachCalcUserToken", response.data.result.token)
                router.replace("/Athletee")
              }
           }).catch((error) => {
            console.log(error);
            error.response.data?.errorMesseges[0] !== undefined ? alert(error.response.data.errorMesseges[0]) : alert(error.message)
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

    const registerHandler = (showRegister:boolean) => {
        setShowRegister(showRegister)
    }
    const objRegisterProps = {registerHandler: registerHandler}

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
                <div className={styles.success}></div>

                <div className={styles.registertxt} onClick={() => setShowRegister(true)}>Register new account ...</div>

            </form>
            {showRegister && <Register {...objRegisterProps}/>}
        </div>
    )
}
export default Login