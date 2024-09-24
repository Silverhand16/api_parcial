const db = require('../config/db.config.js');
const TipoTransaccion = db.TipoTransaccion;

exports.create = (req, res) => {
    let tipoTransaccion = {};

    try {
        tipoTransaccion.descripcion = req.body.descripcion;

        TipoTransaccion.create(tipoTransaccion).then(result => {    
            res.status(200).json({
                message: "Tipo de transacción creado exitosamente con id = " + result.id_tipoTransaccion,
                tipoTransaccion: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

exports.retrieveAllTiposTransaccion = (req, res) => {
    TipoTransaccion.findAll()
        .then(tipos => {
            res.status(200).json({
                message: "¡Todos los tipos de transacción obtenidos exitosamente!",
                tiposTransaccion: tipos
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

exports.getTipoTransaccionById = (req, res) => {
    let tipoTransaccionId = req.params.id;
    TipoTransaccion.findByPk(tipoTransaccionId)
        .then(tipoTransaccion => {
            res.status(200).json({
                message: "Tipo de transacción obtenido exitosamente con id = " + tipoTransaccionId,
                tipoTransaccion: tipoTransaccion
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
        let tipoTransaccionId = req.params.id;
        let tipoTransaccion = await TipoTransaccion.findByPk(tipoTransaccionId);

        if (!tipoTransaccion) {
            res.status(404).json({
                message: "No se encontró el tipo de transacción con id = " + tipoTransaccionId,
                tipoTransaccion: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                descripcion: req.body.descripcion
            }
            let result = await TipoTransaccion.update(updatedObject, { returning: true, where: { id_tipoTransaccion: tipoTransaccionId } });
            
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el tipo de transacción con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Tipo de transacción actualizado exitosamente con id = " + tipoTransaccionId,
                tipoTransaccion: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el tipo de transacción con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let tipoTransaccionId = req.params.id;
        let tipoTransaccion = await TipoTransaccion.findByPk(tipoTransaccionId);

        if (!tipoTransaccion) {
            res.status(404).json({
                message: "No existe el tipo de transacción con id = " + tipoTransaccionId,
                error: "404",
            });
        } else {
            await tipoTransaccion.destroy();
            res.status(200).json({
                message: "Tipo de transacción eliminado exitosamente con id = " + tipoTransaccionId,
                tipoTransaccion: tipoTransaccion,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el tipo de transacción con id = " + req.params.id,
            error: error.message,
        });
    }
}
