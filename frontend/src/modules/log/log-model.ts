import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import { GenericModel } from '@/shared/model/generic-model';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import DecimalRangeField from '@/shared/fields/decimal-range-field';
import DecimalField from '@/shared/fields/decimal-field';

function label(name) {
  return i18n(`entities.log.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  liquidInjection: new DecimalField('liquidInjection', label('liquidInjection'), {}),
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
  liquidInjectionRange: new DecimalRangeField(
    'liquidInjectionRange',
    label('liquidInjectionRange'),
  ),
};

export class LogModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
