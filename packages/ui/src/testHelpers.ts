/* eslint-disable no-console */
export const withExpectedError =
  <Args extends unknown[], Result>(fc: (...args: Args) => Result) =>
  (...args: Args): Result => {
    const err = console.error;

    console.error = jest.fn();

    const result = fc(...args);

    console.error = err;

    return result;
  };
/* eslint-enable no-console */
