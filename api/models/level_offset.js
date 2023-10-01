module.exports = (sequelize, DataTypes) => {
  return sequelize.define('level_offset', {
    id:{
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type:{
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    level:{
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    offset: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
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
    }
  }, {
    charset: 'utf8mb4', 
    collate: 'utf8mb4_0900_ai_ci',
    tableName: 'SP_LEVEL_OFFSET',
  });
};