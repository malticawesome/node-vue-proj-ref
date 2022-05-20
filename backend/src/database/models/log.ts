import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const log = sequelize.define(
    'log',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      liquidInjection: {
        type: DataTypes.DECIMAL,
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,    
        validate: {
          len: [0, 255],
        },    
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },

      ],
      timestamps: true,
      paranoid: true,
    },
  );

  log.associate = (models) => {



    
    models.log.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.log.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.log.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return log;
}
