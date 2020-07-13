function simpleHash(str, tableSize) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash += str.charCodeAt(i) * (i + 1);
  }
  return hash % tableSize;
}

function ControlledArray(limit) {
  const storage = [];
  const controlledArray = {};

  const checkLimit = (index) => {
    if (typeof index !== "number") {
      throw new Error(
        "Setter requires a numeric index for its first argument."
      );
    }

    if (limit <= index) {
      throw new Error("Error trying to access an over-the-limit index");
    }
  };

  controlledArray.get = (index) => {
    checkLimit(index);
    return storage[index];
  };

  controlledArray.set = (index, value) => {
    checkLimit(index);
    storage[index] = value;
  };

  controlledArray.each = (callback) => {
    for (let i = 0; i < storage.length; i += 1) {
      callback(storage[i], i, storage);
    }
  };

  return controlledArray;
}

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = ControlledArray(this.limit);
  }

  insert(key, value) {
    const index = simpleHash(key, this.limit);
    if (this.storage[index] === undefined) {
      this.storage[index] = [value];
    } else {
      this.storage[index].push(value);
    }
    // double size if the total numbers of storage's elements exceeded the limit.
    if (Object.keys(this.storage).length >= this.limit) {
      this.limit *= 2;
    }
  }

  retrieve(key) {
    const idx = simpleHash(key, this.limit);
    if (
      Object.keys(this.storage).includes(idx).toString() &&
      this.storage[idx.toString()] !== undefined
    ) {
      if (this.storage[idx.toString()].length === 1) {
        return this.storage[idx.toString()][0];
      } else {
        return this.storage[idx.toString()];
      }
    }
    return null;
  }

  remove(key) {
    const idx = simpleHash(key, this.limit);
    let removed = false;
    if (Object.keys(this.storage).includes(idx.toString())) {
      delete this.storage[idx];
      removed = true;
    }
    // double size if the total numbers of storage's elements is below half of the limit.
    if (Object.keys(this.storage).length < this.limit / 2) {
      this.limit /= 2;
    }
    return removed;
  }
}
