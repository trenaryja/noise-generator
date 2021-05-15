import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import theme from "../utils/theme";
import {
	Typography,
	Slider,
	Fab,
	ThemeProvider,
	CssBaseline,
} from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";
import Noise from "../utils/noise";
import * as utils from "../utils/utils";

let noise;
let idArray;
const height = 25;

const Index = () => {
	const [volume, setVolume] = useState(0.5);
	const [color, setColor] = useState(250);
	const [filterQuality, setFilterQuality] = useState(0.5);
	const [isPaused, setIsPaused] = useState(true);
	const frequencyData = useRef([]);

	const handleVolumeChange = (_e, x) => setVolume(x);
	const handleColorChange = (_e, x) => setColor(x);
	const handleFilterQualityChange = (_e, x) => setFilterQuality(x);
	const handlePlayPause = () => setIsPaused(!isPaused);

	const updateNoise = () => {
		if (noise) {
			noise.setIsPaused(isPaused);
			noise.setColor(color);
			noise.setGain(volume);
			noise.setFilterQuality(filterQuality);
		}
	};

	useEffect(updateNoise, [isPaused, volume, color, filterQuality]);

	useEffect(() => {
		noise = new Noise();
		idArray = [...Array(noise.analyser.frequencyBinCount).keys()];
		requestAnimationFrame(plotNoise);
	}, []);

	const plotNoise = () => {
		if (noise) {
			frequencyData.current = noise.getFrequencyData();

			let bars = idArray.map((id) => document.getElementById(id));
			for (let i = 0; i < bars.length; i++) {
				const barHeight = utils.bezierInterpolate(
					frequencyData.current[i],
					[0, 255],
					[0, height],
					0.1,
				);
				bars[i]?.setAttribute("height", barHeight);
				bars[i]?.setAttribute("y", (height - barHeight) / 2);
				bars[i]?.setAttribute(
					"fill",
					utils.colorArray[frequencyData.current[i]],
				);
			}
		}
		requestAnimationFrame(plotNoise);
	};

	return (
		<ThemeProvider theme={theme}>
			<Helmet>
				<title>Noise Generator</title>
			</Helmet>

			<div id="app">
				<CssBaseline />

				<div id="controls">
					<Typography>Volume</Typography>
					<Slider
						value={volume}
						step={0.01}
						min={0}
						max={1}
						onChange={handleVolumeChange}
					/>
					<Typography>Color</Typography>
					<Slider
						value={color}
						step={1}
						min={20}
						max={23000}
						onChange={handleColorChange}
					/>
					<Typography>Filter Quality</Typography>
					<Slider
						value={filterQuality}
						step={0.1}
						min={-3}
						max={4}
						scale={(x) => 10 ** x}
						onChange={handleFilterQualityChange}
					/>
					<Fab color="primary" onClick={handlePlayPause}>
						{isPaused ? <PlayArrow /> : <Pause />}
					</Fab>
				</div>

				<svg shapeRendering="crispEdges" viewBox={`0 0 100 ${height}`}>
					{idArray?.map((x) => (
						<rect
							width={100 / idArray.length}
							x={(100 / idArray.length) * x}
							id={x}
							key={x}
						></rect>
					))}
				</svg>
			</div>
		</ThemeProvider>
	);
};

export default Index;
