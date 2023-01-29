const express = require('express');
const {
  register,
  login,
  getCurrentUser,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require('../../controllers/users.controller');

const router = express.Router();

const auth = require('../../middlwares/auth');
const { tryCatchWrapper, validateBody } = require('../../helpers/index');
const {
  joiRegisterSchema,
  joiLoginSchema,
  verifyEmailSchema,
} = require('../../models/user');
const { upload } = require('../../middlwares/avatarUpload');

router.post(
  '/signup',
  validateBody(joiRegisterSchema),
  tryCatchWrapper(register),
);

router.post('/login', validateBody(joiLoginSchema), tryCatchWrapper(login));

router.post(
  '/verify',
  validateBody(verifyEmailSchema),
  tryCatchWrapper(resendVerifyEmail),
);

router.get('/current', auth, tryCatchWrapper(getCurrentUser));

router.get('/logout', auth, tryCatchWrapper(logout));

router.get('/verify/:verificationToken', tryCatchWrapper(verifyEmail));

router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  tryCatchWrapper(updateAvatar),
);

module.exports = router;
