export const DEFAULT = {
	DURATION: 2,
	FREQUENCY: 250,
};

export default class Noise extends AudioContext {
	constructor() {
		super();
		this.suspend();
		this.noise = this.generateNoise();
		this.filter = this.generateFilter();
		this.gain = this.generateGain();
		this.analyser = this.generateAnalyser();
		this.connect();
	}

	setIsPaused(isPaused) {
		if (isPaused) this.suspend();
		else this.resume();
	}

	setColor(frequency) {
		this.filter.frequency.value = frequency;
	}

	setGain(gain) {
		this.gain.gain.value = gain;
	}

	setFilterQuality(gain) {
		this.filter.Q.value = 10 ** gain;
	}

	getFrequencyData() {
		const data = new Uint8Array(this.analyser.frequencyBinCount);
		this.analyser.getByteFrequencyData(data);
		return data;
	}

	generateGain() {
		const gain = this.createGain();
		return gain;
	}

	generateFilter() {
		const filter = this.createBiquadFilter();
		filter.type = "bandpass";
		filter.frequency.value = DEFAULT.FREQUENCY;
		return filter;
	}

	generateAnalyser() {
		const analyser = this.createAnalyser();
		analyser.fftSize = 32;
		return analyser;
	}

	generateBuffer() {
		const bufferSize = this.sampleRate * DEFAULT.DURATION;
		const buffer = this.createBuffer(1, bufferSize, this.sampleRate);
		const data = buffer.getChannelData(0);
		for (let i = 0; i < bufferSize; i++) {
			data[i] = Math.random() * 2 - 1;
		}
		return buffer;
	}

	generateNoise() {
		const noise = this.createBufferSource();
		noise.buffer = this.generateBuffer();
		noise.loop = true;
		noise.start();
		return noise;
	}

	connect() {
		this.noise
			.connect(this.filter)
			.connect(this.gain)
			.connect(this.analyser)
			.connect(this.destination);
	}
}
