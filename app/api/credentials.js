'use strict';

const db = require('../../db/mongodb');
const utils = require('../utils/utils');

const _utils = require('../lib/utils/utils');

module.exports.handler = (event, context, callback) => {

  let userID = null;
  let data = null;
 
  
  if(event.requestContext.authorizer)
    userID = event.requestContext.authorizer.claims.sub;
    
    try {
      switch (`${event.httpMethod} ${event.resource}`) {
    
        case 'POST /credentials':
          data = JSON.parse(event.body);
          db.saveCredentials(data, (err, res) => {
            if (err) return utils.errorHandler(err, callback);
            utils.successHandler(res, callback);
          })
          break;
  
        case 'GET /credentials':
          const username = event.queryStringParameters.username
          db.retrieveAllCredentials(data, (err, res) => {
            if (err) return utils.errorHandler(err, callback);
            utils.successHandler(res, callback);
          })          
          break;
  
        case 'PUT /credentials':
          data = JSON.parse(event.body);
          db.updateCredentials(data, (err, res) => {
            if (err) return utils.errorHandler(err, callback);
            utils.successHandler(res, callback);
          })
          
          break;
  
        case 'DELETE /credentials':
          data = JSON.parse(event.body);
          db.deleteCredential(data, (err, res) => {
            if (err) return utils.errorHandler(err, callback);
            utils.successHandler(res, callback);
          })
          break;
  
        case 'OPTIONS /credentials':
          _utils.optionsHandler(callback);
          break;
  
        default:
          _utils.notFoundHandler(callback);
      }
    } catch (err) {
      _utils.errorHandler(err, callback);
    }
};
