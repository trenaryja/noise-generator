module.exports = {
	plugins: [
		`gatsby-plugin-sass`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: "noise-generator",
				short_name: "noise-generator",
				start_url: "/",
				background_color: "#3f51b5",
				theme_color: "#3f51b5",
				display: "standalone",
				icon: "src/images/favicon.png",
			},
		},
		{
			resolve: "gatsby-plugin-material-ui",
			options: {
				pathToTheme: "src/utils/theme.js",
			},
		},
	],
};
