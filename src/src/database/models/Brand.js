module.exports = (sequelize, dataTypes) => {
    let alias = 'Brand';
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
        tableName:'brands',
        timestamps: false,
        underscored:true
    }
    const Brand = sequelize.define(alias,cols,config);

    //Asociaciones

    Brand.associate=function(models){
        Brand.hasMany(models.Car,{
            as:'cars',
            foreignKey:'brand_id'
        });
        
    };
    return Brand
};