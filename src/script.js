
//CHECK OUR ELEMENTS FOR NEIGBOUR BEGIN
const findRow = (elem,step = 4) => Math.ceil(elem/step)
const oneRow = (elem1,elem2,callback = findRow) => callback(elem1)===callback(elem2);
const findCol = (elem,step = 4)=>elem%step || step;
const oneCol = (elem1,elem2,callback=findCol) => callback(elem1)===callback(elem2);
const detextXelem =(elem,callback=findRow,step=4) =>(elem-step*(callback(elem)-1));
const detextYelem = (elem,step=4)=>(Math.ceil((elem-4)/4)+1);
const isNeigbour = (cell1,cell2)=> {
	return 	oneRow(cell1,cell2) ? 
				Math.abs(detextXelem(cell1)-detextXelem(cell2)) === 1 ?
	

					true:
					false 
				:oneCol(cell1,cell2) ?
					Math.abs(detextYelem(cell1)-detextYelem(cell2)) === 1 ?
						true:
						false
					:false
}
//CHECK OUR ELEMENTS FOR NEIGBOUR END


//OUR COORDS
const findMouseCoords = event=>({x:event.clientX,y:event.clientY});



//FIND INDEX OF OUR ELEMENT BEGIN
const isEqualElem = (elem,arrayElem)=>{
	return elem.x>=arrayElem.x
	 && elem.x<(arrayElem.x+arrayElem.w)
	  && elem.y>=arrayElem.y
	   && elem.y<(arrayElem.y+arrayElem.h) ? true : false;
}
const findIndexElem = (elem,array,callback=isEqualElem)=>{
	const list = [];
	array.forEach(item=>list.push(callback(elem,item)));
	return list.indexOf(true)+1;
}
//FIND INDEX OF OUR ELEMENT END

const swap = (el1,el2) => ({...el1,id:el2.id});

const swapElem = (array,ind1,ind2) => {
	const timeArray = [...array];
	timeArray.push(timeArray[ind1]);
	timeArray[ind1] = {...timeArray[ind1],id: timeArray[ind2].id};
	timeArray[ind2] = {...timeArray[ind2],id: timeArray[timeArray.length-1].id};
	timeArray.pop();
	return timeArray;
	// array.push(array[ind1]);
	// array[ind1] = array[ind2];
	// array[ind2] = array[array[array.length-1]];
	// array.pop();
}

class Elem {
	constructor(x,y,id,w=50,h=50){
		this.x = x;
		this.y = y;
		this.h = h;
		this.w = w;
		this.id = id;
	}
}

//XOR OPERATOR
const toBit = elem => isNaN(elem/elem) ? 0 : 1;
const XOR = (elem1,elem2,callback = toBit) => callback(elem1)^callback(elem2)?true:false;
const toNum = (elem)=>typeof(elem)==="number"?elem : 0;
//EQUAL ARRAY
const isEqualArray =(array1,array2)=>{
	if(array1.length===array2.length){
		const list = [];	
		for(let i = 0;i<array1.length;i++) list.push( array1[i]===array2[i]? true : false );
		let result = list.reduce((res,cur)=>res && cur); 
		return result;
	}


}

//DRAW PART BEGIN
const drawBoard = (ctx,width,height,step = 50)=>{
	for(let count = 1;count<4;count++){
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(step*count,0);
		ctx.lineTo(step*count,height);
		ctx.stroke()	
		
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(0,step*count);
		ctx.lineTo(width,step*count);
		ctx.stroke()
	}
}

const drawElem = (ctx,elem,step = 25)=>{
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeRect(elem.x,elem.y,elem.w,elem.h);
	ctx.font = "italic 10pt Arial";
	ctx.fillText(elem.id,elem.x+step,elem.y+step)
}

const drawContext =(ctx,arr,callback=drawElem)=>{
	arr.forEach( item =>{callback(ctx,item)})
}
//DRAW PART END
const draw = (ctx,array,width,height)=>{
	ctx.clearRect(0,0,width,height);
	drawBorder(ctx,width,height);
	drawBoard(ctx,width,height);
	drawContext(ctx,array);
}
const drawBorder = (ctx,width,height) =>{
		ctx.lineWidth = 1;
		ctx.strokeRect(0,0,width,height);
}
const drawCheckedElem = (element,ctx)=> {
	ctx.beginPath()
	ctx.lineWidth = 3;
	ctx.strokeRect(element.x,element.y,element.w,element.h);
}
const calCulate = ()=>{

}


//OUR GAME

(function(){
	const w =50,h=50,step =10;
	let gameField = [
		new Elem(0,	 0,  11),
		new Elem(50, 0,  12),
		new Elem(100,0,  3),
		new Elem(150,0,  4),
		new Elem(0,  50, 7),
		new Elem(50, 50, 13),
		new Elem(100,50, 1),
		new Elem(150,50, 8),
		new Elem(0,  100,""),
		new Elem(50, 100,15),
		new Elem(100,100,9),
		new Elem(150,100,12),
		new Elem(0,  150,5),
		new Elem(50, 150,6),
		new Elem(100,150,2),
		new Elem(150,150,10)

		];
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	let width = canvas.width = 200,
		height = canvas.height = 200,
		swapArray = [],indexArray=[],
		checkElem,
		winArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0],
		currentArray,
		winFlag=false;

	ctx.beginPath();
	ctx.clearRect(0,0,width,height);
	ctx.lineWidth = 1;
	ctx.strokeRect(0,0,200,200)
	drawBoard(ctx,width,height);
	drawContext(ctx,gameField);
	
	// drawContext(ctx,gameField);


	const drawPole = ()=>{
		ctx.clearRect(0,0,width,height);
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeRect(0,0,200,200);	
		drawBoard(ctx,width,height);
		drawContext(ctx,gameField);
		// ctx.beginPath();

	}
	const handleFunc = event =>{
		if(winFlag) return;
		event.preventDefault();

		let checkCoords = findMouseCoords(event);
		let index = findIndexElem(checkCoords,gameField)-1;
		checkElem = gameField[index];
		swapArray.push(checkElem);
		indexArray.push(gameField.indexOf(checkElem));
		currentArray = gameField.map(item=>toNum(item.id));
		console.log(currentArray);
		// drawCheckedElem(checkElem,ctx);	
		console.log(swapArray);
		console.log(indexArray);

		//SWAP CONDITION
		if(swapArray.length == 2){
			if(XOR(swapArray[0].id,swapArray[1].id)){
				if(isNeigbour(indexArray[0]+1,indexArray[1]+1)){
					gameField = swapElem(gameField,indexArray[0],indexArray[1]);	
				}
				
			}
			swapArray = [];
			indexArray = [];
		}
				console.log(gameField);
		if(isEqualArray(winArray,currentArray)) winFlag=true;
		drawPole();
		// ctx.clearRect(0,0,width,height);
		// drawBoard(ctx,width,height);
		// drawContext(ctx,gameField);
		// ctx.lineWidth = 1;
		// ctx.strokeRect(0,0,200,200);

		if(swapArray.length===1 && winFlag===false) drawCheckedElem(checkElem,ctx);	
	}
	canvas.addEventListener('click',handleFunc);
})()





// const ppp = ()=>{
// 	return 5>3?
// 			3>1? "double true" :
// 				 "double lie"
// 			: "lol"
// }
