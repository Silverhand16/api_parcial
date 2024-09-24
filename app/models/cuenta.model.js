module.exports = (sequelize, Sequelize) => {
    const Cuenta = sequelize.define('cuenta', {
        IdCuenta: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        NoCuenta: {
            type: Sequelize.STRING
        },
        TipoCuenta: {
            type: Sequelize.STRING
        },
        NombreCompleto: {
            type: Sequelize.STRING
        },
        FechaIngreso: {
            type: Sequelize.DATE
        },
        FechaNacimiento: {
            type: Sequelize.DATE
        },
        Genero: {
            type: Sequelize.STRING
        },
        SaldoInicial: {
            type: Sequelize.FLOAT
        }
    });

    return Cuenta;
};
