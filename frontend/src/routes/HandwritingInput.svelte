<!-- HandwritingInput.svelte -->

<script>
	import { onMount } from 'svelte';

	let canvas;
	let isDrawing = false;
	let prevX = 0,
		currX = 0,
		prevY = 0,
		currY = 0;
	let ctx;
	let canvasWidth = 500;
	let canvasHeight = 500;

	onMount(() => {
		canvas = document.querySelector('.canvas');
		ctx = canvas.getContext('2d');
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 2;
	});

	function setRelativeCoordinates(event) {
		prevX = currX;
		prevY = currY;
		currX = event.clientX - canvas.getBoundingClientRect().left;
		currY = event.clientY - canvas.getBoundingClientRect().top;
	}

	function handleMouseDown(event) {
		setRelativeCoordinates(event);
		isDrawing = true;
		ctx.beginPath();
		ctx.fillStyle = 'blue';
		ctx.fillRect(currX, currY, 2, 2);
		ctx.closePath();
	}

	function handleMouseMove(event) {
		if (!isDrawing) return;
		setRelativeCoordinates(event);
		ctx.beginPath();
		ctx.moveTo(prevX, prevY);
		ctx.lineTo(currX, currY);
		ctx.strokeStyle = 'blue';
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.closePath();
	}

	function handleMouseUp() {
		isDrawing = false;
	}

	function handleMouseOver() {
		isDrawing = false;
	}

	function saveDrawing() {
		// Here you can use the pathData to save the drawing data
	}
</script>

<div class="canvas-container" style="width: {canvasWidth}">
	<canvas
		class="canvas"
		width={canvasWidth}
		height={canvasHeight}
		style="position: absolute; width: {canvasWidth}px; height: {canvasHeight}px; border 1px solid #ccc;"
		on:mousedown={handleMouseDown}
		on:mousemove={handleMouseMove}
		on:mouseup={handleMouseUp}
	/>
</div>

<button on:click={saveDrawing}>Save Drawing</button>

<style>
	.canvas-container {
		position: relative;
		border: 1px solid #ccc;
		width: 500px;
		height: 500px;
	}

	/* .canvas {
		width: 100%;
		height: 100%;
	} */
</style>
