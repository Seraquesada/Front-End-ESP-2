module.exports.createUser = function (username) {
  if (!username) throw new Error("El nombre de usuario es obligatorio.");

  return {
    username: username
  };
};
