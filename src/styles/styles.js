import { defaults } from "../utils/utils";

export const app = {
	display: "grid",
	margin: "1em auto",
	justifyItems: "center",
	width: defaults.size,
	gap: "1em",
};

export const fieldGrid = {
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	width: "100%",
	gap: "1em",
	justifyItems: "center",
};

export const canvasButtons = {
	display: "flex",
	justifyContent: "space-around",
};
