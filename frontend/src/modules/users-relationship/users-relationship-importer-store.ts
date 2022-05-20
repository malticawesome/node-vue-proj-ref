import importerStore from '@/shared/importer/importer-store';
import { UsersRelationshipService } from '@/modules/users-relationship/users-relationship-service';
import usersRelationshipImporterFields from '@/modules/users-relationship/users-relationship-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  UsersRelationshipService.import,
  usersRelationshipImporterFields,
  i18n('entities.usersRelationship.importer.fileName'),
  i18n('entities.usersRelationship.importer.hint'),
);
