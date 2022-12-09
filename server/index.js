// * Модули
// * express фреймворк для создания веб приложений на nodeJS
// * mongoose библиотека по работе с базой данных mongoDB
// * config модуль для обращения к папке config и получение данных из нее
// * nodemon отслеживает изменения в js файлах и перезапускает сервер,
// * устанавливаем в dev зависимости -D и используем его в package.json

const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");

// * создаем сам сервер
const app = express();
// * номер порта
const PORT = config.get("serverPort");

// * импорт routes и распарсиваем json строку
app.use(express.json());
app.use("/api/auth", authRouter);

// * запуск сервера и подключение к базе данных
const start = async () => {
  try {
    // * подключение базы
    await mongoose.connect(config.get("dbUrl"));

    // * прослушка запросов
    app.listen(PORT, () => {
      console.log("Server start at port: ", PORT);
    });
  } catch (e) {}
};

start();
