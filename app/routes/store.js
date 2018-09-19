let express = require('express');

let controller = require('../controllers/store')
  , permissions = require('../permissions');

let router = express.Router();


/***
 * POST /api/v1/store
 * @returns: {STATUS} 200 | 400
 */
router.post('/', [
  permissions.allowAny,
  controller.post
]);

module.exports = router;