@rem
node node_modules\prettier\bin-prettier.js --write src/*.js
node node_modules\uglify-es\bin\uglifyjs src/clean-cookies.js -o res/clean-cookies.js --compress --mangle
node node_modules\uglify-es\bin\uglifyjs src/clean-youtube.js -o res/clean-youtube.js --compress --mangle
node node_modules\uglify-es\bin\uglifyjs src/contenteditable.js -o res/contenteditable.js --compress --mangle
node node_modules\uglify-es\bin\uglifyjs src/notepad.js -o res/notepad.js --compress --mangle
node node_modules\uglify-es\bin\uglifyjs src/sitemap.js -o res/sitemap.js --compress --mangle
node node_modules\uglify-es\bin\uglifyjs src/toindex.js -o res/toindex.js --compress --mangle
node node_modules\uglify-es\bin\uglifyjs src/google-cache.js -o res/google-cache.js --compress --mangle