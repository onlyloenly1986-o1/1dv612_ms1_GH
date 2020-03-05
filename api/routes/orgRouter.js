const express = require('express')
const router = express.Router()

const orgController = require('../controllers/orgController')

router.get('/', orgController.getOrgs)

// router.post('/', orgController.registerUser)

module.exports = router