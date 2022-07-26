module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.TINYINT(2).UNSIGNED,
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
        tableName:'categories',
        timestamps: false,
        underscored:true
    }
    const Category = sequelize.define(alias,cols,config);

    //Asociaciones

    Category.associate=function(models){
        Category.hasMany(models.Car,{
            as:'cars',
            foreignKey:'category_id'
        });
        
    };
    return Category;
};