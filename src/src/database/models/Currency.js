module.exports = (sequelize, dataTypes) => {
    let alias = 'Currency';
    let cols = {
        id: {
            type: dataTypes.SMALLINT(4).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        symbol: {
            type: dataTypes.STRING(10),
            allowNull: false
        },
    };
    let config = {
        tableName:'currencies',
        timestamps: false,
        underscored:true
    }
    const Currency = sequelize.define(alias,cols,config);

    //Asociaciones

    Currency.associate=function(models){
        Currency.hasMany(models.Car,{
            as:'cars',
            foreignKey:'currency_id'
        });
        
    };
    return Currency
};