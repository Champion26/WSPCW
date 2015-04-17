
/**
 *
 * @description This function produces a random int according to user input. It returns a random int between the two user
 * set values. Used in the creation of order numbers
 * @param {Int} min
 * @param {Int} max
 * @returns {Number}
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
