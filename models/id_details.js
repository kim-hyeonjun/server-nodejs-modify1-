module.exports = function(sequelize, DataTypes){
    const id_details = sequelize.define('id_details',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name : { type: DataTypes.STRING },
            Lat : { type: DataTypes.INTEGER },
            Lon : { type: DataTypes.INTEGER }
        }
    );
    return id_details;
} 