import importerStore from '@/shared/importer/importer-store';
import { LogService } from '@/modules/log/log-service';
import logImporterFields from '@/modules/log/log-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  LogService.import,
  logImporterFields,
  i18n('entities.log.importer.fileName'),
  i18n('entities.log.importer.hint'),
);
