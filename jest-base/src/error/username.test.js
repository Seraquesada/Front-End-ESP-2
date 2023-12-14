const username = require("./username");

describe("createUser", () => {
  it("Debe retornar un objeto cuando el nombre de usuario es válido", () => {
    // Arrange
    const name = "Fer";
    const expected = { username: name };

    // Act
    const result = username.createUser(name);

    // Assert
    expect(result).toEqual(expected);
  });

  it("Debe retornar un error cuando el nombre de usuario es inválido", () => {
    // Arrange
    const error = new Error("El nombre de usuario es obligatorio.");

    // Act
    expect(() => {
      username.createUser(null);
    }).toThrow(error);
  });
});
