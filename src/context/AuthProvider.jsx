import { useState, useEffect , createContext} from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { PropTypes } from "prop-types";
import { userLogin, userRegister } from "../services/user.service";


const AuthContext = createContext();

function AuthProvider ({children}){
const  navigate = useNavigate();/* pasame a una variable el useNavigate */
const [ currentUser , setCurrentUser] = useState(null); /* inicia el estado de nuevo usuario   */
const storedToken = localStorage.getItem("_token") /* si token existe que la guarde en localStorage  */

useEffect(()=>{
    if(storedToken){
  const decodedToken  = storedToken ? jwt_decode(storedToken) : null;
  console.log(decodedToken);
  const { user } = decodedToken ? decodedToken : null;

  setCurrentUser(user);

  return navigate("/");
}
}, [])

    function register (data){/* funcion de registracion */
        userRegister(data)/* importamos la funcion de la capa de servicio */
        .then((res) => {/* si llega la respuesta le decimos lo siguiente */
            if(res.ok){/* si la resp es ok */
                alert(res.message)/* mandame un alerta con el msj de respuesta */
                setTimeout(() =>{/* un segundo dsp me mande al login */
                    navigate("/login")
                }, 1000)
                return;
            }else{
                return Promise.reject(res);
            }
        })
        .catch(error => alert(JSON.stringify(error)))
    }

    function login (data){
        userLogin(data)
        .then((res) =>{
            if(res.ok){/* si la llamada devuelve de respuesta un ok */
                window.localStorage.setItem("_token" , res.token);/* guardamos en el localstorage el token */

                const  decodedToken = res.token ? jwt_decode(res.token) : null;
                const { user } = decodedToken ? decodedToken : null;
                
                setCurrentUser(user);
                setTimeout(() =>{
                    return  navigate("/");
                } , 1000)
            }else{
                return Promise.reject(res)
            }
        })
        .catch(error => alert(JSON.stringify(error)))
    }
    function logout(){/* funciojn de deslogueo */
        setCurrentUser(null);/* vuelve el estado de usuario a null */
        localStorage.removeItem("_token"); /* remueve de localStorage el token */
        navigate("/login")/*  por ultimo redirecciona a login */
    }

    const values ={
        currentUser,
        register,
        login,
        logout
    }

    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
AuthProvider.propTypes = {
    children:PropTypes.node.isRequired,
}
export { AuthContext, AuthProvider};