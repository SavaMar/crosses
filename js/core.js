$(document).ready(function() {
	var amountCell = 0,
		alternate = 0,
		cssArguments, divCell, maxCell;
	var stepsWin; //инициализация при постройке

	var cells;
	var getVal = function(index) {
		var cell = cells.eq(index);
		return cell.hasClass('o') ? 'o' : (cell.hasClass('x') ? 'x' : null);
	}
   
	var invoke = function(funcs, args) {
		var res;
		for(var i in funcs) {
			res = funcs[i].apply(null, args);
			if(res) return res;
		}
		return false;
	}

//==================
//	проверка вертикали
//==================
	
	var check_vertical = function(size, cellnum, index) {
		var flag = 0;
		var look_for = getVal(index);
		//check up
		for(var i = index - size, j = 0; i > 0 && j < stepsWin; i -= size, j++ ){
			if(getVal(i) === look_for){
				flag++;
			} else {
				break;
			}
		}
		//check down
		for(var i = index + size, j = 0; i < cellnum && j < stepsWin; i += size, j++ ){
			if(getVal(i) === look_for){
				flag++;
			} else {
				break;
			}
		}
		flag++;
		return flag === stepsWin;
	}

//===========
// проверка горизонтали
//===========

	var check_horisontal = function(size, cellnum, index) {
		var flag = 0;
		var look_for = getVal(index);

		//check limit
		var limit = function(size) {
			var limit = size;
			for( ; limit <= index; limit+=size);
				return limit;
		}

		var tru_limit = index - (limit(size) - size);
		console.log('tru_limit: ' + tru_limit);

		//check left
		for(var i = index - 1, j = 0; j < tru_limit && j < stepsWin; j++, i-- ){
			if(getVal(i) === look_for){
				flag++;
			} else {
				break;
			}
		}

		var tru_limit2 = size - tru_limit - 1;
		console.log('tru_limit2: ' + tru_limit2);

		//check right
		for(var i = index + 1, j = 0; j < tru_limit2 && j < stepsWin; j++, i++ ){
			if(getVal(i) === look_for){
				flag++;
			} else {
				break;
			}
		}
		flag++;
		return flag === stepsWin;

	}

//===========
// проверка диагонали справо
//===========

var check_diagonal_right = function(size, cellnum, index) {
		var flag = 0;
		var look_for = getVal(index);

		//check up
		console.log('index: ' + index);
		for(var i = index - size + 1, j = 0; i > 0 && j < stepsWin; i -= (size-1), j++ ){
			if(getVal(i) === look_for){
				flag++;
			} else {
				break;
			}
		}
		//check down
		for(var i = index + size - 1, j = 0; i < cellnum && j < stepsWin; i += (size-1), j++ ){
			console.log('diagonal: ' + i);
			if(getVal(i) === look_for){
				flag++;
			} else {
				break;
			}
		}
		flag++;
		return flag === stepsWin;
	}

//==================
//	main check
//=================
 var checkGameOver = function(mainVal, maxCell, indexThisCell) {	
       return invoke([check_vertical, check_horisontal], arguments);
   }


//===========
//	постройка основного поля
//===========
	var find_stepsWin = function(){
		amountCell = Number($("input[name='basisVal']").val());
		if(amountCell < 3) {
			alert('Oh no, look what you write!');
				return;
		} else if(amountCell === 3) {
			stepsWin = 3;
		} else if(amountCell === 4) {
			stepsWin = 4;
		} else {
			stepsWin = 5;
		}
		console.log('amountCell: ' + amountCell + '\n' + 'stepsWin: ' + stepsWin);
		return amountCell;
	}
// по нажатии клавиши
	$('input[name = basisVal]').keypress(function(e) {
		if(e.which == 13){
			build_field(find_stepsWin());
		}
		
	});

// по клику на кнопочку "построить"
	$('.button_build').on('click', function() {
		build_field(find_stepsWin());

	});

//==========
//	посторойка поля
//==========

	var build_field = function(num) {
		cssArguments = num * 100 + 35;
		maxCell = num * num;

		divCell = $('div.cell');
		var blockLine = $('.cells_field');
		var addBlock = '<div class="cell"></div>';

		for (var i = 0; i < maxCell; i++) {
			$(divCell).remove();
		}


		$('#main').css('height', cssArguments).css('width', cssArguments);

		for (var i = 0; i < maxCell; i++) {
			blockLine.prepend(addBlock);
		}
		cells = $(".cells_field").children();
	}

//=====
//	очистка поля
//=====
	var clear_field = function() { //очистка ячеек
		$('.cell').removeClass('o').removeClass('x');
		alternate = 0;
		$('#result').css('visibility', 'hidden');
	}

//==========
// work with cells
//==========
	$('div.cells_field').on('click', '.cell', function() { // кликаннье по ячейкам
		var thisCell = $('.cell').index(this);
		if (alternate % 2 == 0) {
			if ($(this).hasClass('x') || $(this).hasClass('o')) {
				return;
			}
			$(this).addClass('x');
		} else {
			if ($(this).hasClass('o') || $(this).hasClass('x')) {
				return;
			}
			$(this).addClass('o');
			$(this).addClass('o');
		}
		//if(checkGameOver(amountCell, maxCell, thisCell)) alert('Game over!');
		if(checkGameOver(amountCell, maxCell, thisCell)){
			$('.notyfy_block').css('display', 'block');
			$('.transparent_layer').css('display', 'block');
		}
		alternate++;
	});

//=========
//	завершение / Game Over
//=========

	$('.transparent_layer').on('click', function() {
		$('.notyfy_block').css('display', 'none');
		$('.transparent_layer').css('display', 'none');
		clear_field();
	});



	$('.button_clear').click(clear_field);
});

//==========================================================
//enother lesson
//==========================================================



//$.getJSON('/crosses/data.txt', function(d) {
//	console.log('request #1 finished');
//	$.getJSON('/crosses/data.txt', function(d) {
//		console.log('request #2 finished');
//
//	});
//});
//
//$.post("/add_user.php", {name: 'Ivan'})

// var multiply = function(a, b){
// 	return a * b;
// }

// var multiply_on_10 = function(a){
// 	return multiply(a, 10);
// }

// var get_multiplier = function(n){
// 	var b = function(num){
// 		return num * n;
// 	}
// 	return b;
// }

// var c_17 = get_multiplier(17);
// var c_20 = get_multiplier(20);

/*

var ccc = function(num){
	return num * 17;
}
 
 */

//console.log('NUM2:', c_17(10), c_20(10));

//var multiply_on_20 = get_multiplier(20);

//multiply_on_20(2); // 40

//var perform_action = function(n, ololo){
//	return ololo(n);
//}
//
//var x = perform_action(10, get_multiplier(20));
//console.log('X:', x);
//
//var compose = function(){
//	var args = arguments;
//	return function(a){
//		var val = a;
//		for(var i = 0; i<args.length; ++i){
//			val = args[i](val);
//		}
//		return val;
//	}
//}
//
//var c = compose(
//	function(n){ return n * 10;},
//	function(n){ return n / 14;},
//	function(n){ return n * n;}
//	//function(n){ return Math.floor(n);}
//);
//
//console.log("C 1:", c(2));
//console.log("C 2:", c(35));