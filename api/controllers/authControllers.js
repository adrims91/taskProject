const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, surname, password, email } = req.body;
  if (!name || !surname || !password || !email) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "La contraseña debe tener más de 8 caracteres" });
  }

  const regex = /\S+@\S+\.\S+/;

  if (!regex.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "El usuario ya existe." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword, 
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ error: "Faltan datos obligatorios" });
  }
  try {
      const user = await User.findOne({ email });
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res
          .status(401)
          .json({ error: "Usuario no encontrado o contraseña incorrecta" });
      }
    
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    
      res.status(200).json({message: 'Sesión iniciada', token: token, user: user});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};






module.exports = { register, login };
