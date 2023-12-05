$( document ).ready(function() {

	var boardSize = 4;
	var grid = [];
	var swaps = 0;
	var game = $('#game');
	var gameInner;
	var flags= [];
	
	initilizeBoard();
	insetNewBlock();
	insetNewBlock();
	print();
	
	function initilizeBoard() {
		
		// Initialize board
		var $div = $('<div>', {'class': 'game'});
		game.append($div);	
		gameInner = game.find('.game');
		
		for (var row = boardSize - 1; row >= 0; row--) {
			var myRow = $('<ul>', {'class': 'row'}).appendTo(gameInner);
			for (var col = 0; col < boardSize; col++) {
				myRow.append($('<li>'));
			}
			gameInner.append('<br>');
		}
		
		// Initialize grid
		for(var i=0;i<boardSize;i++) {
			var rowGrid = [];
			for(var j=0;j<boardSize;j++) {
				rowGrid[j] = 0;
			}
			grid[i] = rowGrid;
		}
		
		/*grid = [[2,4,2,4],
			    [8,32,8,32],
				[16,4,16,4],
				[2,0,0,128]];*/
		
		// Initialize keybord storkes
		$(document).keydown(function(e){
			switch (e.which){
			case 37:    // LEFT
				compressGrid('left');
				break;
			case 38:    // UP
				grid = transpose(grid);
				compressGrid('up');
				grid = transpose(grid);
				break;
			case 39:    // RIGHT
				grid = transpose(grid);
				grid.reverse();
				grid = transpose(grid);
				compressGrid('right');
				grid = transpose(grid);
				grid.reverse();
				grid = transpose(grid);
				break;
			case 40:    // BOTTOM
				grid.reverse();
				grid = transpose(grid);
				compressGrid('down');
				grid = transpose(grid);
				grid.reverse();
				break;
			}
			if (swaps != 0) {
				swaps = 0;
				insetNewBlock();
			}
			print();
			//console.log('>> swaps: ' + swaps);
		});
	}
	
	function print() {
		//console.table(grid);
		
		for(var i=0;i<boardSize;i++) {
			var line = grid[i];
			for(var j=0;j<boardSize;j++) {
				var currentCell = gameInner.find('li').eq(i*boardSize + j);
				currentCell.removeClass().html('');
				if(line[j] != 0)
					currentCell.html(line[j]).addClass('t'+line[j]);
			}
		}
	}
	
	function swap(arr, i, j) {
		swaps++;
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
		return arr;
	}
	
	function transpose(a) {
		return a[0].map((column, index) => (
			a.map(row => row[index])
		));
	}

	function compressGrid(direction) {
		console.log();
		for (var z=0; z < boardSize; z++) {
			var line = grid[z];
			for (var i = 0, j = 1; j < boardSize; j++, i++) {
				//debugger;
				if(line[i] == 0) {
					line = swap(line, i, j);
				}
				if(line[i] == line[j] && i!=j) {
					line[i] = (line[i]*2);
					line[j] = 0;
					flags = [];
				}
				else if(line[i] != 0 && line[j] == 0 && i!=j) {
					i--;
				}
				else{
					flags[direction] = true;
					if(flags.left == true &&
						flags.right == true &&
						flags.up == true &&
						flags.down == true) {
						endGame();
					}
				}
			}
			
			for (var i = 0, j = 0; j < boardSize; j++) {
				if (line[j] != 0) {
					if (i < j)  {
						line = swap(line, i, j);
					}
					i++;
				}
			}	
		}
	}
		
	function endGame() {
		console.log('END GAME');
	}
	
	function insetNewBlock() {
		var emptyLocations = [];
		for(var i=0;i<boardSize;i++)
			for(var j=0;j<boardSize;j++)
				if(grid[i][j] == 0) emptyLocations.push([i,j]);
		if(emptyLocations.length > 0) {
			var selected = Math.floor(Math.random() * emptyLocations.length);
			placeNewBlock(emptyLocations[selected]);
		}
		else {
			endGame();
		}
	}
	
	function placeNewBlock(loc) {
		randVal = Math.floor(Math.random() * 2);
		randVal = randVal ? 2 : 4;
		grid[loc[0]][loc[1]] = randVal;
	}
	
	
	
});