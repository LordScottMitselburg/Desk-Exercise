import type { DogStatus, PeopleQuery } from './generated/graphql';

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
  const peopleSortedByTeam = sortPeopleIntoTeams(people);

  return sortPeopleByDogStatusWithinTeam(peopleSortedByTeam);
};

const sortPeopleIntoTeams = (people: Person[]): Person[] => {
  // Sort people by team so teams are together.
  people.sort((a, b) => {
    // check for null | undefined teams and give them the value of '', allows for comparing to be easier.
    const teamA = a.team?.id ?? '';
    const teamB = b.team?.id ?? '';

    // if team id's are the same, leave them in current postion.
    if (teamA === teamB) {
      return 0;
    }

    // if team id's are different, sort alphabetically by team id.
    return teamA.localeCompare(teamB);
  });

  return people;
};

const sortPeopleByDogStatusWithinTeam = (people: Person[]): Person[] => {
  const teamsMap: Record<string, Person[]> = {};

  // push each team into a separate key to allow sorting the DogStatus within a team alot easier.
  for (const person of people) {
    if (person.team) {
      if (!teamsMap[person.team.id]) {
        teamsMap[person.team.id] = [];
      }
      teamsMap[person.team.id].push(person);
    }
  }

  // array that will get passed back with the sorted teams, sorted by DogStatus.
  const sortedTeams: Person[] = [];

  // use the key given to each unique team to sort the DogStatus within that team.
  for (const teamId in teamsMap) {
    const teamMembers = teamsMap[teamId];

    const sortedTeam = teamMembers.sort((a, b) => {
      // give each DogStatus a number value to allow for sorting. with the sort order as follows. HAVE < LIKE < AVOID
      const order: Record<DogStatus, number> = {
        HAVE: 0,
        LIKE: 1,
        AVOID: 2,
      };

      return order[a.dogStatus] - order[b.dogStatus];
    });

    // push the sorted team into the array that will be returned.
    sortedTeams.push(...sortedTeam);
  }

  return sortedTeams;
};
