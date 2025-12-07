const bcrypt = require('bcrypt');
const { v4: uuidv4, validate: isUUID } = require('uuid');

const CustomError = require('../../util/customError');
const displayIdGenerator = require('../../util/displayIdGenerator');
const userRepo = require('../../repos/v1/user.repo');

const userStatus = require('../../enum/user/status.enum');
const { PAYLOAD } = require('../../common/responses');
const { STATUS_CODE } = require('../../constants/app.constants');

const userService = {
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
};

module.exports = userService;
