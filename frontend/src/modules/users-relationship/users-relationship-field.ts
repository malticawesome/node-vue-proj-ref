import { UsersRelationshipService } from '@/modules/users-relationship/users-relationship-service';
import RelationToOneField from '@/shared/fields/relation-to-one-field';
import RelationToManyField from '@/shared/fields/relation-to-many-field';
import Permissions from '@/security/permissions';

export class UsersRelationshipField {
  static relationToOne(name, label, options) {
    return new RelationToOneField(
      name,
      label,
      '/users-relationship',
      Permissions.values.usersRelationshipRead,
      UsersRelationshipService.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.id,
        };
      },
      options,
    );
  }

  static relationToMany(name, label, options) {
    return new RelationToManyField(
      name,
      label,
      '/users-relationship',
      Permissions.values.usersRelationshipRead,
      UsersRelationshipService.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.id,
        };
      },
      options,
    );
  }
}
