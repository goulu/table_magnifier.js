function _integral(x, x1, x2) {
	//return integral between x1 and x2 under triangle peaking at (x,2)

	if (x2 <= x) {
		return (x1 + x2) * (x2 - x1) / x;
	}
	if (x1 >= x) {
		return (2 - x1 - x2) * (x1 - x2) / (x - 1);
	}
	return _integral(x, x1, x) + _integral(x, x, x2);
}

function repartition(x, n) {
	/*divide 1 into n fractions such that:
	 - their sum is 1
	 - they follow a triangular linear repartition where x/1 is the maximum
	 (see Goulib.math2)
	 */
	w = 1 / n;
	res = [];
	for (var i = 0; i < n; i++) {
		res.push(_integral(x, i * w, (i + 1) * w));
	}
	return res;
}


$("td").mousemove(function(a) {
	var x = a.clientX;
	var y = a.clientY;
	var cell = $(this);
	var row = cell.parent();
	var table = row.parent();

	var position = table.position();

	x = x - position.left;
	y = y - position.top;

	var height = table.height();
	var width = 300;
	// table.width();

	x = x / width;
	y = y / height;

	var rows = table.children('tr');
	var first = rows.filter(':first').children();

	var w = repartition(x, first.length);
	var h = repartition(y, rows.length);

	height = height / rows.length;

	rows.each(function(r, tr) {
		$(tr).children().each(function(c, td) {
			$(td).css("height", 100 * h[r] + "%");
			$(td).css("font-size", (3000 * h[r] * w[c]) + "%");
			if (r == 0) {// we need to assign width only on a single row
				$(td).css("width", 100 * w[c] + "%");
			}
		});
	});
});

$("table").hover(function() {// hovering is processed in mousemove
}, function() {
	//remove all attributes
	var table = this;
	var first = table.children('tr:first').children();
	console.log("clean" + table);
	first.each(function(i, cell) {
		console.log("clean" + i + cell);
		$(cell).css("width", "");
	});
});

$("td").hover(function() {
	$(this).css("background", "yellow");
}, function() {
	$(this).css("background", "");
}); 