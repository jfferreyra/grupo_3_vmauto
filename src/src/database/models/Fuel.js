module.exports = (sequelize, dataTypes) => {
    let alias = 'Fuel';
    let cols = {
        id: {
            type: dataTypes.TINYINT(4).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
    };
    let config = {
        tableName:'fuel',
        timestamps: false,
        underscored:true
    }
    const Fuel = sequelize.define(alias,cols,config);

    //Asociaciones

    Fuel.associate=function(models){
        Fuel.hasMany(models.Car,{
            as:'cars',
            foreignKey:'fuel_id'
        });
        
    };
    return Fuel;
};