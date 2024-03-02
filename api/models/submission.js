module.exports = (sequelize, DataTypes) => {
  return sequelize.define('submission', {
    id:{
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type:{
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    level:{
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rts: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    dtCreated: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    dtUpdated: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    done: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    },
    tab:{
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    charset: 'utf8mb4', 
    collate: 'utf8mb4_0900_ai_ci',
    tableName: 'SP_SUBMISSION',
  });
};