import { describe, expect, it } from 'vitest';

import { calculateDeskLayout } from './calculateDeskLayout';
import { DogStatus } from './generated/graphql';

let idCounter = 0;

type Person = ReturnType<typeof calculateDeskLayout>[0];

const person = (team: string, DogStatus: DogStatus): Person => {
  const id = String(idCounter++);
  return {
    id,
    name: id,
    dogStatus: DogStatus,
    team: {
      id: team,
      name: team,
    },
    __typename: 'Person',
  };
};

/**
 * If teams don't sit together throws an error
 * If person with a dog is sitting next to a person who dislikes dogs throws an error
 *
 * will return a score for how far apart people with dogs are and how far away people who dislike dogs are from people with dogs
 * person who dislikes dogs is 10*distance to nearest dog
 * person who has a dog is distance to nearest person with a dog
 *
 * @param people
 * @returns score calculated from logic above
 */
const checkOrder = (people: Person[]): number => {
  const seenTeams = new Set<string>();
  let previous: Person | undefined;

  for (const person of people) {
    const team = person.team?.id ?? 'none';
    if (previous !== undefined && previous.team?.id !== person.team?.id) {
      if (seenTeams.has(team)) {
        throw new Error(`team ${team} not sitting together`);
      }
    }
    seenTeams.add(team);
    previous = person;
  }

  return people
    .map((person, index) => {
      // distance to nearest person with dog
      let dogIndexForward = people.findIndex((p, i) => i > index && p.dogStatus === DogStatus.Have);
      let dogIndexReverse = people.findLastIndex(
        (p, i) => i < index && p.dogStatus === DogStatus.Have,
      );
      if (dogIndexForward === -1 && dogIndexReverse === -1) {
        return 0;
      }

      if (dogIndexForward === -1) {
        dogIndexForward = Number.MAX_VALUE;
      }
      if (dogIndexReverse === -1) {
        dogIndexReverse = -Number.MAX_VALUE;
      }

      const distance = Math.min(dogIndexForward - index, index - dogIndexReverse) - 1;

      if (person.dogStatus === DogStatus.Avoid) {
        if (distance === 0) {
          throw new Error('person with dog too close');
        }
        return distance * 10;
      }
      if (person.dogStatus === DogStatus.Have) {
        return distance;
      }
      return 0;
    })
    .reduce((a, b) => a + b, 0);
};

describe('test checkOrder function', () => {
  it('check adjacent teams does not throw error', () => {
    const people = [
      person('1', DogStatus.Like),
      person('1', DogStatus.Like),
      person('2', DogStatus.Avoid),
    ];
    expect(() => checkOrder(people)).not.toThrowError();
  });
  it('check team mixed throws error', () => {
    const people = [
      person('1', DogStatus.Like),
      person('2', DogStatus.Avoid),
      person('1', DogStatus.Like),
    ];
    expect(() => checkOrder(people)).toThrowError();
  });

  it('check person with dog sitting next to person without dog errors', () => {
    const people = [person('1', DogStatus.Avoid), person('1', DogStatus.Have)];
    expect(() => checkOrder(people)).toThrowError();
  });

  it('score no dogs returns zero', () => {
    const people = [
      person('1', DogStatus.Like),
      person('1', DogStatus.Avoid),
      person('1', DogStatus.Like),
    ];
    expect(checkOrder(people)).toEqual(0);
  });

  it('score dog 1 person away from avoid', () => {
    const people = [
      person('1', DogStatus.Avoid),
      person('1', DogStatus.Like),
      person('1', DogStatus.Have),
    ];
    expect(checkOrder(people)).toEqual(10);
  });
  it('score people with dogs one person away', () => {
    const people = [
      person('1', DogStatus.Have),
      person('1', DogStatus.Like),
      person('1', DogStatus.Have),
    ];
    expect(checkOrder(people)).toEqual(2);
  });
});

describe.skip('calculateDeskLayout', () => {
  it('single team no dogs order not important', () => {
    const people = [
      person('1', DogStatus.Like),
      person('1', DogStatus.Avoid),
      person('1', DogStatus.Like),
    ];
    expect(process(people)).toBe(0);
  });

  it('two team, they are together', () => {
    const people = [
      person('1', DogStatus.Like),
      person('1', DogStatus.Like),
      person('2', DogStatus.Avoid),
      person('2', DogStatus.Avoid),
      person('2', DogStatus.Like),
    ];
    expect(process(people)).toBe(0);
  });

  it('one team. One person with a dog and person who dislikes at either end', () => {
    const people = [
      person('1', DogStatus.Have),
      person('1', DogStatus.Like),
      person('1', DogStatus.Like),
      person('1', DogStatus.Avoid),
    ];
    expect(process(people)).toBe(20);
  });

  it('two team. One person with a dog and person who dislikes at either end', () => {
    const people = [
      person('1', DogStatus.Have),
      person('1', DogStatus.Like),
      person('2', DogStatus.Like),
      person('2', DogStatus.Avoid),
    ];
    expect(process(people)).toBe(20);
  });

  it('one team. People that dislike together people with dogs spaced', () => {
    const people = [
      person('1', DogStatus.Avoid),
      person('1', DogStatus.Avoid),
      person('1', DogStatus.Like),
      person('1', DogStatus.Have),
      person('1', DogStatus.Like),
      person('1', DogStatus.Have),
    ];
    expect(process(people)).toBeGreaterThanOrEqual(32);
  });
});

const process = (people: Person[]) => {
  return checkOrder(calculateDeskLayout(shuffle(people)));
};

const shuffle = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
