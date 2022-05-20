import Permissions from '@/security/permissions';
import { PermissionChecker } from '@/modules/user/permission-checker';

export class UsersRelationshipPermissions {
  read: boolean;
  import: boolean;
  usersRelationshipAutocomplete: boolean;
  create: boolean;
  edit: boolean;
  destroy: boolean;
  lockedForCurrentPlan: boolean;

  constructor(currentTenant, currentUser) {
    const permissionChecker = new PermissionChecker(
      currentTenant,
      currentUser,
    );

    this.read = permissionChecker.match(
      Permissions.values.usersRelationshipRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.usersRelationshipImport,
    );
    this.usersRelationshipAutocomplete = permissionChecker.match(
      Permissions.values.usersRelationshipAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.usersRelationshipCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.usersRelationshipEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.usersRelationshipDestroy,
    );
    this.lockedForCurrentPlan = permissionChecker.lockedForCurrentPlan(
      Permissions.values.usersRelationshipRead,
    );
  }
}
