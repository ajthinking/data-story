import { archive } from '../crm/entity/archive';
import { batchCreate } from '../crm/entity/batchCreate';
import { batchUpdate } from '../crm/entity/batchUpdate';
import { batchArchive } from '../crm/entity/batchArchive';
import { create } from '../crm/entity/create';
import { getAll } from '../crm/entity/getAll';
import { update } from '../crm/entity/update';

export const Deals = getAll('Deals')
export const DealsCreate = create('Deals')
export const DealsBatchCreate = batchCreate('Deals')
export const DealUpdate = update('Deal')
export const DealsBatchUpdate = batchUpdate('Deals')
export const DealsArchive = archive('Deals')
export const DealsBatchArchive = batchArchive('Deals')