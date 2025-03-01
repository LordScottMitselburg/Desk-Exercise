import type { PeopleQuery } from './generated/graphql';

type Person = PeopleQuery['people'][0];

/**
 * requirements teams must sit together.
 * People who don't like dogs should be placed as far away from those who have dogs as possible.
 * People who have dogs should be placed as far apart as possible.
 * Desks are arranged in a single line of adjacent desks.
 *
 * There is a test suite provided that is disabled in calculateDeskLayout.spec.ts
 * This test suite may not exhaustive for all edge cases.
 */
export const calculateDeskLayout = (people: Person[]): Person[] => {

  // Sort people by team so teams are together.
  people.sort((a, b) => {
    // check for null | undefined teams and give them the value of '', allows for comparing to be easier.
    const teamA = a.team?.id ?? "";
    const teamB = b.team?.id ?? "";

    // if team id's are the same, leave them in current postion.
    if (teamA === teamB) {
        return 0;
    }

    // if team id's are different, sort alphabetically by team id.
    return teamA.localeCompare(teamB);
});




  return people;
};
