module.exports = function () {
    var config = {
        allTs: './app/**/*.ts',
        allScss: './app/scss/**/*.scss',
        bowerDir: './bower_components',
        fontawesomeDir: './bower_components/font-awesome/fonts/**.*',
        fontsOutPath: './dist/styles/fonts',
        bootstrapDir: './bower_components/bootstrap-sass/assets/stylesheets',
        mainCss: './dist/styles/css/main.css',
        tsOutputPath: './dist/',
        scssOutputPath: './dist/styles/css/',
        scssOptions: {
            errLogToConsole: true,
            style: 'compressed',
            includePaths: [
                './bower_components/bootstrap-sass/assets/stylesheets',
                './dist/styles/fonts'
            ]
        }
    };
    return config;
}