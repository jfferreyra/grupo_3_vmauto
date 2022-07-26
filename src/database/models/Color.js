module.exports = (sequelize, dataTypes) => {
    let alias = 'Color';
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
    };
    let config = {
        tableName:'colors',
        timestamps: false,
        underscored:true
    }
    const Color = sequelize.define(alias,cols,config);

    //Asociaciones

    Color.associate=function(models){
        Color.hasMany(models.Car,{
            as:'cars',
            foreignKey:'color_id'
        });
        
    };
    return Color
};