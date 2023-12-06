/* eslint-disable prefer-rest-params */
export function getArrayWithLimitedLength<T>(payload: {
  length: number;
  firstElement?: T;
  fillArrayWith?: { value: unknown; range: number };
}) {
  const { length, firstElement, fillArrayWith } = payload;

  let array = [];

  if (firstElement && !fillArrayWith) {
    array = firstElement ? [firstElement] : [];
  }

  if (firstElement && fillArrayWith) {
    array = [];

    for (let i = 0; i < fillArrayWith.range; i++) {
      array.push(fillArrayWith.value);
    }

    array[fillArrayWith.range] = firstElement;
  }

  array.push = function () {
    if (this.length >= length) {
      this.shift();
    }

    return Array.prototype.push.apply(this, arguments);
  };

  return array;
}
