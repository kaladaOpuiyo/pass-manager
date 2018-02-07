'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID;
const secure = require('../lib/security/security');
const utils = require('../lib/utils/utils');

// Environment Variables
const URL = process.env['DB_URL']

const connection = () =>
  new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, db) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    })
  });

module.exports.saveCredentials = (data, callback) => {

  let database = {};


  connection()
    .then((db) => {
      database = db;
      return db.collection('credentials');
    })
    .then((collection) => {

      let credentials = {
        credentials: []
      }

      collection['findOne']({ username: data.username }).then((res) => {

        if (!res) {
          collection['insert'](Object.assign(credentials, {
            '_id': new ObjectId(),
            'username': data.username, createOn: new Date()
          })).then((response) => {

            database.close();
            callback(null, response);

          });
        }
        database.close();
        callback(null, res);
      })

    })
    .catch((err) => {
      callback(null, err);
    })
};

module.exports.retrieveAllCredentials = (username, callback) => {

  let database = {}

  connection()

    .then((db) => {

      database = db;

      return db.collection('credentials');

    })
    .then((collection) => {

      collection['findOne']({ username: username }).then((response) => {

        database.close();

        response.credentials.forEach((credential) => {
          credential.password = secure.decrypt(credential.password)
        });

        callback(null, response);

      }).catch((err) => {

        database.close();

        callback(null, error);
      })

    })
}

module.exports.updateCredentials = (credentials, callback) => {

  if (credentials.credentials[0].name !== '' || null) {

    let database = {};

    if (credentials._id != null) {

      connection()

        .then((db) => {

          database = db;

          return db.collection('credentials');
        })
        .then((collection) => {

          let updateCredentials = {
            $set: {
              "credentials.$.password": credentials.credentials[0].password != '' ?
                secure.encrypt(credentials.credentials[0].password) : null,
              "credentials.$.username": credentials.credentials[0].username, "credentials.$.updatedOn": new Date(),
            }
          }

          updateCredentials.$set = utils.removeEmptyFields(updateCredentials.$set);

          collection['update']({ '_id': ObjectId(credentials._id), "credentials.name": credentials.credentials[0].name }, updateCredentials)
            .then((response) => {

              if (response.result.nModified == 0) {

                let addCredentials = {
                  credentials: {
                    "name": credentials.credentials[0].name, "password": secure.encrypt(credentials.credentials[0].password),
                    "username": credentials.credentials[0].username, "createOn": new Date()
                  }
                }

                collection['findOneAndUpdate']({ _id: ObjectId(credentials._id) }, { $push: { credentials: addCredentials.credentials } })
                  .then((response) => {
                    database.close();
                    callback(null, response);

                  })
                  .catch((err) => {
                    database.close();
                    callback(null, err);
                  })
              }

              if (response.result.nModified == 1) {
                database.close();
                callback(null, response);
              }



            })
        })
        .catch((err) => {
          database.close();
          callback(null, err);
        })
    }
  } else {
    callback(null, { response: "Name field requires value" });
  }

}

module.exports.deleteCredential = (credentials, callback) => {

  let database = {};

  if (credentials._id != null) {

    connection()

      .then((db) => {

        database = db;

        return db.collection('credentials');
      })
      .then((collection) => {

        collection['update']({ '_id': ObjectId(credentials._id) }, {
          $pull: {
            credentials: {
              "name": credentials.name
            }
          }
        }, false, false)
          .then((response) => {

            database.close();

            callback(null, response);
          })
          .catch((err) => {

            callback(null, err);
          })
      })
  }

}
