const Router = require("express");
const User = require("../models/User");
const config = require("config");
const bcryptjs = require("bcryptjs"); // * модуль для хеша пароля
const { check, validationResult } = require("express-validator"); // * модуль для валидации полей
const jwt = require("jsonwebtoken"); // * модуль для создания токенов

// * создание объекта роутера
const router = Router();

// * ------------------------------------------------------------
// * регистрация пользователя
// * ------------------------------------------------------------
router.post(
  "/registration",
  [
    check("email", "Uncorrected EMAIL").isEmail(),
    check(
      "password",
      "Password must be longer then 3 and shorter then 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      console.log("BODY: ", req.body);
      // * проверяю, есть ли ошибки в полях email или password
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrected request", errors });
      }

      const { name, email, password, avatar } = req.body;

      // * проверяем есть ли в базе пользователь уже с таким email
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with ${email} already exist!` });
      }

      // * если пользователя с таким именем нет то будем его создавать и отправлять в базу
      // * пароль пользователя чтоб не отправлять в открытом виде в базу нужно его захешировать
      // * используем модуль bcryptjs для хеширования пароля
      const hashPassword = await bcryptjs.hash(password, 8);
      const user = new User({ name, email, password: hashPassword, avatar });

      // * сохраняем юзера в базе данных
      await user.save();

      // * возвращаем ответ от сервера, что пользователь добавлен
      return res.json({ message: `User ${email} was created.` });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }
);

// * ------------------------------------------------------------
// * логин пользователя
// * ------------------------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // * ищем пользователя с нужным email в базе
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No such user!" });
    }

    // * проверяем совпадение пароля, используем bcryptjs чтоб деХешировать
    const isPassValid = bcryptjs.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    // * создаю токен юзера
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "" });
  }
});

module.exports = router;
