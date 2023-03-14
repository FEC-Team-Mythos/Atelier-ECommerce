import {render, screen} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';


describe('Random test examples', () => {

  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });

  it('Should fail test', () => {
    var array = [1,2,3,4];
    expect(array.pop()).toEqual(3)
  })

  //test and it works interchangeably
})