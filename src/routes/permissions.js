var express = require('express');
var router = express.Router();

const permissionsController = require('../controller/permissionsController');



router.get('/permissions',permissionsController.allPermissions);
/* router.post('/permission',permissionsController.createPermission);
router.put('/permission/:id',permissionsController.editPermission);
router.delete('/permission/:id',permissionsController.deletePermission); */

module.exports= router;