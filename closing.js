var a = [1, 2, 3];
function map(arr, func) {
	var bb = [];
	for(var i = 0; i < arr.length; i++){
		bb[i] = func(arr[i]);
	}
	return bb;
}

function reduce(arr, func, start) {
	var res = start;
	for(var i = 0; i < arr.length; i++){
		res = func(arr[i], res);
	}
	return res;
}

var b = map(a, function(n) {
	return n + 3;
});
var c = reduce(a, function(v, b) {
	return v * b;
}, 1);


function filter(arr,func){
	var nextArr = [];
	for(var i = 0; i < arr.length; i++){
		var some = func(arr[i]);
		if(some){
			nextArr.push(arr[i]);
		}
	}
	return nextArr;
}


var invoke = function(funcs, args){
	var res;
	for(var i in funcs){
		res = funcs[i].apply(null, args);
		if(res) return res;
	}
	return false;
}

var add = function(a, b){
	return a + b;
}

var c = add.apply(null, [2, 3]); // 5 add(2, 3)


var d = filter(a, function(x) {
	return x > 1;
});

console.log('D:', d); // 2, 3

console.log(a); // 1, 2, 3

console.log(b); // 4, 5, 6

console.log(c); // 4, 5, 6




//function do_on_array(arr, func) {
//	for (var i = 0; i < arr.length; i++) {
//		arr[i] = func(arr[i]);
//	}
//}

/*
var some = do_on_array(a, function(n) {
	return n + 3;
});

console.log(a);

var enother = do_on_array(a, function(c) {
	return c > 5;
});

console.log(a);

*/

//console.log(do_on_array(a, do_on_array(a)));

//a; // [4, 5, 6]

//do_on_array(a, function(c){ return c > 5});

//a; // [false, false, true]



// var compose = function(){
// 	var args = arguments;
// 	return function(a){
// 		var val = a;
// 		for(var i = 0; i<args.length; ++i){
// 			val = args[i](val);
// 		}
// 		return val;
// 	}
// }

// var c = compose(
// 	function(n){ return n * 10;},
// 	function(n){ return n / 14;},
// 	function(n){ return n * n;}
// 	//function(n){ return Math.floor(n);}
// );

// console.log("C 1:", c(2));
// console.log("C 2:", c(35));