import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import AuditLogRepository from '../../database/repositories/auditLogRepository';
import lodash from 'lodash';
import SequelizeFilterUtils from '../../database/utils/sequelizeFilterUtils';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import UserRepository from './userRepository';
import {IRepositoryOptions} from './IRepositoryOptions';

const Op = Sequelize.Op;

class UsersRelationshipRepository {

    // RELATIONSHIP METHODS

    static async destroyRelationship(user, options: IRepositoryOptions) {
        let relationshipId = await this.findRelationship(user, options);
        await this.destroy(relationshipId, options);
    }

    static async createRelationship(user, options: IRepositoryOptions) {
        const currentUserRole = SequelizeRepository.getCurrentUserRoles(options.currentUser)
        let data;
        if (currentUserRole.includes("consultant")) {
            data = {
                client: user.id,
                consultant: options.currentUser.id
            }
        }

        if (currentUserRole.includes("client")) {
            data = {
                client: options.currentUser.id,
                consultant: user.id
            }
        }

        return this.create(data, options)
    }

    static async findRelationship(
        user,
        options: IRepositoryOptions,
    ) {

        let whereAnd: Array<any> = [];
        let include = [
            {
                model: options.database.user,
                as: 'consultant',
            },
            {
                model: options.database.user,
                as: 'client',
            },
        ];
        const tenant = SequelizeRepository.getCurrentTenant(
            options,
        );
        let currentUser = SequelizeRepository.getCurrentUser(
            options,
        );
        let currentUserRoles = SequelizeRepository.getCurrentUserRoles(currentUser);
        whereAnd.push({
            tenantId: tenant.id,
        });
        if (currentUserRoles.includes("consultant")) {
            whereAnd.push({
                ['consultantId']: currentUser.id
            });
            whereAnd.push({
                ['clientId']: user.id
            });
        }

        if (currentUserRoles.includes("client")) {
            whereAnd.push({
                ['consultantId']: user.id
            });
            whereAnd.push({
                ['clientId']: currentUser.id
            });
        }
        const where = {[Op.and]: whereAnd};

        let {
            rows
        } = await options.database.usersRelationship.findAndCountAll({
            where,
            include,
            transaction: SequelizeRepository.getTransaction(
                options,
            ),
        });
        const result = await this._fillWithRelationsAndFilesForRows(
            rows,
            options,
        );

        return result[0].id;
    }


    // ENTITY CRUD METHODS

    static async create(data, options: IRepositoryOptions) {
        const currentUser = SequelizeRepository.getCurrentUser(
            options,
        );

        const tenant = SequelizeRepository.getCurrentTenant(
            options,
        );

        const transaction = SequelizeRepository.getTransaction(
            options,
        );

        const record = await options.database.usersRelationship.create(
            {
                ...lodash.pick(data, [

                    'importHash',
                ]),
                consultantId: data.consultant || null,
                clientId: data.client || null,
                tenantId: tenant.id,
                createdById: currentUser.id,
                updatedById: currentUser.id,
            },
            {
                transaction,
            },
        );


        await this._createAuditLog(
            AuditLogRepository.CREATE,
            record,
            data,
            options,
        );

        return this.findById(record.id, options);
    }

    static async update(id, data, options: IRepositoryOptions) {
        const currentUser = SequelizeRepository.getCurrentUser(
            options,
        );

        const transaction = SequelizeRepository.getTransaction(
            options,
        );


        const currentTenant = SequelizeRepository.getCurrentTenant(
            options,
        );

        let record = await options.database.usersRelationship.findOne(
            {
                where: {
                    id,
                    tenantId: currentTenant.id,
                },
                transaction,
            },
        );

        if (!record) {
            throw new Error404();
        }

        record = await record.update(
            {
                ...lodash.pick(data, [

                    'importHash',
                ]),
                consultantId: data.consultant || null,
                clientId: data.client || null,
                updatedById: currentUser.id,
            },
            {
                transaction,
            },
        );


        await this._createAuditLog(
            AuditLogRepository.UPDATE,
            record,
            data,
            options,
        );

        return this.findById(record.id, options);
    }

    static async destroy(id, options: IRepositoryOptions) {
        const transaction = SequelizeRepository.getTransaction(
            options,
        );

        const currentTenant = SequelizeRepository.getCurrentTenant(
            options,
        );

        let record = await options.database.usersRelationship.findOne(
            {
                where: {
                    id,
                    tenantId: currentTenant.id,
                },
                transaction,
            },
        );

        if (!record) {
            throw new Error404();
        }

        await record.destroy({
            transaction,
        });

        await this._createAuditLog(
            AuditLogRepository.DELETE,
            record,
            record,
            options,
        );
    }

    static async findById(id, options: IRepositoryOptions) {
        const transaction = SequelizeRepository.getTransaction(
            options,
        );

        const include = [
            {
                model: options.database.user,
                as: 'consultant',
            },
            {
                model: options.database.user,
                as: 'client',
            },
        ];

        const currentTenant = SequelizeRepository.getCurrentTenant(
            options,
        );

        const record = await options.database.usersRelationship.findOne(
            {
                where: {
                    id,
                    tenantId: currentTenant.id,
                },
                include,
                transaction,
            },
        );

        if (!record) {
            throw new Error404();
        }

        return this._fillWithRelationsAndFiles(record, options);
    }

    static async filterIdInTenant(
        id,
        options: IRepositoryOptions,
    ) {
        return lodash.get(
            await this.filterIdsInTenant([id], options),
            '[0]',
            null,
        );
    }

