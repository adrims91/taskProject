const jwt = require('jsonwebtoken')

const authToken = async (req, res, next) => {
    const headers = req.headers
    const token = headers['authorization'] && headers['authorization'].split(" ")[1]
    if (!token) {
        return res.status(400).json({error: 'No hay token disponible'})
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Token inválido' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en la autenticación del token' });
    }
}

module.exports = authToken;
