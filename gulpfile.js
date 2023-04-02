const { src , dest, watch, series, parallel } = require('gulp');

// SASS y CSS
const sass = require('gulp-sass')(require('sass')); 
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano  = require('cssnano'); //Mmitizar el codigo css

// IMAGENES
const imagemin = require('gulp-imagemin');

// Ayudas
const sourcemaps = require('gulp-sourcemaps'); //Identificar archivo fuente donde se declara estilo de cualquier elemento

function css(done) {
    // Pasos para compilar sass
    // 1.- Identificar la hoja de estilos scss que vamos a compilar a css
    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass() ) //2.- Compilarla (autoprefixer adapta el codigo css generado a diferentes navegadores que puedan estar obsoletos)
        //(autoprefixer adapta el codigo css generado a diferentes navegadores que puedan estar obsoletos)
        // .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( postcss([ autoprefixer() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') )  // 3.- Especificar la ruta donde se guardará el archivo .css
    done();
}


function dev() {
    watch( 'src/scss/**/*.scss', css); /* Todos los archivos que tengan scss, sdoble asterisco para buscar cualquier archivo en esa ruta y el asterisco.scss para que solo busque los que tienen esa extension*/
    watch( 'src/img/**/*', imagenes);
}

// Mover imagenes a carpeta build y mimificarlas (reducir su peso de archivo)
function imagenes() {
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )
}

exports.default = series(imagenes, css, dev);

exports.dev = dev;