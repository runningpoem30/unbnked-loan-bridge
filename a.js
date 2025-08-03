var x = 1; // this is how you give type to a variable 
console.log(x);
// it adds typesafety to be javascript code
// even if you make some mistake , ts can run down 
//basic types in typescript 
function greet(name, lastname, age) {
    console.log("hello ".concat(name));
}
greet("arya", "patahk", 21);
// the argument needs to have a type nigga 
// any is also a type
//we can explicity defien what that it sohuld return 
// type inference - ts understands that the return type should be number , it is able to infer i
// but its a good practice to return it 
//it can only do a type checking , ts doesnt understand you code,  it only understand the types 
function sum(a, b) {
    return a + b;
}
var value = sum(1, 2);
console.log(value);
