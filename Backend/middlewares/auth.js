const SEED = require('../config/config').SEED;
const jwt = require('jsonwebtoken');


// verificar token

exports.validToken = function ( req, res, next ){

    const token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                msg: 'token no valido',
                errors: err
            });
        }

        req.user = decoded.user;

        next();
        res.status(200)
        .json({
            ok: true,
            decoded:decoded,
            userToken: req.user
        });


    });
    
}
