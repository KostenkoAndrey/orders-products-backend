import { ONE_DAY, COOKIE_OPTIONS } from '../constants/index.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';
import { registerUser, loginUser, logoutUser, loginOrSignupWithGoogle } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (request, reply) => {
  const { session, user } = await loginUser(request.body);

  reply.cookie('sessionToken', session.sessionToken, {
    ...COOKIE_OPTIONS,
    expires: new Date(Date.now() + ONE_DAY),
  });

  reply.cookie('sessionId', session._id.toString(), {
    ...COOKIE_OPTIONS,
    expires: new Date(Date.now() + ONE_DAY),
  });

  return reply.send({
    status: 200,
    message: 'Successfully logged in an user!',
    data: user,
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');

  res.status(204).send();
};

const setupSession = (reply, session) => {
  reply.cookie('sessionToken', session.sessionToken, {
    ...COOKIE_OPTIONS,
    expires: new Date(Date.now() + ONE_DAY),
  });

  reply.cookie('sessionId', session._id, {
    ...COOKIE_OPTIONS,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const { session, user } = await loginOrSignupWithGoogle(req.body.code);
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: user,
  });
};
