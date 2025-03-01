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
  //TODO: implement the desk layout algorithm
  return people;
};
