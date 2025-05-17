export default class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  at(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    return this.buckets[index];
  }

  hash(key) {
    if (typeof key !== "string") {
      key = String(key);
    }

    const primeNumber = 31;
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    oldBuckets.forEach((bucket) => {
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          const [key, value] = bucket[i];
          this.set(key, value);
        }
      }
    });
  }

  set(key, value) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size += 1;

    if (this.size > this.capacity * this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          return bucket[i][1];
        }
      }
    }

    return null;
  }

  has(key) {
    const searchedKey = this.get(key);
    // Returns true if searchedKey is not null, otherwise false
    return !!searchedKey;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1);
          this.size -= 1;
          return true;
        }
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  keys() {
    const keys = [];

    this.buckets.forEach((bucket) => {
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          keys.push(bucket[i][0]);
        }
      }
    });

    return keys;
  }

  values() {
    const values = [];

    this.buckets.forEach((bucket) => {
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          values.push(bucket[i][1]);
        }
      }
    });

    return values;
  }

  entries() {
    const entries = [];

    this.buckets.forEach((bucket) => {
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          entries.push(bucket[i]);
        }
      }
    });

    return entries;
  }
}
