import { archive } from '../crm/entity/archive';
import { batchCreate } from '../crm/entity/batchCreate';
import { batchUpdate } from '../crm/entity/batchUpdate';
import { batchArchive } from '../crm/entity/batchArchive';
import { create } from '../crm/entity/create';
import { getAll } from '../crm/entity/getAll';
import { update } from '../crm/entity/update';

export const Companies = getAll('Companies')
export const CompaniesCreate = create('Companies')
export const CompaniesBatchCreate = batchCreate('Companies')
export const CompaniesUpdate = update('Companies')
export const CompaniesBatchUpdate = batchUpdate('Companies')
export const CompaniesArchive = archive('Companies')
export const CompaniesBatchArchive = batchArchive('Companies')