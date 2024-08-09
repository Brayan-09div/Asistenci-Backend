import express from 'express';
import { check } from 'express-validator';
import controladorAprendis from '../controllers/Aprendices.js';
import { validarJWT } from '../middleware/validarJWT.js';
import { validarCampos } from '../middleware/validar-campos.js';
import { aprendicesHelper } from '../helpers/Aprendices.js';
import { fichasHelper } from '../helpers/Fichas.js';

const router = express.Router();

// POST /api/aprendices
router.post('/', [
     validarJWT,
    check('cc', 'El campo cc es obligatorio').not().isEmpty(),
    check('cc').custom(aprendicesHelper.existecc),
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    check('email', 'El campo email es obligatorio').not().isEmpty().isEmail(),
    check('email').custom(aprendicesHelper.existeEmail),
    check('telefono', 'El campo telefono es obligatorio').not().isEmpty(),
    check('IdFicha', 'El campo IdFicha es obligatorio').not().isEmpty(),
    check('IdFicha').custom(fichasHelper.existeFichaID),
    validarCampos
], controladorAprendis.crearAprendis);


// GET /api/aprendices/listar
router.get('/listar', [
     validarJWT,
], controladorAprendis.listarAprendis);


// DELETE /api/aprendices/eliminar/:id
router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'El ID proporcionado no es válido').isMongoId(),
    check('id').custom(aprendicesHelper.existeAprendizID),
    validarCampos
], controladorAprendis.eliminarAprendis);

// PUT /api/aprendices/editar/:id
router.put('/editar/:id', [
    validarJWT,
    check('id', 'El ID proporcionado no es válido').isMongoId(),
    check('cc', 'El campo cc es obligatorio').optional().not().isEmpty(),
    check('cc').custom(aprendicesHelper.existecc),
    check('nombre', 'El campo nombre es obligatorio').optional().not().isEmpty(),
    check('email', 'El campo email es obligatorio').optional().not().isEmpty().isEmail(),
    check('email').custom(aprendicesHelper.existeEmail),
    check('telefono', 'El campo telefono es obligatorio').optional().not().isEmpty(),
    check('IdFicha', 'El campo IdFicha es obligatorio').optional().not().isEmpty(),
    check('IdFicha').custom(fichasHelper.existeFichaID),
    validarCampos
], controladorAprendis.editarAprendis);


// PUT /api/aprendices/activarDesactivar/:id
router.put('/activarDesactivar/:id', [
    validarJWT,
    check('id', 'El ID proporcionado no es válido').isMongoId(),
    check('id').custom(aprendicesHelper.existeAprendizID),
    validarCampos
], controladorAprendis.activarDesactivarAprendiz);


export default router;