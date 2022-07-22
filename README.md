# Burger Queen API

Tecnologías utilizadas: Express, Javascript, JWT, Bcryptjs, Cors, MongoDB.

## Pre-requisitos para conexión a la API

**Instalación de Axios**
Se requiere la instalación de [Axios](https://axios-http.com/) para hacer las peticiones a la API. Axios es una librería  JavaScript que puede ejecutarse en el navegador y que nos permite hacer sencillas las operaciones como cliente HTTP.

```node
npm install axios
```

**Sugerencia de observador de autenticación para protección de rutas**
Al iniciar sesión podrás implementar un observador para poder detectar si un usuario logueado o no y a su vez proteger las rutas en las que necesitas delimitar el acceso
```javascript
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({ children }) => { 
    const token = localStorage.getItem('token')
    console.log(token)
    if(!token) return <Navigate to='/'/>
    return <>{children}</>
}

export default ProtectedRoutes
```

## Uso de la API

**Ejemplo Login de usuario**

Recuerda que el valor de email y password son referenciales, por lo que tu debes capturar los valores ingresados por el usuario que requiera iniciar sesión. 

*Método HTTP*: `POST`

*Ruta: `https://apiburgerqueenv1.herokuapp.com/auth`*

*Uso de Axios para hacer la petición HTTP*

```javascript
axios
      .post("https://apiburgerqueenv1.herokuapp.com/auth`", {
        email: "valor capturado ('correo@correo.com')",
        password: "valor capturado ('123456')",
      })
      .then((response) => {
        console.log(response.data)
        localStorage.setItem("token",response.data.token )
         response = navigate("/Menu")
      })
      
      .catch((err) => console.log(err))
```
