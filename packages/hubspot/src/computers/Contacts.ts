import { archive } from '../crm/entity/archive';
import { batchCreate } from '../crm/entity/batchCreate';
import { batchUpdate } from '../crm/entity/batchUpdate';
import { batchArchive } from '../crm/entity/batchArchive';
import { create } from '../crm/entity/create';
import { getAll } from '../crm/entity/getAll';
import { update } from '../crm/entity/update';

export const Contacts = getAll('Contacts')
export const ContactsCreate = create('Contacts')
export const ContactsBatchCreate = batchCreate('Contacts')
export const ContactsUpdate = update('Contacts')
export const ContactsBatchUpdate = batchUpdate('Contacts')
export const ContactsArchive = archive('Contacts')
export const ContactsBatchArchive = batchArchive('Contacts')