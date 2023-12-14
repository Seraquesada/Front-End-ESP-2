const mensaje = require("./string");

describe("String", () => {
  it("Debe retornar un saludo cuando ingresamos un nombre", () => {
    // Arrange
    const name = "Fer";
    const expected = "Hola Fer!";

    // Act
    const result = mensaje.string(name);

    // Assert
    expect(result).toBe(expected);
  });
});
