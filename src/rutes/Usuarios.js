import express from 'express';
import { check } from 'express-validator';
import { validarJWT } from '../middleware/validarJWT.js';
import { validarCampos } from '../middleware/validar-campos.js';
import usuarioController from '../controllers/usuarios.js';
import { usuarioHelper } from '../helpers/Usuarios.js';

const router = express.Router();

// Crear un nuevo usuario (solo administradores)
router.post('/', [
    validarJWT,
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(usuarioHelper.existeEmail),
    check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
    validarCampos
], usuarioController.crearUsuario);

// Login (accesible para todos)
router.post('/login', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
    validarCampos
], usuarioController.login);

// Listar todos los usuarios (accesible para todos)
router.get('/listar', usuarioController.listarUsuarios);

// Editar un usuario por su ID (usuarios pueden editar solo su propia información, administradores pueden editar cualquier usuario)
router.put('/editar/:id', [
    validarJWT,
    check('id', 'ID inválido').isMongoId(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    validarCampos
], usuarioController.editarUsuario);

// Cambiar la contraseña de un usuario por su ID (usuarios pueden cambiar solo su propia contraseña, administradores pueden cambiar cualquier contraseña)
router.put('/cambiarContrasena/:id', [
    validarJWT,
    check('id', 'ID inválido').isMongoId(),
    check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
    validarCampos
], usuarioController.cambiarContraseña);

// Activar o desactivar un usuario por su ID (solo administradores)
router.put('/activarDesactivar/:id', [
    validarJWT,
    check('id', 'ID inválido').isMongoId(),
    validarCampos
], usuarioController.activarDesactivarUsuario);

// Eliminar un usuario por su ID (solo administradores)
router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'ID inválido').isMongoId(),
    validarCampos
], usuarioController.eliminarUsuario);

export default router;