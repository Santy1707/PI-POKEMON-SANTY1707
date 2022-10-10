const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  // definir el segundo modelo TYPE
  sequelize.define('types', {
    name: {  
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true 
    },
  /*  id: {
      type: DataTypes.UUID, 
      allowNull: false,  
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 // Creo un nuevo ID Unico
  }, */
});
};
