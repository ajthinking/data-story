"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProduct = exports.UpdateLineItem = exports.UpdateTicket = exports.UpdateDeal = exports.UpdateCompany = exports.UpdateContact = exports.Products = exports.LineItems = exports.Tickets = exports.Deals = exports.Companies = exports.Contacts = void 0;
const deriveFrom_1 = require("../../deriveFrom");
const GetAllEntities_1 = require("./GetAllEntities");
const UpdateEntity_1 = require("./UpdateEntity");
/**
 * GET ALL ************************************************************
 */
exports.Contacts = (0, deriveFrom_1.deriveFrom)(GetAllEntities_1.GetAllEntities, {
    name: 'Contacts',
    label: 'Contacts.all',
    params: {
        entity: 'contacts',
        properties: '["firstname"]'
    },
});
exports.Companies = (0, deriveFrom_1.deriveFrom)(GetAllEntities_1.GetAllEntities, {
    name: 'Companies',
    params: {
        entity: 'companies',
        properties: '["name"]'
    },
});
exports.Deals = (0, deriveFrom_1.deriveFrom)(GetAllEntities_1.GetAllEntities, {
    name: 'Deals',
    params: {
        entity: 'deals',
        properties: '["dealname"]'
    },
});
exports.Tickets = (0, deriveFrom_1.deriveFrom)(GetAllEntities_1.GetAllEntities, {
    name: 'Tickets',
    params: {
        entity: 'tickets',
        properties: '[]'
    },
});
exports.LineItems = (0, deriveFrom_1.deriveFrom)(GetAllEntities_1.GetAllEntities, {
    name: 'LineItems',
    params: {
        entity: 'lineItems',
        properties: '[]'
    },
});
exports.Products = (0, deriveFrom_1.deriveFrom)(GetAllEntities_1.GetAllEntities, {
    name: 'Products',
    params: {
        entity: 'products',
        properties: '[]'
    },
});
/**
 * UPDATE ************************************************************
 */
exports.UpdateContact = (0, deriveFrom_1.deriveFrom)(UpdateEntity_1.UpdateEntity, {
    name: 'UpdateContact',
    label: 'Contacts.update',
    params: {
        entity: 'contacts',
    },
});
exports.UpdateCompany = (0, deriveFrom_1.deriveFrom)(UpdateEntity_1.UpdateEntity, {
    name: 'UpdateCompany',
    params: {
        entity: 'companies',
    },
});
exports.UpdateDeal = (0, deriveFrom_1.deriveFrom)(UpdateEntity_1.UpdateEntity, {
    name: 'UpdateDeal',
    params: {
        entity: 'deals',
    },
});
exports.UpdateTicket = (0, deriveFrom_1.deriveFrom)(UpdateEntity_1.UpdateEntity, {
    name: 'UpdateTicket',
    params: {
        entity: 'tickets',
    },
});
exports.UpdateLineItem = (0, deriveFrom_1.deriveFrom)(UpdateEntity_1.UpdateEntity, {
    name: 'UpdateLineItem',
    params: {
        entity: 'lineItems',
    },
});
exports.UpdateProduct = (0, deriveFrom_1.deriveFrom)(UpdateEntity_1.UpdateEntity, {
    name: 'UpdateProduct',
    params: {
        entity: 'products',
    },
});
