// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from "https://dev.jspm.io/react@16.13.1";
// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom@16.13.1/server";

// Importamos las definiciones de tipo para Opine
import {
  Application,
  Request,
  Response,
} from "https://deno.land/x/opine@2.2.0/mod.ts";

import { opine, urlencoded } from "https://deno.land/x/opine/mod.ts";
import { GetColorName } from "https://raw.githubusercontent.com/jeff3754/HexColorToColorName/master/src/index.ts";

const app: Application = opine();

const colores: string[] = []

app.use(urlencoded());

app.post("/", (req: Request, res: Response) => {
  const color = req.body.color;
  if (colores.indexOf(color) === -1) colores.push(color);
  res.redirect('/');
});

app.get("/", (req: Request, res: Response) => {
  const element = (
       <html>
      <head>
        <meta charSet="utf-8" />
        <title>Mi servidor con Deno</title>
      </head>
      <body style={{ backgroundColor: "black" }}>
        <h1 style={{ color: "white" }}>Ingresa un color</h1>
        <form method="POST" action="/">
          <label htmlFor="color" style={{ color: "white" }}>Nuevo color: </label>
          <input type="color" name="color" id="color" />
          <input type="submit" value="Enviar" />
        </form>
        <br /><br />
        {colores.length > 0 &&
          <>
            <h2 style={{ color: "white" }}>Tus colores:</h2>
            <ul>
              {colores.map((color, index) => {
                return (
                  <li key={index} style={{ color, fontSize: "2rem" }}>
                    {GetColorName(color)}
                  </li>
                )
              })}
            </ul>
          </>
        }
      </body>
    </html>
  );
    // Convertimos el elemento a una cadena HTML utilizando ReactDOMServer
    const html = ReactDOMServer.renderToString(element);

    // Enviamos la respuesta al cliente
    res.send(html);
});

app.listen(8899);
console.log("Opine started on port 8899");