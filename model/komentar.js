module.exports = (sequelize, Sequelize) => {
  const Komentar = sequelize.define("komentars", {
    isikomentar: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  });
  return Komentar;
};
