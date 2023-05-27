const app = require('./src/app')

const PORT_NUMBER = 3005;

const server = app.listen(PORT_NUMBER, () =>{
    console.log(`WSV start on port ${PORT_NUMBER}`)
})