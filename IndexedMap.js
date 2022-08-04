class IndexedMap {
  constructor(entries = []) {
    this.keys = entries.reduce((acc, [key]) => [...acc, key], []);
    this.collection = entries.reduce(
      (acc, [key, value], index) => ({
        ...acc,
        [index]: {
          [key]: value,
        },
      }),
      {}
    );
  }

  set(key, value) {
    this.keys.push(key);
    const index = this.keys.length - 1;
    this.collection = {
      ...this.collection,
      [index]: {
        [key]: value,
      },
    };
    return this;
  }

  setTo(index, key, value) {
    this.keys = [...this.keys.slice(0, index), key, ...this.keys.slice(index)];
    this.collection = Object.entries(this.collection)
      .reduce((acc, [ind, values], i) => {
        if (ind < index) return { ...acc, [ind]: values };
        if (ind == index) {
          return { ...acc, [ind]: { [key]: value }, [+ind + 1]: values };
        }
        const newIndex = i + 1;
        return { ...acc, [newIndex]: values };
      },
      {}
    );
    return this;
  }

  has(key) {
    return this.keys.includes(key);
  }

  hasIndex(index) {
    return index < this.keys.length;
  }

  get(key) {
    if (this.has(key)) {
      const index = this.keys.indexOf(key);
      return this.collection[index][key];
    }
    return undefined;
  }

  getByIndex(index) {
    if (this.hasIndex(index)) {
      const [[, value]] = Object.entries(this.collection[index]);
      return value;
    }
    return undefined;
  }

  remove(key) {
    if (this.has(key)) {
      const indexToRemove = this.keys.indexOf(key);
      this.keys = this.keys.filter((k, i) => k !== key && i !== indexToRemove);
      this.collection = Object.entries(this.collection)
        .reduce((acc, [ind, values]) => {
          const [[k, v]] = Object.entries(values);
          if (key === k) {
            return acc;
          }
          const newIndex = ind > indexToRemove ? ind - 1 : ind;
          return {
            ...acc,
            [newIndex]: {
              [k]: v,
            },
          };
        },
        {}
      );
    }
    return this;
  }

  removeAt(index, count = 1) {
    if (this.hasIndex(index)) {
      this.keys.splice(index, count);
      const entries = Object.entries(this.collection);
      entries.splice(index, count);
      this.collection = entries.reduce((acc, [ind, values]) => {
        const [[key, value]] = Object.entries(values);
        if (ind < index) {
          return { ...acc, [ind]: { [key]: value } };
        }
        const newIndex = ind - count;
        return { ...acc, [newIndex]: { [key]: value } };
      }, {});
    }
    return this;
  }
  
  size() {
    return this.keys.length;
  }

  sort(cb) {
    // cb takes arguments value1, value2, key1, key2
    const entries = Object.entries(this.collection)
      .map(([ind, values]) => {
        const [[key, value]] = Object.entries(values);
        return [key, value];
      });
    const sortedEntries = entries.sort(([key1, value1], [key2, value2]) => cb(value1, value2, key1, key2));
    this.keys = sortedEntries.reduce((acc, [key]) => [...acc, key], []);
    this.collection = sortedEntries.reduce(
      (acc, [key, value], index) => ({
        ...acc,
        [index]: {
          [key]: value,
        },
      }),
      {});
    return this;
  }
    
  sortIndexes(cb) {
    //  cb takes arguments index1, index2
    const entries = Object.entries(this.collection);
    const sortedIndexes = entries.sort(([index1,], [index2,]) => cb(index1, index2));
    this.keys = sortedIndexes.map(([indx, obj]) => {
      const [key] = Object.entries(obj);
      return key;
    });
    const sortedEntries = sortedIndexes.map(([ind, values], i) => [i, values]);
    this.collection = Object.fromEntries(sortedEntries);
    return this;
  }  

  union(...collections) {
    const entriesToAdd = collections.reduce((acc, coll) => {
      const maxIndex = coll.size() - 1;
      const keys = coll.keys;
      const values = [];
      for (let i = 0; i <= maxIndex; i += 1) {
        const value = coll.getByIndex(i);
        values.push(value);
      }
      const entries = keys.map((key, i) => [key, values[i]]);
      return [...acc, ...entries];
    }, []);
    entriesToAdd.forEach(([key, value]) => this.set(key, value));
    return this;
  }

  uniq() {
    const values = Object.entries(this.collection)
      .reduce((acc, [indx, obj]) => {
        const [[, value]] = Object.entries(obj);
        return [...acc, value];
      }, []);
    const filteredKeys = this.keys
      .filter((key, ind) => {
        const currentValue = this.get(key);
        return values.indexOf(currentValue) == ind;
    });
    const entries = filteredKeys.reduce((acc, key) => [...acc, [key, this.get(key)]], []);
    // returns new collection
    return new IndexedMap(entries);
  }

  uniqKeys() {
    const filteredKeys = this.keys.filter((k, i) => this.keys.indexOf(k) === i);
    const entries = filteredKeys.reduce((acc, key) => [...acc, [key, this.get(key)]], []);
    // returns new collection
    return new IndexedMap(entries);
  }
}

export default IndexedMap;
