'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateAverageAge(array) {
  return array
    .reduce((acc, value) => acc + (value.died - value.born), 0)
    / array.length;
}

function calculateMenAverageAge(people, century) {
  const menArray = people.filter(el => el.sex === 'm');

  if (century !== undefined) {
    const menDiedInCentury = menArray
      .filter(el => Math.ceil(el.died / 100) === century);

    const averageDiedMenAge = Number(
      calculateAverageAge(menDiedInCentury)
        .toFixed(2)
    );

    return averageDiedMenAge;
  }

  const averageMenAge = Number(
    calculateAverageAge(menArray)
      .toFixed(2)
  );

  return averageMenAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  if (withChildren) {
    const mothers = people
      .filter(mother => people
        .some(children => mother.name === children.mother));

    const averageMothersAge = Number(
      calculateAverageAge(mothers)
        .toFixed(2)
    );

    return averageMothersAge;
  } else {
    const womenArray = people
      .filter(el => el.sex === 'f');

    const averageWomenAge = Number(
      calculateAverageAge(womenArray)
        .toFixed(2)
    );

    return averageWomenAge;
  }
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people
    .filter(mother => mother.sex === 'f' && people
      .some(child => mother.name === child.mother));

  let children = [];

  if (onlyWithSon) {
    children = people
      .filter(child => child.sex === 'm' && people
        .some(mother => child.mother === mother.name));
  } else {
    children = people
      .filter(child => people
        .some(mother => child.mother === mother.name));
  }

  const ages = children
    .map(child => (child.born - mothers
      .find(mother => mother.name === child.mother).born)
    );

  return ages
    .reduce((acc, value) => acc + value, 0) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
