import express from 'express';
import authRoutes from './auth.route';
import stateRoutes from './state.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount subject routes at /subjects
router.use('/states', stateRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
