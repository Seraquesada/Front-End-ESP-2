const array = require("./array");

describe("getTechnology", () => {
  it("Debe retornar tres tecnologias", () => {
    // Arrange
    const expected = ["JavaScript", "React", "Jest"];

    // Act
    const result = array.getTechnology();

    // Assert
    expect(result).toEqual(expect.arrayContaining(["Jest"]));
  });
});
