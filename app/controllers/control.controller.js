const db = require('../config/db.config.js');
const ControlTransacciones = db.ControlTransacciones;

exports.create = (req, res) => {
    let controlTransaccion = {};

    try {
        controlTransaccion.id_Cuenta = req.body.id_Cuenta;
        controlTransaccion.FechaHoraIngreso = req.body.FechaHoraIngreso;
        controlTransaccion.id_tipoTransaccion = req.body.id_tipoTransaccion;
        controlTransaccion.MontoTransaccionCredito = req.body.MontoTransaccionCredito || null;
        controlTransaccion.MontoTransaccionDebito = req.body.MontoTransaccionDebito || null;

        ControlTransacciones.create(controlTransaccion).then(result => {    
            res.status(200).json({
                message: "Transacción creada exitosamente con id = " + result.id_registro,
                controlTransaccion: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

exports.retrieveAllTransacciones = (req, res) => {
    ControlTransacciones.findAll()
        .then(transacciones => {
            res.status(200).json({
                message: "¡Todas las transacciones obtenidas exitosamente!",
                transacciones: transacciones
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getTransaccionById = (req, res) => {
    let transaccionId = req.params.id;
    ControlTransacciones.findByPk(transaccionId)
        .then(transaccion => {
            res.status(200).json({
                message: "Transacción obtenida exitosamente con id = " + transaccionId,
                transaccion: transaccion
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let transaccionId = req.params.id;
        let transaccion = await ControlTransacciones.findByPk(transaccionId);

        if (!transaccion) {
            res.status(404).json({
                message: "No se encontró la transacción con id = " + transaccionId,
                transaccion: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                id_Cuenta: req.body.id_Cuenta,
                FechaHoraIngreso: req.body.FechaHoraIngreso,
                id_tipoTransaccion: req.body.id_tipoTransaccion,
                MontoTransaccionCredito: req.body.MontoTransaccionCredito || null,
                MontoTransaccionDebito: req.body.MontoTransaccionDebito || null
            }
            let result = await ControlTransacciones.update(updatedObject, { returning: true, where: { id_registro: transaccionId } });
            
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar la transacción con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Transacción actualizada exitosamente con id = " + transaccionId,
                transaccion: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar la transacción con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let transaccionId = req.params.id;
        let transaccion = await ControlTransacciones.findByPk(transaccionId);

        if (!transaccion) {
            res.status(404).json({
                message: "No existe la transacción con id = " + transaccionId,
                error: "404",
            });
        } else {
            await transaccion.destroy();
            res.status(200).json({
                message: "Transacción eliminada exitosamente con id = " + transaccionId,
                transaccion: transaccion,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar la transacción con id = " + req.params.id,
            error: error.message,
        });
    }
}
