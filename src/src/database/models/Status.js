module.exports = (sequelize, dataTypes) => {
    let alias = 'Status';
    let cols = {
        id: {
            type: dataTypes.TINYINT(3).UNSIGNED,
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
        tableName:'status',
        timestamps: false,
        underscored:true
    }
    const Status = sequelize.define(alias,cols,config);

    //Asociaciones

    Status.associate=function(models){
        Status.hasMany(models.Car,{
            as:'cars',
            foreignKey:'status_id'
        });
        
    };
    return Status
};