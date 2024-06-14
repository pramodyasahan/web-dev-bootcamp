const fs = require('fs');
const fileName = process.argv[2] || 'Project'
try {
    fs.mkdirSync(fileName);
    fs.writeFileSync(`${fileName}/index.html`)
    fs.writeFileSync(`${fileName}/styles.css`)
    fs.writeFileSync(`${fileName}/app.js`)
} catch (e) {
    console.log("Something Went Wrong!")
    console.log("Error, ", e)
}


