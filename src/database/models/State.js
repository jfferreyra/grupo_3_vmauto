module.exports = (sequelize, dataTypes) => {
    let alias = 'State';
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
    };
    let config = {
        tableName:'states',
        timestamps: false,
        underscored:true
    }
    const State = sequelize.define(alias,cols,config);

    //Asociaciones

    State.associate=function(models){
        State.hasMany(models.Location,{
            as:'locations',
            foreignKey:'state_id'
        });
        
    };
    return State
};