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

Para el manejo de ordenes, te recomendamos seguir la estructura propuesta en el login de usuario. También podrías usar axios para el manejo de peticiones.

**Obtener una orden**

Para obtener una orden necesitas indicar el id de la orden que quieres revisar.

```
Método HTTP: GET

Ruta requerida: https://apiburgerqueenv1.herokuapp.com/orders/:id
```

**Obtener todas las ordenes**
```
Método HTTP: GET

Ruta requerida: https://apiburgerqueenv1.herokuapp.com/orders
```

**Agregar una orden**

Para agregar una orden necesitas ingresar el nombre del cliente (client), la cantidad (qty), nombre del producto (product) y el precio (price) Por default el estado de la orden es _"pending"_

```

Método HTTP: POST

Ruta requerida: https://apiburgerqueenv1.herokuapp.com/orders
```

*Ejemplo de datos necesarios*

```json
{
"client": "Lizz",
"products": [
    {
    "qty": 1,
    "product": "cafe expresso",
    "price": "3500"
    }               
 ]
}
```
*Ejemplo de respuesta*

```json
{
    "success": true,
    "message": "Orden registrada con éxito",
    "response": {
        "userId": "62df080a645a2950a2bd7a61",
        "client": "Lizz",
        "products": [
            {
                "qty": 1,
                "product": "cafe expresso",
                "price": "3500",
                "_id": "62e942fc6a890a8f3328fbf5"
            }
        ],
        "status": "pending",
        "_id": "62e942fc6a890a8f3328fbf4",
        "dataEntry": "2022-08-02T15:30:04.130Z",
        "__v": 0
    }
}
```

**Editar una orden**

Para editar la orden necesitas indicar el nombre del producto y solo puedes editar la cantidad (qty).

```
Método HTTP: PUT

Ruta requerida: https://apiburgerqueenv1.herokuapp.com/orders/products/:id
```

*Ejemplo de datos necesarios*

```json
{
"products": [
    {
    "qty": 6,
    "product": "cafe expresso"
    }               
 ]
}
```

*Ejemplo de respuesta*

```json
{
    "success": true,
    "message": "Operación exitosa",
    "result": {
        "_id": "62e942fc6a890a8f3328fbf4",
        "userId": "62df080a645a2950a2bd7a61",
        "client": "Lizz",
        "products": [
            {
                "qty": 6,
                "product": "cafe expresso",
                "price": "3500",
                "_id": "62e942fc6a890a8f3328fbf5"
            }
        ],
        "status": "pending",
        "dataEntry": "2022-08-02T15:30:04.130Z",
        "__v": 0
    }
}
```

**Modificar el estado de una orden**

Los estados de la orden son _pending, delivering, delivered y canceled_. Debes indicar el id de la orden para poder editar el estado.

```
Método HTTP: PUT

Ruta requerida: https://apiburgerqueenv1.herokuapp.com/orders/status/:id
```

*Ejemplo de datos necesarios*

```json
{
"status": "delivering"
}
```

*Ejemplo de respuesta*

```json
{
    "success": true,
    "message": "Estado cambiado",
}
```

**Eliminar una orden**

Para eliminar la orden necesitas ingresar el id de la orden y solo puede ser realizada por el administrador.

```
Método HTTP: DELETE

Ruta requerida: https://apiburgerqueenv1.herokuapp.com/orders/:id
```
