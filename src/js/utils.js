import { createMuiTheme } from "@material-ui/core";
import chroma from "chroma-js";

export const theme = createMuiTheme({
	palette: {
		type: "dark",
	},
});

export const bezierInterpolate = (value, r1, r2, slope) => {
	slope = slope || 0.5;
	value = r1[1] - value;
	const C1 = { x: r1[0], y: r2[0] };
	const C3 = { x: r1[1], y: r2[1] };
	const C2 = {
		x: C3.x,
		y: C1.y + Math.abs(slope) * (C3.y - C1.y),
	};
	const percent = value / (C3.x - C1.x);
	return (
		C1.y * percent ** 2 +
		C2.y * (2 * percent * (1 - percent)) +
		C3.y * (1 - percent) ** 2
	);
};

export const colorArray = chroma
	.bezier([
		theme.palette.primary.dark,
		theme.palette.primary.main,
		theme.palette.primary.light,
	])
	.scale()
	.colors(256);
