import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import subjectCtrl from '../controllers/subject.controller';

const router = express.Router();

router.route('/')
  /** GET /api/subjects - Get list of subjects */
  .get(subjectCtrl.list)

  /** POST /api/subjects - Create new post */
  .post(validate(paramValidation.createPost), subjectCtrl.create);

router.route('/:subjectId')
  /** GET /api/post/:subjectId - Get post */
  .get(subjectCtrl.get)

  /** PUT /api/subjects/:subjectId - Update post */
  .put(validate(paramValidation.updatePost), subjectCtrl.update)

  /** DELETE /api/subjects/:subjectId - Delete post */
  .delete(subjectCtrl.remove);

/** Load post when API with subjectId route parameter is hit */
router.param('subjectId', subjectCtrl.load);

export default router;
