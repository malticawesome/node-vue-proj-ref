import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import { GenericModel } from '@/shared/model/generic-model';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import { UserField } from '@/modules/user/user-field';

function label(name) {
  return i18n(`entities.usersRelationship.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  consultant: UserField.relationToOne('consultant', label('consultant'), {}),
  client: UserField.relationToOne('client', label('client'), {}),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),

};

export class UsersRelationshipModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
