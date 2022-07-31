module.exports = (sequelize, dataTypes) => {
    let alias = 'UserType';
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
        tableName:'user_types',
        timestamps: false,
        underscored:true
    }
    const UserType = sequelize.define(alias,cols,config);

    //Asociaciones

    UserType.associate=function(models){
        UserType.hasMany(models.User,{
            as:'users',
            foreignKey:'user_type_id'
        });
        
    };
    return UserType;
};