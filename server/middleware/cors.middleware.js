// * позволяет ресурсу с одного домена обратиться к ресурсу другого
// * на сервере нужно разрешить доступ к api других доменов

function cors(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next()
}

module.exports = cors;