
let express = require('express');
let router = express.Router();
const cuentas = require('../controllers/cuenta.controller.js');

router.post('/api/cuentas/create', cuentas.create);
router.get('/api/cuentas/all', cuentas.retrieveAllCuentas);
router.get('/api/cuentas/onebyid/:id', cuentas.getCuentaById);
router.put('/api/cuentas/update/:id', cuentas.updateById);
router.delete('/api/cuentas/delete/:id', cuentas.deleteById);

const tiposTransaccion = require('../controllers/tipo.controller.js');

router.post('/api/tiposTransaccion/create', tiposTransaccion.create);
router.get('/api/tiposTransaccion/all', tiposTransaccion.retrieveAllTiposTransaccion);
router.get('/api/tiposTransaccion/onebyid/:id', tiposTransaccion.getTipoTransaccionById);
router.put('/api/tiposTransaccion/update/:id', tiposTransaccion.updateById);
router.delete('/api/tiposTransaccion/delete/:id', tiposTransaccion.deleteById);

const controlTransacciones = require('../controllers/control.controller.js');

router.post('/api/controlTransacciones/create', controlTransacciones.create);
router.get('/api/controlTransacciones/all', controlTransacciones.retrieveAllTransacciones);
router.get('/api/controlTransacciones/onebyid/:id', controlTransacciones.getTransaccionById);
router.put('/api/controlTransacciones/update/:id', controlTransacciones.updateById);
router.delete('/api/controlTransacciones/delete/:id', controlTransacciones.deleteById);




module.exports = router;