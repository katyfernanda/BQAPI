# Burger Queen API

Tecnologías utilizadas: Express, Javascript, JWT, Bcryptjs, Cors, MongoDB.

## Requisitos para conexión a la API

Será necesario que nos mandes los siguientes datos para crear tu usuario:  
- email: String  
- password: String  
- role: String //ej: admin, garzón, cocinero, etc.  
- commerce: String //corresponde al nombre de tu app  

**Instalación de Axios**

[Axios](https://axios-http.com/) es una librería JavaScript que puede ejecutarse en el navegador y que nos permite hacer sencillas las operaciones como cliente HTTP.

```node
npm install axios
```
## Uso de la API

### Login de usuario

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
*Link repositorio de referencia:* https://github.com/daedov/BurgerApi-Front/blob/main/src/components/Login.jsx

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

*Link repositorio de referencia*: https://github.com/daedov/BurgerApi-Front/blob/main/src/components/ProtectedRoutes.js

*Para ver la implementación de ProtectedRoutes*: https://github.com/daedov/BurgerApi-Front/blob/main/src/App.js

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
*Link repositorio de referencia*: https://github.com/daedov/BurgerApi-Front/blob/main/src/components/Menu.jsx

### Manejo de Ordenes / Pedidos

Para el manejo de ordenes, te recomendamos seguir la estructura propuesta en el login de usuario. También debes usar axios para el manejo de peticiones.

**Obtener una orden**

Para obtener una orden necesitas indicar el id de la orden que quieres revisar.

_Método HTTP_: `GET`

_Ruta requerida: `https://apiburgerqueenv1.herokuapp.com/orders/:id`_

**Obtener todas las ordenes**

_Método HTTP_: `GET`

_Ruta requerida: `https://apiburgerqueenv1.herokuapp.com/orders`_

**Agregar una orden**

Para agregar una orden necesitas ingresar el nombre del cliente, nombre del producto (product) y la cantidad (qty). Por default el estado de la orden es _"pending"_

_Método HTTP_: `POST`

_Ruta requerida: `https://apiburgerqueenv1.herokuapp.com/orders`_

**Editar una orden**

Para editar la orden necesitas indicar el nombre del producto; solo puedes editar la cantidad (qty).

_Método HTTP_: `PUT`

_Ruta requerida: `https://apiburgerqueenv1.herokuapp.com/orders/:id`_

**Modificar el estado de una orden**

Los estados de la orden son _pending, delivering, delivered y canceled_. Debes indicar el id de la orden para poder editar el estado. 

_Método HTTP_: `PUT`

_Ruta requerida: `https://apiburgerqueenv1.herokuapp.com/orders/status/:id`_

**Eliminar una orden**

Para eliminar la orden necesitas ingresar el id de la orden y solo puede ser realizada por el administrador. 

_Método HTTP_: `DELETE`

_Ruta requerida: `https://apiburgerqueenv1.herokuapp.com/orders/:id`_