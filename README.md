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
*from* and *to* are objects that have keys *x, y*  
*speed* is a number, representing the speed of the object  
*duration* is a number, it's a period of time in which we observe the object moving  

### moveDynamicallyTo  
**Syntax:**  
```
moveDynamicallyTo(from, to, speed, duration, acceleration, dt = 1);  
```
*from* and *to* are objects that have keys *x, y*  
*speed* is a number, representing the speed of the object  
*duration* is a number, it's a period of time in which we observe the object moving  
*acceleration* is a number. If acceleration is negative, the movement will be slowing down  
*dt* is period of time during which the speed is changing  

### rotate
**Syntax:**   
```
rotate(from, to, rotationSpeed, duration);  
```
*from* is an object that have keys *x, y, angle*  
*to* can either be a number (in degrees) or a point, i. e. an object with keys *x, y*  
*rotationSpeed* is a number (degrees per seconds)  
*duration* is a number, it's a period of time in which we observe the object turning  


Developer: Elena Balabanchik

