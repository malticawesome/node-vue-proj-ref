import Roles from '@/security/roles';
import Plans from '@/security/plans';
import Storage from '@/security/storage';

const storage = Storage.values;
const roles = Roles.values;
const plans = Plans.values;

class Permissions {
  static get values() {
    return {
      tenantEdit: {
        id: 'tenantEdit',
        allowedRoles: [roles.admin, roles.consultant, roles.client],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      tenantDestroy: {
        id: 'tenantDestroy',
        allowedRoles: [roles.admin, roles.consultant, roles.client],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planEdit: {
        id: 'planEdit',
        allowedRoles: [roles.admin, roles.consultant],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planRead: {
        id: 'planRead',
        allowedRoles: [roles.admin, roles.consultant],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userEdit: {
        id: 'userEdit',
        allowedRoles: [roles.admin, roles.consultant],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userDestroy: {
        id: 'userDestroy',
        allowedRoles: [roles.admin, roles.consultant],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userCreate: {
        id: 'userCreate',
        allowedRoles: [roles.admin, roles.consultant],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userImport: {
        id: 'userImport',
        allowedRoles: [roles.admin, roles.consultant],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userRead: {
        id: 'userRead',
        allowedRoles: [roles.admin, roles.consultant],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userAutocomplete: {
        id: 'userAutocomplete',
        allowedRoles: [roles.admin, roles.consultant],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.admin, roles.consultant],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.settingsBackgroundImages,
          storage.settingsLogos,
        ],
      },
      logImport: {
        id: 'logImport',
        allowedRoles: [roles.admin, roles.consultant, roles.client],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      logCreate: {
        id: 'logCreate',
        allowedRoles: [roles.admin, roles.consultant, roles.client],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      logEdit: {
        id: 'logEdit',
        allowedRoles: [roles.admin, roles.consultant, roles.client],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      logDestroy: {
        id: 'logDestroy',
        allowedRoles: [roles.admin, roles.consultant, roles.client],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      logRead: {
        id: 'logRead',
        allowedRoles: [roles.admin, roles.consultant, roles.client],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      logAutocomplete: {
        id: 'logAutocomplete',
        allowedRoles: [roles.admin, roles.consultant, roles.client],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      usersRelationshipImport: {
        id: 'usersRelationshipImport',
        allowedRoles: [roles.admin, roles.consultant, roles.client],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      usersRelationshipCreate: {
        id: 'usersRelationshipCreate',
        allowedRoles: [roles.admin, roles.consultant, roles.client],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      usersRelationshipEdit: {
        id: 'usersRelationshipEdit',
        allowedRoles: [roles.admin, roles.consultant, roles.client],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      usersRelationshipDestroy: {
        id: 'usersRelationshipDestroy',
        allowedRoles: [roles.admin, roles.consultant, roles.client],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      usersRelationshipRead: {
        id: 'usersRelationshipRead',
        allowedRoles: [roles.admin, roles.consultant, roles.client],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      usersRelationshipAutocomplete: {
        id: 'usersRelationshipAutocomplete',
        allowedRoles: [roles.admin, roles.consultant, roles.client],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },      
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
