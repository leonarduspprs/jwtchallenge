module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
    nama: {
    type: Sequelize.STRING
    },
    username: {
    type: Sequelize.STRING
    },
    email: {
    type: Sequelize.STRING
    },
    password: {
    type: Sequelize.STRING
    }
    ,
    admin: {
    type: Sequelize.STRING
    }
    ,
    status: {
    type: Sequelize.STRING
    }
    });
    return User;
    }   