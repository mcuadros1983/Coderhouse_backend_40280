// 0
use ecommerce

//1
db.mensajes.insertMany([{author:"correo1",text:"mensaje1", dateMsg:new Date().toLocaleString()},{author:"correo2",text:"mensaje2", dateMsg:new Date().toLocaleString()},{author:"correo3",text:"mensaje3", dateMsg:new Date().toLocaleString()},{author:"correo4",text:"mensaje4", dateMsg:new Date().toLocaleString()},{author:"correo5",text:"mensaje5", dateMsg:new Date().toLocaleString()},{author:"correo6",text:"mensaje6", dateMsg:new Date().toLocaleString()},{author:"correo7",text:"mensaje7", dateMsg:new Date().toLocaleString()},{author:"corroe8",text:"mensaje8", dateMsg:new Date().toLocaleString()},{author:"correo9",text:"mensaje9", dateMsg:new Date().toLocaleString()},{author:"correo10",text:"mensaje10", dateMsg:new Date().toLocaleString()}])
db.productos.insertMany([{title:"producto1",price:100},{title:"producto2",price:120},{title:"producto3",price:430},{title:"producto4",price:1140},{title:"producto5",price:2250},{title:"producto6",price:3360},{title:"producto7",price:4470},{title:"producto8",price:2480},{title:"producto9",price:3690},{title:"producto10",price:2100}])

//3
db.mensajes.find()
db.productos.find()

//4
db.mensajes.estimatedDocumentCount()
db.productos.estimatedDocumentCount()

//5.a
db.productos.insertOne({title:"producto11",price:1110})//CREATE

//5.b
db.productos.find({title:"producto1"}) 

//5.b.i
db.productos.find({price:{$lt:1000}})

//5.b.ii
db.productos.find({$and:[{price:{$gt:1000}},{price:{$lt:3000}}]})
db.productos.find({price: {$in: [1000, 3000]}})

//5.b.iii
db.productos.find({price:{$gt:3000}})

//5.b.iv
db.productos.find().sort({price:1}).skip(2).limit(1)

//5.c
db.productos.updateMany({},{$set:{stock:100}})

//5.d
db.productos.updateMany({price:{$gt:4000}},{$set:{stock:0}})

//5.e
db.productos.deleteMany({price:{$lt:1000}})

//6
db.createUser({user:"pepe",pwd:"asd456",roles:[{role:"read",db:"ecommerce"}]})