import { LogModel } from '@/modules/log/log-model';

const { fields } = LogModel;

export default [
  fields.id,
  fields.liquidInjection,
  fields.createdAt,
  fields.updatedAt
];
