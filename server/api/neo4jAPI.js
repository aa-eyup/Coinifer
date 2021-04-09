// base path: /api/neo4jAPI
const router = require('express').Router();
module.exports = router;

const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('xxx', 'xxx'));
const session = driver.session();
