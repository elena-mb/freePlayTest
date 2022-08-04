# FreePlay test assignment
My solution to FreePlay test assignment for playable ads dev trainee position.  

## objectControl2D
objectControl2D.js contains three functions to control the movements of an object in 2D: moveTo, rotate, moveDynamicallyTo.  
The result of each function is an array of points (for a period of time).

### moveTo
**Syntax:**  
```
moveTo(from, to, speed, duration);  
```
```from``` and ```to``` are objects that have keys ```[x, y]```.   
```speed``` is a number, representing the speed of the object.  
```duration``` is a number, it's a period of time in which we observe the object moving.  

### moveDynamicallyTo  
**Syntax:**  
```
moveDynamicallyTo(from, to, speed, duration, acceleration, dt = 1);  
```
```from``` and ```to``` are objects that have keys ```[x, y]```.   
```speed``` is a number, representing the speed of the object.  
```duration``` is a number, it's a period of time in which we observe the object moving.  
```acceleration``` is a number. If acceleration is negative, the movement will be slowing down.  
```dt``` is period of time during which the speed is changing.  

### rotate
**Syntax:**   
```
rotate(from, to, rotationSpeed, duration);  
```
```from``` is an object that has keys ```[x, y, angle]```.  
```to``` can either be a number (in degrees) or a point, i. e. an object with keys ```[x, y]```.  
```rotationSpeed``` is a number (degrees per second).  
```duration``` is a number, it's a period of time in which we observe the object turning.  


## IndexedMap
It's a collection that stores values in order they were added. You can access value by the key or by its index.  
**Syntax:**    
```
new IndexedMap([entries]);
```
```entries``` is an optional argument. It's an array of arrays of keys and values:
```
[['key1', 'value1'], ['key2', 'value2'], ...];
```

### Methods
  
#### set
 
```
IndexedMap.prototype.set(key, value);
```
Sets a new key with the given value.   
Returns ```IndexedMap``` object.  

#### setTo
   
```
IndexedMap.prototype.setTo(index, key, value);
```
Sets a new key with the given value at the given index.   
Returns ```IndexedMap``` object.  
  
#### has
  
```
IndexedMap.prototype.has(key);
```
Checks if the object has the given key.  
Return ```boolean``` value.  
  
  
#### hasIndex
  
```
IndexedMap.prototype.hasIndex(index);
```
Checks if the object has the given index.  
Return ```boolean``` value.  
  
  
#### get
```
IndexedMap.prototype.get(key);
``` 
Return the value of the given key or ```undefined```.  
  
  
#### getByIndex
```
IndexedMap.prototype.getByIndex(index);
```
Return the value of the given index or ```undefined```.   
  
    
#### remove
```
IndexedMap.prototype.remove(key);
```
Removes the given key.  
Returns ```IndexedMap``` object.  
  
      
#### removeAt
```
IndexedMap.prototype.removeAt(index, deleteCount = 1);
```
Removes the given number of values at the given index.  
```deleteCount``` is an optional argument, equals to 1 by default.   
Returns ```IndexedMap``` object.  
  
  
#### size
```
IndexedMap.prototype.size();
```
Returns the length of the collection.  
  
   
#### sort
```
IndexedMap.prototype.sort(callback(value1, value2, key1, key2) {});
```
Returns the sorted ```IndexedMap``` object.  

#### sortIndexes
```
IndexedMap.prototype.sortIndexes(callback(index1, index2) {}); 
```
Returns the sorted ```IndexedMap``` object.  


#### union
```
IndexedMap.prototype.union(...collections);
```
Unites the given ```IndexedMap``` collections with the original one.  
Returns ```IndexedMap``` object.  
  
   

#### uniq
```
IndexedMap.prototype.uniq();
```
Returns new ```IndexedMap``` object that has only unique values.   
  
  
#### uniqKeys
```
IndexedMap.prototype.uniqKeys();
```
Returns new ```IndexedMap``` object that has only unique keys.   




Developer: Elena Balabanchik

