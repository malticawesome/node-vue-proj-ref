import Permissions from '@/security/permissions';
import { PermissionChecker } from '@/modules/user/permission-checker';

export class LogPermissions {
  read: boolean;
  import: boolean;
  logAutocomplete: boolean;
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
      Permissions.values.logRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.logImport,
    );
    this.logAutocomplete = permissionChecker.match(
      Permissions.values.logAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.logCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.logEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.logDestroy,
    );
    this.lockedForCurrentPlan = permissionChecker.lockedForCurrentPlan(
      Permissions.values.logRead,
    );
  }
}
