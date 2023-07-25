
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../Copyright';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const { login } = useAuth();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            marginBottom: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresá
          </Typography>


          {/* validaciones formik */}
          <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) =>{
            const errors = {};
            const regexpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

            if(!values.email){/* si el campo el email esta vacio entonces en errors manda email requerido */
              errors.email = "Email requerido" /* agregamos a la clave email el siguiente */           
             }else if(!regexpEmail.test(values.email)){ /* si no valida la expresion  */
              errors.email = "Email invalido";/*sino a la clave email le agregamos el valor */
            }

            if(!values.password){ //otra validacion si no hay valor en password manda el errors
              errors.password = "Contraseña requerida";
            }

            return errors;
          }}
          onSubmit={(values) => {/* funcion que ejecuta el submti que setea el estado */
        
          login(values);

          }}
          
          >
            {/* fin de validaciones formik */}

            {
              ({//dentro del formulario vamos a poder acceder a estas variables
                values, //todos los valores de los estados del formulario
                errors, //todos los errores del formulario
                touched,//marca el error
                handleChange, //los handle para los botones captura los eventos
                handleBlur,
                handleSubmit,
              }) => (//parentesis porque va devolver jsx osea html
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
             <TextField
              margin="normal"
              fullWidth
              name="email"
              label="Email"
              id="email"
              autoFocus
              value={values.email}
              error={errors.email && touched.email} //si hay errores en el email entonces(&&) marcamelo como error 
              onChange={handleChange} 
              onBlur={handleBlur}
              helperText={touched.email && errors.email && errors.email} //si existe errores en el campo email
            />

            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              value={values.password}
              error={errors.password && touched.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.password && touched.password &&  errors.password}
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
              )
            }
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}