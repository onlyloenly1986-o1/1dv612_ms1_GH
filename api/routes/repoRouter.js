const express = require('express')
const router = express.Router()

const repoController = require('../controllers/repoController')

router.get('/', repoController.getRepos)

router.get('/:repo', repoController.getOneRepo)

module.exports = router