import { UsersRelationshipModel } from '@/modules/users-relationship/users-relationship-model';

const { fields } = UsersRelationshipModel;

export default [
  fields.id,
  fields.consultant,
  fields.client,
  fields.createdAt,
  fields.updatedAt
];
