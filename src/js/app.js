import React from "react";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Noise from "./noise";
import * as utils from "./utils";

const noise = new Noise();
const idArray = [...Array(noise.analyser.frequencyBinCount).keys()];
const height = 25;

const App = () => {
	const [volume, setVolume] = React.useState(0.5);
	const [color, setColor] = React.useState(noise.filter.frequency.value);
	const [filterQuality, setFilterQuality] = React.useState(0.5);
	const [isPaused, setIsPaused] = React.useState(true);
	const frequencyData = React.useRef([]);

	const handleVolumeChange = (_e, x) => setVolume(x);
	const handleColorChange = (_e, x) => setColor(x);
	const handleFilterQualityChange = (_e, x) => setFilterQuality(x);
	const handlePlayPause = () => setIsPaused(!isPaused);

	const updateNoise = () => {
		noise.setIsPaused(isPaused);
		noise.setColor(color);
		noise.setGain(volume);
		noise.setFilterQuality(filterQuality);
	};
	React.useEffect(updateNoise, [isPaused, volume, color, filterQuality]);

	const plotNoise = () => {
		frequencyData.current = noise.getFrequencyData();

		let bars = idArray.map((id) => document.getElementById(id));
		for (let i = 0; i < bars.length; i++) {
			const barHeight = utils.bezierInterpolate(
				frequencyData.current[i],
				[0, 255],
				[0, height],
				0.1,
			);
			bars[i].setAttribute("height", barHeight);
			bars[i].setAttribute("y", (height - barHeight) / 2);
			bars[i].setAttribute(
				"fill",
				utils.colorArray[frequencyData.current[i]],
			);
		}
		requestAnimationFrame(plotNoise);
	};
	requestAnimationFrame(plotNoise);

	return (
		<div id="app">
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
					{isPaused ? <PlayArrowIcon /> : <PauseIcon />}
				</Fab>
			</div>

			<svg shapeRendering="crispEdges" viewBox={`0 0 100 ${height}`}>
				{idArray.map((x) => (
					<rect
						width={100 / idArray.length}
						x={(100 / idArray.length) * x}
						id={x}
						key={x}
					></rect>
				))}
			</svg>
		</div>
	);
};

export default App;
