import { expect, test } from 'vitest';
import { UniqueConcat } from '../src/helper'

test('concat', () => {

    expect(UniqueConcat([1, 2, 3], [2, 3, 4])).toEqual([1, 2, 3, 4]);

});