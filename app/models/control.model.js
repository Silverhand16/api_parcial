module.exports = (sequelize, Sequelize) => {
    const ControlTransacciones = sequelize.define('controlTransacciones', {
        id_registro: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_Cuenta: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        FechaHoraIngreso: {
            type: Sequelize.DATE,
            allowNull: false
        },
        id_tipoTransaccion: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        MontoTransaccionCredito: {
            type: Sequelize.FLOAT,
            defaultValue: 0.0
        },
        MontoTransaccionDebito: {
            type: Sequelize.FLOAT,
            defaultValue: 0.0
        }
    });

    return ControlTransacciones;
};
