module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_type_id: {
            type: dataTypes.TINYINT(4),
            allowNull: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        surname: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        dni: {
          type: dataTypes.INTEGER(11),
          allowNull: false
        },
        birth: {
          type: dataTypes.DATEONLY,
          allowNull: false
        },
        email: {
          type: dataTypes.STRING(45),
          allowNull: false
        },
        location_id: {
          type: dataTypes.SMALLINT(5),
          allowNull: false
        },
        address: {
          type: dataTypes.STRING(100),
          allowNull: false
        },
        phone: {
          type: dataTypes.STRING(45),
          allowNull: false
        },
        pass: {
          type: dataTypes.STRING(100),
          allowNull: false
        },
        img: {
          type: dataTypes.STRING(45),
          allowNull: true
        },
    };
    let config = {
      tableName:'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false,
      underscored:true
    };
    const User = sequelize.define(alias,cols,config);

    //Asociaciones

    User.associate=function(models){
        User.belongsTo(models.UserType,{
            as:'userType',
            foreignKey:'user_type_id'
        });
        User.belongsTo(models.Location,{
            as:'location',
            foreignKey:'location_id'
        });
        User.hasMany(models.Cart,{
          as:'carts',
          foreignKey:'user_id'
        })
        // User.hasMany(models.Question,{
        //   as:'questions',
        //   foreignKey:'user_id'
        // });
        // User.hasMany(models.Purchase,{
        //   as:'purchases',
        //   foreignKey:'user_id'
        // });
        
    };
    return User;
};