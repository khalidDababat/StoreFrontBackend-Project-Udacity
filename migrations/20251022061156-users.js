'use strict';

var dbm;
var seed;
var fs = require('fs');
var path = require('path');
var Promise;

exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    seed = seedLink;
    Promise = options.Promise;
};
exports.up = function (db) {
    var currentDir =
        typeof __dirname !== 'undefined'
            ? __dirname
            : path.dirname(process.argv[1] || '.');
    var filePath = path.join(currentDir, 'sqls', '20251022061156-users-up.sql');
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
            if (err) return reject(err);
            db.runSql(data, function (err) {
                if (err) return reject(err);
                resolve();
            });
        });
    });
};
exports.down = function (db) {
    var currentDir =
        typeof __dirname !== 'undefined'
            ? __dirname
            : path.dirname(process.argv[1] || '.');
    var filePath = path.join(
        currentDir,
        'sqls',
        '20251022061156-users-down.sql'
    );
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
            if (err) return reject(err);
            db.runSql(data, function (err) {
                if (err) return reject(err);
                resolve();
            });
        });
    });
};

exports._meta = {
    version: 1,
};
