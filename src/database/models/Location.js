module.exports = (sequelize, dataTypes) => {
    let alias = 'Location';
    let cols = {
        id: {
            type: dataTypes.SMALLINT(5).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        state_id: {
            type: dataTypes.SMALLINT(5),
            allowNull: false
        },
    };
    let config = {
        tableName:'locations',
        timestamps: false,
        underscored:true
    }
    const Location = sequelize.define(alias,cols,config);

    //Asociaciones

    Location.associate=function(models){
        Location.belongsTo(models.State,{
            as:'state',
            foreignKey:'state_id'
        });
        Location.hasMany(models.User,{
            as:'users',
            foreignKey:'location_id'
        });
    };
    return Location;
};