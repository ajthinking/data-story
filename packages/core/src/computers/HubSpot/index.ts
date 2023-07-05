import { deriveFrom } from '../../deriveFrom';
import { GetAllEntities } from './GetAllEntities'
import { UpdateEntity } from './UpdateEntity'

/**
 * GET ALL ************************************************************
 */
export const Contacts = deriveFrom(GetAllEntities, {
  name: 'Contacts',
  label: 'Contacts.all',
  params: {
    entity: 'contacts',
    properties: '["firstname"]'
  },
})

export const Companies = deriveFrom(GetAllEntities, {
  name: 'Companies',
  params: {
    entity: 'companies',
    properties: '["name"]'
  },
})

export const Deals = deriveFrom(GetAllEntities, {
  name: 'Deals',
  params: {
    entity: 'deals',
    properties: '["dealname"]'
  },
})

export const Tickets = deriveFrom(GetAllEntities, {
  name: 'Tickets',
  params: {
    entity: 'tickets',
    properties: '[]'
  },
})

export const LineItems = deriveFrom(GetAllEntities, {
  name: 'LineItems',
  params: {
    entity: 'lineItems',
    properties: '[]'
  },
})

export const Products = deriveFrom(GetAllEntities, {
  name: 'Products',
  params: {
    entity: 'products',
    properties: '[]'
  },
})

/**
 * UPDATE ************************************************************
 */
export const UpdateContact = deriveFrom(UpdateEntity, {
  name: 'UpdateContact',
  label: 'Contacts.update',
  params: {
    entity: 'contacts',
  },
})

export const UpdateCompany = deriveFrom(UpdateEntity, {
  name: 'UpdateCompany',
  params: {
    entity: 'companies',
  },
})

export const UpdateDeal = deriveFrom(UpdateEntity, {
  name: 'UpdateDeal',
  params: {
    entity: 'deals',
  },
})

export const UpdateTicket = deriveFrom(UpdateEntity, {
  name: 'UpdateTicket',
  params: {
    entity: 'tickets',
  },
})

export const UpdateLineItem = deriveFrom(UpdateEntity, {
  name: 'UpdateLineItem',
  params: {
    entity: 'lineItems',
  },
})

export const UpdateProduct = deriveFrom(UpdateEntity, {
  name: 'UpdateProduct',
  params: {
    entity: 'products',
  },
})