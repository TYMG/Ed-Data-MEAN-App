import express from 'express';
import validate from 'express-validation';
//import paramValidation from '../config/param-validation';
import stateCtrl from '../controllers/state.controller';

const router = express.Router();

router.route('/')
  /** GET /api/states - Get list of states */
  .get(stateCtrl.list)

  /** POST /api/states - Create new post */
  .post(stateCtrl.create);

router.route('/:stateCode')
  /** GET /api/states/:stateCode - Get post */
  .get(stateCtrl.get)

  /** PUT /api/states/:stateId - Update post */
  .put(stateCtrl.update)

  /** DELETE /api/states/:stateId - Delete post */
  .delete(stateCtrl.remove);

/** Load post when API with stateId route parameter is hit */
router.param('stateId', stateCtrl.load);

export default router;