    static async filterIdsInTenant(
        ids,
        options: IRepositoryOptions,
    ) {
        if (!ids || !ids.length) {
            return [];
        }

        const currentTenant =
            SequelizeRepository.getCurrentTenant(options);

        const where = {
            id: {
                [Op.in]: ids,
            },
            tenantId: currentTenant.id,
        };

        const records = await options.database.usersRelationship.findAll(
            {
                attributes: ['id'],
                where,
            },
        );

        return records.map((record) => record.id);
    }

    static async count(filter, options: IRepositoryOptions) {
        const transaction = SequelizeRepository.getTransaction(
            options,
        );

        const tenant = SequelizeRepository.getCurrentTenant(
            options,
        );

        return options.database.usersRelationship.count(
            {
                where: {
                    ...filter,
                    tenantId: tenant.id,
                },
                transaction,
            },
        );
    }


    static async findAndCountAll(
        {filter, limit = 0, offset = 0, orderBy = ''},
        options: IRepositoryOptions,
    ) {
        const tenant = SequelizeRepository.getCurrentTenant(
            options,
        );

        let whereAnd: Array<any> = [];
        let include = [
            {
                model: options.database.user,
                as: 'consultant',
            },
            {
                model: options.database.user,
                as: 'client',
            },
        ];

        whereAnd.push({
            tenantId: tenant.id,
        });

        if (filter) {
            if (filter.id) {
                whereAnd.push({
                    ['id']: SequelizeFilterUtils.uuid(filter.id),
                });
            }

            if (filter.consultant) {
                whereAnd.push({
                    ['consultantId']: SequelizeFilterUtils.uuid(
                        filter.consultant,
                    ),
                });
            }

            if (filter.client) {
                whereAnd.push({
                    ['clientId']: SequelizeFilterUtils.uuid(
                        filter.client,
                    ),
                });
            }

            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (
                    start !== undefined &&
                    start !== null &&
                    start !== ''
                ) {
                    whereAnd.push({
                        ['createdAt']: {
                            [Op.gte]: start,
                        },
                    });
                }

                if (
                    end !== undefined &&
                    end !== null &&
                    end !== ''
                ) {
                    whereAnd.push({
                        ['createdAt']: {
                            [Op.lte]: end,
                        },
                    });
                }
            }
        }

        const where = {[Op.and]: whereAnd};

        let {
            rows,
            count,
        } = await options.database.usersRelationship.findAndCountAll({
            where,
            include,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order: orderBy
                ? [orderBy.split('_')]
                : [['createdAt', 'DESC']],
            transaction: SequelizeRepository.getTransaction(
                options,
            ),
        });

        rows = await this._fillWithRelationsAndFilesForRows(
            rows,
            options,
        );

        return {rows, count};
    }

    static async findAllAutocomplete(query, limit, options: IRepositoryOptions) {
        const tenant = SequelizeRepository.getCurrentTenant(
            options,
        );

        let whereAnd: Array<any> = [{
            tenantId: tenant.id,
        }];

        if (query) {
            whereAnd.push({
                [Op.or]: [
                    {['id']: SequelizeFilterUtils.uuid(query)},

                ],
            });
        }

        const where = {[Op.and]: whereAnd};

        const records = await options.database.usersRelationship.findAll(
            {
                attributes: ['id', 'id'],
                where,
                limit: limit ? Number(limit) : undefined,
                order: [['id', 'ASC']],
            },
        );

        return records.map((record) => ({
            id: record.id,
            label: record.id,
        }));
    }

    static async _createAuditLog(
        action,
        record,
        data,
        options: IRepositoryOptions,
    ) {
        let values = {};

        if (data) {
            values = {
                ...record.get({plain: true}),

            };
        }

        await AuditLogRepository.log(
            {
                entityName: 'usersRelationship',
                entityId: record.id,
                action,
                values,
            },
            options,
        );
    }

    static async _fillWithRelationsAndFilesForRows(
        rows,
        options: IRepositoryOptions,
    ) {
        if (!rows) {
            return rows;
        }

        return Promise.all(
            rows.map((record) =>
                this._fillWithRelationsAndFiles(record, options),
            ),
        );
    }

    static async _fillWithRelationsAndFiles(record, options: IRepositoryOptions) {
        if (!record) {
            return record;
        }

        const output = record.get({plain: true});

        const transaction = SequelizeRepository.getTransaction(
            options,
        );

        output.consultant = UserRepository.cleanupForRelationships(output.consultant);

        output.client = UserRepository.cleanupForRelationships(output.client);

        return output;
    }

    static async fetchIdsOfRelatedUsers(options: IRepositoryOptions) {
        let whereAnd: Array<any> = [];

        const {currentUser} = options;
        let currentUserRoles = SequelizeRepository.getCurrentUserRoles(currentUser);

        if (currentUserRoles.includes("consultant")) {
            whereAnd.push({
                ["consultantId"]: currentUser.id,
            });
        }
        if (currentUserRoles.includes("client")) {
            whereAnd.push({
                ["clientId"]: currentUser.id,
            });
        }

        let include = [
            {
                model: options.database.user,
                as: 'consultant',
            },
            {
                model: options.database.user,
                as: 'client',
            },
        ];

        const where = {[Op.and]: whereAnd};
        let {
            rows
        } = await options.database.usersRelationship.findAndCountAll({
            where,
            include,
            transaction: SequelizeRepository.getTransaction(
                options,
            ),
        });
        let ids;
        if (currentUserRoles.includes("consultant")) {
            ids = rows.map(item => item.client.dataValues.id);
        }
        if (currentUserRoles.includes("client")) {
            ids = rows.map(item => item.consultant.dataValues.id);
        }
        return ids
    }
}

export default UsersRelationshipRepository;
