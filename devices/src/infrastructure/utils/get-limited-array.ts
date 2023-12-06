export function getArrayWithLimitedLength<T>(length: number, firstElement?: T) {
  const array = [firstElement];

  array.push = function () {
    if (this.length >= length) {
      this.shift();
    }

    return Array.prototype.push.apply(this);
  };

  return array;
}
