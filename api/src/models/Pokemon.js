const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
      // 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull : {
          msg: 'Es necesario un nombre'
        },
        len: {
          args: [2, 20],
          mas: 'Debe contener entre 2 y 20'
        }
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Se necesita un valor menor a 2.000.000.000"
        }
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Se necesita un valor menor a 2.000.000.000"
        }
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Se necesita un valor menor a 2.000.000.000"
      }
    }
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Se necesita un valor menor a 2.000.000.000"
        }
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Se necesita un valor menor a 2.000.000.000"
        }
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Se necesita un valor menor a 2.000.000.000"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "La Imagen es necesaria"
        }
      }
    },
    created: { //cuando creo mi campo le pongo valor null y uso eso para diferenciarlo de los que vienen de la api
      type: DataTypes.BOOLEAN,
  //  allowNull: false,
      defaultValue: true 
    }
  });
};



