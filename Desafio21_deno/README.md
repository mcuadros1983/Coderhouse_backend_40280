# Servidor en DENO
Desafío entregable para el curso de Backend de Coderhouse


>> Consigna: 
- Crear un servidor que utilice el módulo http opine y genere la vista con React render.
- Configurar denon para que, ante un cambio de código, el servidor de reinicie automáticamente.
    - El servidor presentará en su ruta raíz un formulario de ingreso de un color, que será enviado al mismo por método post. Dicho color (en inglés) será incorporado a un array de colores persistido en memoria.
    - Por debajo del formulario se deberán representar los colores recibidos en una lista desordenada (ul) utilizando el mismo color para la letra en cada caso. El color de fondo del la vista será negro.
NOTA: El servidor deberá tener extensión tsx para el correcto funcionamiento de la sintaxis de vista de React en Typescript.


## Para probar el código:

- Instalar deno (en caso de no tenerlo) [Instalación](https://deno.land/#installation)

```bash
# Clonar el repositorio
$ git clone https://github.com/mcuadros1983/Coderhouse_backend_40280/Desafio21_deno

# Instalar denon (en caso de no tenerlo)
$ deno install -qAf --unstable https://deno.land/x/denon/denon.ts

# Correr el servidor
$ denon start
```
