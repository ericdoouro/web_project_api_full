const router = require('express').Router();
const { validateUserId, validateProfile } = require('../middlewares/validation');

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', validateProfile, updateProfile);
router.patch('/me/avatar', updateAvatar);
router.get('/:userId', validateUserId, getUserById);

module.exports = router;
