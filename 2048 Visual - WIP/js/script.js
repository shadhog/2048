$( document ).ready(function() {

	var boardSize = 4;
	var grid = [];
	var swaps = 0;
	var game = $('#game');
	var gameInner;
	var cells;
	var flags= [];
	var blockSize = 100;
	var blockPadding = 8;
	var ID = 0;
	
	initilizeBoard();
	//insetNewBlock();
	fill([[2,0,0,2],
		  [2,0,2,0],
		  [2,2,0,0],
		  [0,0,0,0]]);
	//insetNewBlock();
	//print();
	//debugger;
	print();

	function initilizeBoard() {
		
		// Initialize board
		var $div = $('<div>', {'class': 'game'});
		game.css({'width' : (blockSize + blockPadding) * boardSize + blockPadding, 'height' : (blockSize + blockPadding) * boardSize + blockPadding, 'padding' : blockPadding });
		game.append($div);	
		gameInner = game.find('.game');
		
		for (var row = 0 ; row < boardSize ; row++) {
			var line = [];
			for (var cell = 0; cell < boardSize; cell++) {
				$('<div>', {'class' : 'def'}).css(locationBlock(cell,row)).appendTo(gameInner);
			line.push(null);
			}
			grid.push(line);
		}
		
		cells = gameInner.find('div');
		
		// Initialize keybord storkes
		$(document).keydown(function(e){
			switch (e.which){
			case 37:    // LEFT
				compressGrid('left');
				break;
			case 38:    // UP
				compressGrid('up');
				break;
			case 39:    // RIGHT
				compressGrid('right');
				break;
			case 40:    // BOTTOM
				compressGrid('down');
				break;
			}
			if (swaps != 0) {
				swaps = 0;
				//insetNewBlock();
			}
		});
	}
	
	function print() {
		var toPrint = '';
		for(var row=0;row<boardSize;row++) {
			var line = grid[row];
			for(var cell=0;cell<boardSize;cell++) {
				if(line[cell] == null) toPrint += '_ (_)\t';
					else toPrint += line[cell].value + ' (' + line[cell].id + ')\t';
			}
			toPrint += '\n\n';
		}
		console.log(toPrint);
	}

	
	/*function transpose(a) {
		return a[0].map((column, index) => (
			a.map(row => row[index])
		));
	}*/

	/*function compressGrid(direction) {
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
	}*/
	
	function CheckIfEndGame() {
		return false;
	}
	
		
	/*function swap(arr, i, j) {
		swaps++;
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
		return arr;
	}*/
	
	// STUCK HERE
	function marge(cell1, row1, cell2, row2, index, direction) {
		//$('#' + grid[prevx][prevy].id).animate(locationBlock(x,y),400);
		//grid[row1][cell1] = null;
		$('#' + grid[row2][cell2].id).remove();
		grid[row2][cell2] = null;
		setCell( (grid[row1][cell1].value)*2 ,row1, index ,grid[row1][cell1].id );
		// STUCK HERE
				//moveBlock(cell2,row2,index,row2);
		//setTimeout( function() {
			//$('#' + grid[row2][cell2].id).remove();
			grid[row2][cell2] = null;
			setCell( (grid[row1][cell1].value)*2 ,row1, index ,grid[row1][cell1].id );
	//}, 400);
	}
	
	function compressGrid(direction) {
		switch(direction) {
			case 'up':
			case 'right':
			case 'down':
			case 'left':
			for(var row=0; row < boardSize; row++) {
				var index = 0;
				var line = grid[row];
				for(var x=0; x < boardSize; x++) {
					if(line[x] != null) {
						for(var scout=x+1; scout < boardSize; scout++) {
							if(line[scout] != null) {
								if(line[x].value == line[scout].value) {
									marge(x,row,scout,row,index,direction);
									index++;
								}
							}
						}
						if(index < x) {
							moveBlock(x,row,index,row);
						}
					}
				}
				//grid[row] = line;
			}
			break;
		}
		print();
	}
	
		
	function locationBlock(row,cell) {
		return {'top' : + (row * (blockSize - 1) + row * blockPadding) + 'px','left' : + (cell * (blockSize - 1) + cell * blockPadding) + 'px'};
	}

	function moveBlock(prevCell,prevRow,newCell,newRow) {
		if(prevRow != newRow || prevCell != newCell) {
			$('#' + grid[prevRow][prevCell].id).animate(locationBlock(newRow,newCell),400);
			setCell(grid[prevRow][prevCell].value,newRow,newCell,grid[prevRow][prevCell].id);
			grid[prevRow][prevCell] = null;
			print();
		}
	}
		
	function locateBlock() {
		console.log('END GAME');
	}
	
	function endGame() {
		console.log('END GAME');
	}
	
	function insetNewBlock() {
		var emptyLocations = [];
		for(var y=0;y<boardSize;y++)
			for(var x=0;x<boardSize;x++)
				if(grid[x][y] == null) emptyLocations.push([x,y]);
		if(emptyLocations.length > 0) {
			var selected = Math.floor(Math.random() * emptyLocations.length);
			placeNewBlock(emptyLocations[selected]);
		}
		else {
			CheckIfEndGame();
		}
	}
		
	function setCell(val,row,cell,id) {
		var obj = {};
		obj.value = val;
		obj.id = id;
		grid[row][cell] = obj;
	}
	
		
	function placeNewBlock(loc) {
		randVal = Math.floor(Math.random() * 2);
		randVal = randVal ? 2 : 4;
		$('<div>', {'class' : 't' + randVal, 'id' : ID}).css(locationBlock(loc[0],loc[1])).html(randVal).appendTo(gameInner);
		setCell(randVal,loc[0],loc[1],ID);
		ID++;
	}
	
	function fill(pos) {
		for(var row=0; row < boardSize; row++) {
		var line = grid[row];
			for(var cell=0; cell < boardSize; cell++) {
				if(pos[row][cell] != '0') {
					$('<div>', {'class' : 't' + pos[row][cell], 'id' : ID}).css(locationBlock(row,cell)).html(pos[row][cell]).appendTo(gameInner);
					setCell(pos[row][cell],row,cell,ID);
					ID++;
				}
			}
			grid[row] = line;
		}
	}
	
	
	
});