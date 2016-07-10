var packageJson = require('./package');
var devDeps = Object.keys(packageJson.devDependencies);
var deps = Object.keys(packageJson.dependencies);
function printLicenseField(arrProjects) {
    arrProjects.forEach(function (projectName) {
        const pkg = require('./node_modules/'+projectName+'/package.json');
        console.log(projectName + ' - ' + pkg.license);
    });
}
console.log('----------------------' + ' Runtime dependencies:');
printLicenseField(deps);
console.log('----------------------' + ' Dev dependencies:');
printLicenseField(devDeps);