/* eslint-disable prefer-rest-params */
export function getArrayWithLimitedLength<T>(length: number, firstElement?: T) {
  const array = firstElement ? [firstElement] : [];

  array.push = function () {
    if (this.length >= length) {
      this.shift();
    }

    return Array.prototype.push.apply(this, arguments);
  };

  return array;
}
