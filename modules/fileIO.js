const fs = require("fs").promises


const writeToFile = async function(pathToFile, data){
    try{
        await fs.writeFile(pathToFile,data);
        console.log(`Wrote to File at path :${pathToFile}`);
    } catch(e){
        console.log(`Cannot write to File at path :${pathToFile}`);
        console.error(e);
    }
}

const readFromFile = async function(pathToFile){
    let content = null;
    try{
        content = await fs.readFile(pathToFile,"utf-8");
        console.log(`Read From File at path :${pathToFile}`);
    } catch(e){
        console.log(`Cannot Read From File at path :${pathToFile}`);
        console.error(e);
    }

    return content;
}

const appendToFile = async function(pathToFile,data){
    try{
        await fs.appendFile(pathToFile,`${data}`);
        console.log(`Appended to File at path :${pathToFile}`);
    } catch(e){
        console.log(`Cannot Append to File at path :${pathToFile}`);
        console.error(e);
    }
}

module.exports = {
    writeToFile,
    readFromFile,
    appendToFile
};