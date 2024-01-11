import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Container, Slider } from "@mui/material";
import "./style/Search.css";

function Search() {
	const [selectedFile, setSelectedFile] = useState<File>();
	const [previewSrc, setPreviewSrc] = useState("");
	// const [selectedPoint, setSelectedPoint] = useState({ x: 50, y: 50 });

	const canvasRef = useRef<HTMLCanvasElement>(null);

	// const marks = [
	// 	{
	// 		value: 0,
	// 		label: "0%",
	// 	},
	// 	{
	// 		value: 100,
	// 		label: "100%",
	// 	},
	// ];

	useEffect(() => {
		resetCanvas();

		// drawPoint();
	}, [previewSrc]);

	const resetCanvas = () => {
		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

				const img = new Image();
				img.onload = () => {
					ctx.drawImage(
						img,
						0,
						0,
						canvasRef.current!.width,
						canvasRef.current!.height
					);
				};
				img.src = previewSrc;
			}
		}
	};

	// const drawPoint = () => {
	// 	if (canvasRef.current) {
	// 		const ctx = canvasRef.current.getContext("2d");
	// 		if (ctx) {
	// 			if (selectedPoint.x && selectedPoint.y) {
	// 				const imagePath = "/images/center.png";

	// 				const img = new Image();
	// 				img.onload = () => {
	// 					ctx.drawImage(
	// 						img,
	// 						(selectedPoint.x * ctx.canvas.width) / 100.0,
	// 						(selectedPoint.y * ctx.canvas.height) / 100.0,
	// 						50,
	// 						50
	// 					);
	// 				};

	// 				img.src = imagePath;
	// 			}
	// 		}
	// 	}
	// };

	// Handles file selection and updates the state
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);

			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewSrc(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	// const handleXChange = (event: any, newValue: number | number[]) => {
	// 	setSelectedPoint({ x: newValue as number, y: selectedPoint.y });

	// 	resetCanvas();
	// 	drawPoint();
	// };

	// const handleYChange = (event: any, newValue: number | number[]) => {
	// 	setSelectedPoint({ x: selectedPoint.x, y: newValue as number });

	// 	resetCanvas();
	// 	drawPoint();
	// };

	return (
		<Container>
			<input type="file" accept="image/*" onChange={handleFileChange} />
			<Box alignContent="center" justifyContent="center" display="flex">
				{previewSrc && (
					<canvas
						id="imgCanvas"
						ref={canvasRef}
						width={500}
						height={500}
					></canvas>
				)}
				{/* <Slider
					defaultValue={50}
					valueLabelDisplay="auto"
					step={10}
					min={10}
					max={100}
					marks={marks}
					onChange={handleXChange}
				/>
				<Slider
					defaultValue={50}
					valueLabelDisplay="auto"
					step={10}
					min={10}
					max={100}
					marks={marks}
					onChange={handleYChange}
				/> */}
			</Box>
			<Button variant="contained" color="primary">
				Search
			</Button>
		</Container>
	);
}

export default Search;
