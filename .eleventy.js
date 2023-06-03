const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

const markdownItOptions = {
	html: true,
	breaks: true,
	linkify: true,
};

const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);
module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/js");
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addWatchTarget("**.css");
	eleventyConfig.setServerOptions({
		port: 8082,
		watch: ["_site/**/*.css"],
	});

	eleventyConfig.setLibrary("md", markdownLib);
	return {
		markdownTemplateEngine: "njk",
		templateFormats: ["html", "njk", "md"],
		dir: {
			includes: "includes",
		},
	};
};
