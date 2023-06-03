const { src, dest, watch } = require("gulp");
const minifyCss = require("gulp-clean-css");
const concat = require("gulp-concat");
const del = require("gulp-clean");
const { series } = require("gulp");
const bundleCss = () => {
	return src(["./src/css/global.css", "./src/css/*.css"]).pipe(minifyCss()).pipe(concat("bundle.css")).pipe(dest("./_site/src/css/"));
};

const Del = () => {
	return src("./_site/src/css/*.css").pipe(del());
};

const devWatch = () => {
	watch("./src/css/*.css", bundleCss);
};

exports.Del = Del;
exports.bundleCss = bundleCss;
exports.devWatch = devWatch;
exports.build = series(Del, bundleCss, devWatch);
