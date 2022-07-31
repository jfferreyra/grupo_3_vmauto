module.exports = (sequelize, dataTypes) => {
    let alias = 'Transmission';
    let cols = {
        id: {
            type: dataTypes.TINYINT(1).UNSIGNED,
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
        tableName:'transmissions',
        timestamps: false,
        underscored:true
    }
    const Transmission = sequelize.define(alias,cols,config);

    //Asociaciones

    Transmission.associate=function(models){
        Transmission.hasMany(models.Car,{
            as:'cars',
            foreignKey:'transmission_id'
        });
        
    };
    return Transmission;
};