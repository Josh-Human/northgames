const { selectUsers, selectUserById } = require("../models/users.models");
const {
    rejectForNoContent,
    throwBadRequest,
} = require("../models/utils.model");

exports.getUsers = (req, res, next) => {
    selectUsers()
        .then((users) => {
            res.status(200).send({ users });
        })
        .catch(next);
};

exports.getUserById = (req, res, next) => {
    const { username } = req.params;
    if (parseInt(username)) {
        return throwBadRequest("Invalid parameter.").catch(next);
    }
    selectUserById(username)
        .then((user) => {
            if (user.length < 1) return rejectForNoContent();
            res.status(200).send({ user: user[0] });
        })
        .catch(next);
};
