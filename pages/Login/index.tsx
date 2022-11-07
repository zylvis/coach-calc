import axios from "axios";
import { useFormik } from "formik";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import ILogin from "../../icons/Ilogin.svg"
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
    const[loading, setLoading] = useState(false)
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
              }
              setLoading(true)
           }).catch((error) => {
            setLoading(false)
            console.log(error);
            error.response.data?.errorMesseges[0] !== undefined ? alert(error.response.data.errorMesseges[0]) : alert(error.message)
         }).finally(()=>{
            router.replace("/Athletee")
            setLoading(false)
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
            setLoading(true)
        },
    });

    const registerHandler = (showRegister:boolean) => {
        setShowRegister(showRegister)
    }
    const objRegisterProps = {registerHandler: registerHandler}

    return (
        <div className={styles.container}>
            <ILogin className={styles.loginicon}/>
            <div className={styles.logintxt}>Login</div>
            <form className={styles.formcontainer} onSubmit={formik.handleSubmit}>
       
                <label className={styles.label} htmlFor="email">
                    <input
                        className={styles.input}
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Email*"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <span className={styles.span}>Email*</span>
                </label>
                {formik.errors.email ? <div className={styles.error}>{formik.errors.email}</div> : <div className={styles.error}></div>}

                <label className={styles.label} htmlFor="password">
                    <input
                        className={styles.input}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password*"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <span className={styles.span}>Password*</span>
                </label>
                {formik.errors.password ? <div className={styles.error}>{formik.errors.password}</div> : <div className={styles.error}></div>}

                <span><button className={styles.button} type="submit">Submit</button>&nbsp;<button className={styles.button} type="button" onClick={()=>router.push("/")}>Cancel</button></span>
                <div className={styles.success}></div>

                <div className={styles.registertxt} onClick={() => setShowRegister(true)}>Click to <u>Register</u> new account ...</div>

            </form>
            {showRegister && <Register {...objRegisterProps}/>}
            {loading && <div className={styles.loading}><div className={styles.rotation}>CoachCalc</div></div>}
        </div>
    )
}
export default Login