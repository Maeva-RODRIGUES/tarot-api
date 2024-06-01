// Ce fichier définit le modeèèle "Drawing"
// drawingsModels.js

module.exports = (sequelize, DataTypes) => {
    const Drawing = sequelize.define('Drawings', {
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      cards: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      id_Themes: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Themes', // Assurez-vous que cela correspond au nom de la table telle qu'elle est définie dans Sequelize
          key: 'id'
        }
      },
      id_Users: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // Assurez-vous que cela correspond au nom de la table telle qu'elle est définie dans Sequelize
          key: 'id'
        }
      }
    }, {
      timestamps: false // Mettez à false si vous ne souhaitez pas les champs createdAt et updatedAt
    });
  
    return Drawing;
  };
  