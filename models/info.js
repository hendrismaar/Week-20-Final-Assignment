const fs = require('fs');
const path = require('path');
const filePath = path.join(path.dirname(require.main.filename), 'data', 'info.json');

module.exports = class Info {
    constructor(content) {
        this.infoContent = content;
    }

    saveInfo() {
        fs.readFile(filePath, (error, fileContent) => {
            let infoMass = [];

            if(!error) {
                infoMass = JSON.parse(fileContent)
            }
            else {
                console.log(error);
            }

            infoMass.push(this);

            fs.writeFile(filePath, JSON.stringify(infoMass), (error) =>{
                if(!error){
                    console.log('Info saved.');
                }
            });

        });
    }


    static fetchInfo(callBack){
        fs.readFile(filePath, (error, fileContent) => {
            if(error) {
                callBack([]);
            }

            callBack(JSON.parse(fileContent));
        });
    }

    static deleteInfo(infoToDelete){
        fs.readFile(filePath, (error, fileContent) => {
            let infoMass = [];
            if(!error){
                infoMass = JSON.parse(fileContent);
            }
            for (let i = 0; i < infoMass.length; i++) {
                if (infoMass[i].content === infoToDelete) {
                    infoMass.splice(i, 1);
                    break;
                }
            }

            fs.writeFile(filePath, JSON.stringify(infoMass), (error) => {
                if(!error){
                    console.log("Information deleted")
                }
            });

        });
    }

}