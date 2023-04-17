module.exports = {
  config: { 
    alias: { 
      p: "PORT",
      m: "MODE",
      daoproduct: "DAO_PRODUCT",
      daomessage: "DAO_MESSAGE",
      daoauth: "DAO_AUTH"
    },
    default: { 
      PORT: 8080,
      MODE: "FORK",
      DAO_PRODUCT: "Firebase",
      DAO_MESSAGE: "Firebase",
      DAO_AUTH: "Firebase"
    }
  }
}