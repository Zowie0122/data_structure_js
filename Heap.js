class Heap {
  constructor() {
    this.storage = [];
  }
  insert(value) {
    if (this.storage.length === 1 && this.storage[0] < value) {
      this.storage.unshift(value);
    } else {
      this.storage.push(value);
      let currentIndexOfValue = this.storage.length - 1;
      if (currentIndexOfValue >= 2) {
        while (value > this.storage[Math.round(currentIndexOfValue / 2) - 1]) {
          this.storage[currentIndexOfValue] = this.storage[
            Math.round(currentIndexOfValue / 2) - 1
          ];
          this.storage[Math.round(currentIndexOfValue / 2) - 1] = value;
          currentIndexOfValue = this.storage.indexOf(value);
        }
      }
    }
  }
  removeMax() {
    const result = this.storage.shift();
    const lastValue = this.storage.pop();
    this.storage.unshift(lastValue);
    this.storage.unshift(null);
    let currentIndex = this.storage.indexOf(lastValue);
    while (
      currentIndex < this.storage.length - 2 &&
      (lastValue < this.storage[currentIndex * 2] ||
        lastValue < this.storage[currentIndex * 2 + 1])
    ) {
      if (this.storage[currentIndex * 2] < this.storage[currentIndex * 2 + 1]) {
        this.storage[currentIndex] = this.storage[currentIndex * 2 + 1];
        this.storage[currentIndex * 2 + 1] = lastValue;
      } else {
        this.storage[currentIndex] = this.storage[currentIndex * 2];
        this.storage[currentIndex * 2] = lastValue;
      }
      console.log(this.storage);
      currentIndex = this.storage.indexOf(lastValue);
    }
    this.storage.shift();
    return result;
  }
}
