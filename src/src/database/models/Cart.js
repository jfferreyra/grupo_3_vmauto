module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';
    let cols = {
        id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
            allowNull: false,
        },
        car_id: {
            type: dataTypes.BIGINT(20).UNSIGNED,
            allowNull: false,
        },
    };
    let config = {
        tableName:'carts',
        timestamps: false,
        underscored:true
    }
    const Cart = sequelize.define(alias,cols,config);

    //Asociaciones

    Cart.associate=function(models){
        Cart.belongsTo(models.User,{
            as:'user',
            foreignKey:'user_id'
        });
        Cart.belongsTo(models.Car,{
            as:'car',
            foreignKey:'car_id'
        })
        
    };
    return Cart;
};