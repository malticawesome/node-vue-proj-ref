import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const usersRelationship = sequelize.define(
    'usersRelationship',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  usersRelationship.associate = (models) => {
    models.usersRelationship.belongsTo(models.user, {
      as: 'consultant',
      constraints: false,
    });

    models.usersRelationship.belongsTo(models.user, {
      as: 'client',
      constraints: false,
    });


    
    models.usersRelationship.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.usersRelationship.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.usersRelationship.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return usersRelationship;
}
