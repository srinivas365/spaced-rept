module.exports = (sequelize, DataTypes) => {
  return sequelize.define('category', {
    id:{
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    },
    dtCreated: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    dtUpdated: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    tab:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
  }, {
    charset: 'utf8mb4', 
    collate: 'utf8mb4_0900_ai_ci',
    tableName: 'SP_CATEGORY',
  });
};