const db = require('../config/db.config.js');
const Cuenta = db.Cuenta;

exports.create = (req, res) => {
    let cuenta = {};

    try {
        cuenta.NoCuenta = req.body.NoCuenta;
        cuenta.TipoCuenta = req.body.TipoCuenta;
        cuenta.NombreCompleto = req.body.NombreCompleto;
        cuenta.FechaIngreso = req.body.FechaIngreso;
        cuenta.FechaNacimiento = req.body.FechaNacimiento;
        cuenta.Genero = req.body.Genero;
        cuenta.SaldoInicial = req.body.SaldoInicial;

        Cuenta.create(cuenta).then(result => {    
            res.status(200).json({
                message: "Cuenta creada exitosamente con id = " + result.IdCuenta,
                cuenta: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

exports.retrieveAllCuentas = (req, res) => {
    Cuenta.findAll()
        .then(cuentas => {
            res.status(200).json({
                message: "¡Todas las cuentas obtenidas exitosamente!",
                cuentas: cuentas
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

exports.getCuentaById = (req, res) => {
    let cuentaId = req.params.id;
    Cuenta.findByPk(cuentaId)
        .then(cuenta => {
            res.status(200).json({
                message: "Cuenta obtenida exitosamente con id = " + cuentaId,
                cuenta: cuenta
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
        let cuentaId = req.params.id;
        let cuenta = await Cuenta.findByPk(cuentaId);

        if (!cuenta) {
            res.status(404).json({
                message: "No se encontró la cuenta con id = " + cuentaId,
                cuenta: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                NoCuenta: req.body.NoCuenta,
                TipoCuenta: req.body.TipoCuenta,
                NombreCompleto: req.body.NombreCompleto,
                FechaIngreso: req.body.FechaIngreso,
                FechaNacimiento: req.body.FechaNacimiento,
                Genero: req.body.Genero,
                SaldoInicial: req.body.SaldoInicial
            }
            let result = await Cuenta.update(updatedObject, { returning: true, where: { IdCuenta: cuentaId } });
            
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar la cuenta con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Cuenta actualizada exitosamente con id = " + cuentaId,
                cuenta: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar la cuenta con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let cuentaId = req.params.id;
        let cuenta = await Cuenta.findByPk(cuentaId);

        if (!cuenta) {
            res.status(404).json({
                message: "No existe la cuenta con id = " + cuentaId,
                error: "404",
            });
        } else {
            await cuenta.destroy();
            res.status(200).json({
                message: "Cuenta eliminada exitosamente con id = " + cuentaId,
                cuenta: cuenta,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar la cuenta con id = " + req.params.id,
            error: error.message,
        });
    }
}
