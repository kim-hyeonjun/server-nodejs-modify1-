module.exports = function(sequelize, DataTypes){
    const Products = sequelize.define('Products',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name : { type: DataTypes.STRING },
            price : { type: DataTypes.STRING }, //int 타입을 varchar형으로 변화함 
            description : { type: DataTypes.TEXT }
        }
    );
    return Products;
} 