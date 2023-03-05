const getRandoms = (cant) => {
//   const dataRandom = [];
//   for (let i = 0; i < cant; i++) {
//     dataRandom.push(Math.floor(Math.random() * 1000) + 1);
//   }

//   let repetidos = {};
  
//   dataRandom.forEach(function(numero){
//     repetidos[numero] = (repetidos[numero] || 0) + 1;
//   });
//   return repetidos

  let numeros = {};

  const obtenerNumAleatorios = () => parseInt(Math.random() * 1000) + 1;

  for (let i = 0; i < cant; i++) {
    let numero = obtenerNumAleatorios();
    if (!numeros[numero]) numeros[numero] = 0;
    numeros[numero]++;
  }
  return numeros
};

process.on("exit", () => console.log(`worker ${process.pid} cerrado`));

process.on("message", (msg) => {
  console.log(`worker ${process.pid}  inicia su tarea`);
  if (!isNaN(msg)) {
    const numbers = getRandoms(msg);
    process.send(numbers);
    console.log(`worker ${process.pid} finaliza su tarea`);
    process.exit();
  }
});

process.send("listo");
