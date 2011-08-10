var	Binary		= require('../js/binary.js').Binary;

Binary.toQ8 = Binary(8, 1, 1, 0);

function	pad(count){
	count	= count || 1;
	return [].slice.call(arguments, 1).map(function(item){
		item = String(item);
		return item + Array(Math.ceil((count * 8 - item.length) / 8) + 1).join('\t');
	}).join('');
}

function	padZeroes(num, length){
	num	= String(num);
	return Array(length - num.length + 1).join('0') + num;
}

function	binarize(num, length){
	return num < 0 ? '1' + padZeroes((-num).toString(2), length) : '0' + padZeroes(num.toString(2), length);
}

var	i, res;

for (i=0; i<256; i++){
	res	= Binary.toQ8(String.fromCharCode(i));
	console.log(pad(2,
		binarize(i, 8),
		res
	));
}

