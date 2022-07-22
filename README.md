# Burger Queen API

Tecnologías utilizadas: Express, Javascript, JWT, Bcryptjs, Cors, MongoDB.

La API se encuentra desplegada en: https://apiburgerqueenv1.herokuapp.com/

## Requisitos para conexión a la API

**Instalación de Axios**

[Axios](https://axios-http.com/) es una librería JavaScript que puede ejecutarse en el navegador y que nos permite hacer sencillas las operaciones como cliente HTTP.

```node
npm install axios
```

**Repositorio de referencia para hacer la conexión con la API**

En el siguiente [repositorio](https://github.com/daedov/BurgerApi-Front) encuentras un proyecto donde puedes ver la implementación de un login de usuario y su conexión con la API.

**Observador de autenticación para protección de rutas**

Te sugerimos que para iniciar sesión implementes un observador para poder detectar si un usuario está logueado o no y, a su vez, proteger las rutas en las que necesitas delimitar el acceso.

```jsx
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) return <Navigate to="/" />;
  return <>{children}</>;
};

export default ProtectedRoutes;
```

**Verificación del usuario**

Para corroborar si las credenciales del usuario son las correctas, te sugerimos que agregues la siguiente verificación en los componentes que cuenten con rutas protegidas.

```jsx
useEffect(() => {
  let headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  axios
    .get("https://apiburgerqueenv1.herokuapp.com/", { headers })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);
```

## Uso de la API

**Login de usuario**

Recuerda que el valor de email y password son referenciales, por lo que debes capturar los valores ingresados por el usuario que requiera iniciar sesión.

_Método HTTP_: `POST`

_Ruta requerida: `https://apiburgerqueenv1.herokuapp.com/auth`_

_Uso de Axios para hacer la petición HTTP_

```javascript
axios
  .post("https://apiburgerqueenv1.herokuapp.com/auth", {
    email: 'correo@correo.com', //valor referencial
    password: '123456', //valor referencial
  })
  .then((response) => {
    console.log(response.data);
    localStorage.setItem("token", response.data.token);
    response = navigate("/Menu"); // la ruta "/Menu" es referencial
  })
  .catch((err) => console.log(err));
```
