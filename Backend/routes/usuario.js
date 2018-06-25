const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');


// GET
app.get('/', auth.validToken, (req, res, next) => {

    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios: ' + err
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                }
                );
            });
});

// POST
app.post('/', auth.validToken, (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role,
    });

    usuario.save((err, usuarioSaved) => {
        if (err) {

            return res.status(400).json({
                ok: false,
                mensaje: 'Error guardando usuarios: ' + err
            });
        }

        res.status(201).json(
            {
                ok: true,
                msg: 'usuario guardado: ' + usuarioSaved
            }
        );
    });

});


// update

app.put('/:id', auth.validToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, user) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario: ' + err
            });
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el usuario: ' + id,
                error: { message: 'no existe el usuario' }
            }
            );
        }

        user.nombre = body.nombre,
            user.email = body.email,
            user.password = body.password,
            user.img = body.img,
            user.role = body.role

        user.save(
            (err, user) => {
                if (err) {
                    res.status(400).json(
                        {
                            ok: false,
                            msg: 'error al guardar usuario: ' + err
                        }
                    )
                }

                user.password = ":)";

                res.status(200).json({ usuario: user });

            }
        );


    });
});

app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, user) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario: ' + err
            });
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el usuario: ' + id,
                error: { message: 'no existe el usuario' }
            }
            );
        }

        res.status(200).json({
            ok: true,
            msg: 'Usuario borrado: ' + user
        });

    }); });

    module.exports = app;