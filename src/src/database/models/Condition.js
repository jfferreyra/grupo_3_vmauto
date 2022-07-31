module.exports = (sequelize, dataTypes) => {
    let alias = 'Condition';
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
        tableName:'conditions',
        timestamps: false,
        underscored:true
    }
    const Condition = sequelize.define(alias,cols,config);

    //Asociaciones

    Condition.associate=function(models){
        Condition.hasMany(models.Car,{
            as:'cars',
            foreignKey:'condition_id'
        });
        
    };
    return Condition;
};