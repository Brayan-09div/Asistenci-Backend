import express from 'express';
import { check } from 'express-validator';
import bitacoraController from '../controllers/Bitacora.js';
import { validarCampos } from '../middleware/validar-campos.js';
import { validarJWT } from '../middleware/validarJWT.js';
import { BitacorasHelper } from '../helpers/Bitacora.js';
import { aprendicesHelper } from '../helpers/Aprendices.js';

const router = express.Router();


router.post('/', [
    validarJWT,
    check('IdAprendis', 'El ID del Aprendiz es obligatorio').not().isEmpty(),
    check('IdAprendis', 'El ID del Aprendiz es inválido').isMongoId(),
    check('IdAprendis').custom(aprendicesHelper.existeAprendizID),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    validarCampos
], bitacoraController.crearBitacora);


router.get('/Listar', [
    validarJWT,
], bitacoraController.listarTodo);

router.get('/ListarFecha/:fecha', [
    validarJWT
],bitacoraController.listarPorFechaUnica);


router.get('/ListarFechas/:fechaInicio/:fechaFin', [
    validarJWT,
], bitacoraController.listarPorFecha);


router.get('/ListarAprendis/:idAprendis', [
    validarJWT,
    check('idAprendis', 'El ID es inválido').isMongoId(),
    check('idAprendis').custom(aprendicesHelper.existeAprendizID),
    validarCampos,
], bitacoraController.listarPorAprendis);


router.get('/ListarFicha/:IdFicha', [
    validarJWT
], bitacoraController.listarPorFicha);


router.put('/ActualizarEstado/:id', [
    validarJWT,
    check('id', 'El ID de la bitácora es inválido').isMongoId(),
    check('id').custom(BitacorasHelper.existeBitacoraId),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    check('estado').isIn(['pendiente', 'asistió', 'faltó', 'excusa']),
    validarCampos
], bitacoraController.actualizarEstado);

export default router;
