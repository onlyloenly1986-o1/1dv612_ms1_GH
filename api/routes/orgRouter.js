const express = require('express')
const router = express.Router()

const orgController = require('../controllers/orgController')

router.get('/', orgController.getOrgs)

router.get('/repos', orgController.getRepos)

// router.post('/', orgController.registerUser)

module.exports = router