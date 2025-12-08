const bcrypt = require('bcrypt');
const { v4: uuidv4, validate: isUUID } = require('uuid');

const CustomError = require('../../util/customError');
const displayIdGenerator = require('../../util/displayIdGenerator');
const userRepo = require('../../repos/v1/user.repo');
const authRepo = require('../../repos/v1/auth.repo');
const jwtService = require('../jwt.service');

const userStatus = require('../../enum/user/status.enum');
const { PAYLOAD } = require('../../common/responses');
const { STATUS_CODE } = require('../../constants/app.constants');

const userService = {
  getUserDetails: async (data) => {
    const { id } = data;

    // fetch user details
    const user = await userRepo.getById(id);
    if (!user) {
      throw new CustomError(PAYLOAD.USER.NOT_FOUND, STATUS_CODE.BAD_REQUEST);
    }

    // user response
    const userRes = {
      displayId: user.displayId,
      title: user.title,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: user.status,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
    };

    return {
      success: true,
      status: STATUS_CODE.CREATED,
      data: {
        user: userRes,
      },
    };
  },

  newUserRegister: async (data) => {
    const { title, firstName, lastName, email, password } = data;

    // fetch user details
    const user = await userRepo.getByEmail(email);
    if (user) {
      throw new CustomError(PAYLOAD.USER.EXISTS, STATUS_CODE.BAD_REQUEST);
    }

    // generate display id
    const displayId = await displayIdGenerator.USER_ID();

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const userDetails = {
      id: uuidv4(),
      displayId: displayId,
      title: title,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      status: userStatus.ACTIVE,
    };
    const newUser = await userRepo.create(userDetails);

    // user response
    const userRes = {
      displayId: newUser.displayId,
      title: newUser.title,
      lastName: newUser.lastName,
    };

    return {
      success: true,
      status: STATUS_CODE.CREATED,
      data: {
        user: userRes,
      },
    };
  },

  userLogin: async (data) => {
    const { email, password } = data;

    // fetch user details
    const user = await userRepo.getByEmail(email);
    if (!user) {
      throw new CustomError(PAYLOAD.USER.INVALID_CRED, STATUS_CODE.UNAUTHORIZED);
    }

    // validate password and remove it
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new CustomError(PAYLOAD.USER.INVALID_CRED, STATUS_CODE.UNAUTHORIZED);
    }
    delete user.dataValues.password;

    // check if user is active
    if (user.status !== userStatus.ACTIVE) {
      throw new CustomError(PAYLOAD.USER.INACTIVE, STATUS_CODE.FORBIDDEN);
    }

    // generate access token and refresh token
    const tokenUser = {
      id: user.id,
      title: user.title,
      lastName: user.lastName,
      email: user.email,
    };
    const accessToken = await jwtService.generateAccessToken(tokenUser);
    const refreshToken = await jwtService.generateRefreshToken(tokenUser);

    // update last login time and status
    user.lastLogin = new Date();
    await userRepo.update(user);

    // user response
    const userRes = {
      displayId: user.displayId,
      title: user.title,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      success: true,
      status: STATUS_CODE.OK,
      data: {
        user: userRes,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  },

  deactivateUser: async (data) => {
    const { token, id } = data;

    // fetch user details
    const user = await userRepo.getById(id);
    if (!user) {
      throw new CustomError(PAYLOAD.USER.NOT_FOUND, STATUS_CODE.BAD_REQUEST);
    }

    // change user status
    user.status = userStatus.DELETED;
    await userRepo.update(user);

    // blacklist token
    const tokenDetails = {
      token: token,
      userId: user.id,
    };
    await authRepo.create(tokenDetails);

    return {
      success: true,
      status: STATUS_CODE.OK,
      data: {
        message: PAYLOAD.USER.DELETED,
      },
    };
  },
};

module.exports = userService;
