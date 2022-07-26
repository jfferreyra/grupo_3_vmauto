module.exports = (sequelize, dataTypes) => {
    let alias = 'Car';
    let cols = {
        id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        status_id: {
            type: dataTypes.TINYINT(3),
            allowNull: false
        },
        brand_id: {
            type: dataTypes.SMALLINT(4),
            allowNull: false
        },
        model: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        condition_id: {
            type: dataTypes.TINYINT(1),
            allowNull: false
        },
        year: {
          type: dataTypes.SMALLINT(4),
          allowNull: false
        },
        km: {
          type: dataTypes.INTEGER(11),
          allowNull: false
        },
        engine: {
          type: dataTypes.STRING(50),
          allowNull: false
        },
        fuel_id: {
          type: dataTypes.TINYINT(2),
          allowNull: false
        },
        transmission_id: {
          type: dataTypes.TINYINT(1),
          allowNull: false
        },
        color_id: {
          type: dataTypes.SMALLINT(4),
          allowNull: false
        },
        doors: {
          type: dataTypes.TINYINT(3),
          allowNull: false
        },
        airbags: {
          type: dataTypes.TINYINT(3),
          allowNull: false
        },
        category_id: {
          type: dataTypes.SMALLINT(2),
          allowNull: false
        },
        price: {
          type: dataTypes.INTEGER(11),
          allowNull: false
        },
        currency_id: {
          type: dataTypes.SMALLINT(4),
          allowNull: false
        },
        description: {
          type: dataTypes.TEXT,
          allowNull: false
        },
        imgs: {
          type: dataTypes.TEXT,
          allowNull: false
        }
    };
    let config = {
      tableName:'cars',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false,
      underscored:true
    };
    const Car = sequelize.define(alias,cols,config);

    //Asociaciones

    Car.associate=function(models){
        Car.belongsTo(models.Brand,{
            as:'brand',
            foreignKey:'brand_id'
        });
        Car.belongsTo(models.Category,{
            as:'category',
            foreignKey:'category_id'
        });
        Car.belongsTo(models.Color,{
            as:'color',
            foreignKey:'color_id'
        });
        Car.belongsTo(models.Condition,{
            as:'condition',
            foreignKey:'condition_id'
        });
        Car.belongsTo(models.Currency,{
            as:'currency',
            foreignKey:'currency_id'
        });
        Car.belongsTo(models.Fuel,{
            as:'fuel',
            foreignKey:'fuel_id'
        });
        Car.belongsTo(models.Status,{
            as:'status',
            foreignKey:'status_id'
        });
        Car.belongsTo(models.Transmission,{
            as:'transmission',
            foreignKey:'transmission_id'
        });
        Car.hasMany(models.Cart,{
          as:'carts',
          foreignKey:'car_id'
        })
        
    };
    return Car;
};