'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Investidors", deps: []
 * createTable "Investimentos", deps: [Investidors]
 * createTable "Valors", deps: [Investimentos]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial",
    "created": "2020-10-23T03:26:59.285Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "Investidors",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "nome": {
                        "type": Sequelize.STRING,
                        "field": "nome"
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email"
                    },
                    "cpf": {
                        "type": Sequelize.STRING,
                        "field": "cpf"
                    },
                    "senha": {
                        "type": Sequelize.STRING,
                        "field": "senha"
                    },
                    "idade": {
                        "type": Sequelize.INTEGER,
                        "field": "idade"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Investimentos",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "nome": {
                        "type": Sequelize.STRING,
                        "field": "nome"
                    },
                    "benchmark": {
                        "type": Sequelize.STRING,
                        "field": "benchmark"
                    },
                    "tipo_investimento": {
                        "type": Sequelize.STRING,
                        "field": "tipo_investimento"
                    },
                    "quantidade_papeis": {
                        "type": Sequelize.INTEGER,
                        "field": "quantidade_papeis"
                    },
                    "valor_papel": {
                        "type": Sequelize.DOUBLE,
                        "field": "valor_papel"
                    },
                    "montante_investido": {
                        "type": Sequelize.DOUBLE,
                        "field": "montante_investido"
                    },
                    "indice": {
                        "type": Sequelize.STRING,
                        "field": "indice"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "investidorId": {
                        "type": Sequelize.INTEGER,
                        "field": "investidorId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Investidors",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Valors",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "valor": {
                        "type": Sequelize.DOUBLE,
                        "field": "valor"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "investimentoId": {
                        "type": Sequelize.INTEGER,
                        "field": "investimentoId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Investimentos",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["Investidors", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Investimentos", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Valors", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
