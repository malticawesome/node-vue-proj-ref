export default (app) => {
  app.post(
    `/tenant/:tenantId/log`,
    require('./logCreate').default,
  );
  app.put(
    `/tenant/:tenantId/log/:id`,
    require('./logUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/log/import`,
    require('./logImport').default,
  );
  app.delete(
    `/tenant/:tenantId/log`,
    require('./logDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/log/autocomplete`,
    require('./logAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/log`,
    require('./logList').default,
  );
  app.get(
    `/tenant/:tenantId/log/:id`,
    require('./logFind').default,
  );
};
