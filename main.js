const fs = require('fs');

// these values represent the logo when it is scaled to 600x300
const LOGO_WIDTH = 600;
const LOGO_HEIGHT = 300;

const LEFT_BOUND_OF_ONE = 145;
const UPPER_BOUND_OF_ONE = 75;
const RIGHT_BOUND_OF_ONE = 165;
const LOWER_BOUND_OF_ONE = 225;

const CENTER_FIRST_ZERO = [250, 150];
const CENTER_SECOND_ZERO = [410, 150];
const ZERO_INNER_RADIUS = 55;
const ZERO_OUTER_RADIUS = 75;



function getPuzzleSolution() {
	let amountCoordinatesOnLogo = 0;

	const inputData = JSON.parse(fs.readFileSync('coordinatesystem.json', 'utf-8'));

	const width = inputData.width;
	const height = inputData.height;
	const coordinates = scaleWithCoordinateSystem(inputData.coords, width, height);

	coordinates.forEach((coordinate) => {
		if (coordinateIsInLogo(coordinate)) {
			amountCoordinatesOnLogo++;
		}
	})

	return amountCoordinatesOnLogo;
}

/**
 * This scales the coordinates from the given coordinate system to coordinate system of the hardcoded logo
 */
function scaleWithCoordinateSystem(coords, width, height) {
	const scaledCoords = [];

	const xScale = LOGO_WIDTH / width;
	const yScale = LOGO_HEIGHT / height;

	coords.forEach((coord) => {
		scaledCoords.push([coord[0] * xScale, coord[1] * yScale]);
	})

	return scaledCoords;
}

function coordinateIsInLogo(coordinate) {
	return coordinateIsInOne(coordinate) ||
		coordinateIsInZero(coordinate, CENTER_FIRST_ZERO) ||
		coordinateIsInZero(coordinate, CENTER_SECOND_ZERO);
}

function coordinateIsInOne(coordinate) {
	return coordinate[0] >= LEFT_BOUND_OF_ONE &&
		coordinate[0] <= RIGHT_BOUND_OF_ONE &&
		coordinate[1] >= UPPER_BOUND_OF_ONE &&
		coordinate[1] <= LOWER_BOUND_OF_ONE;
}

function coordinateIsInZero(coordinate, centerOfZero) {
	const distanceToCenter = Math.sqrt(Math.pow(coordinate[0] - centerOfZero[0], 2) + Math.pow(coordinate[1] - centerOfZero[1], 2));
	return distanceToCenter >= ZERO_INNER_RADIUS && distanceToCenter <= ZERO_OUTER_RADIUS;
}

console.log(getPuzzleSolution())
