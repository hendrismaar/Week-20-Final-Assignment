const fs = require('fs');
const path = require('path');
const filePath = path.join(path.dirname(require.main.filename), 'data', 'info.json');

module.exports = class Info {
    constructor(info, eduSchool, eduYear, tech, soft, imageUrl) {
        this.infoContent = info; //content = info
        this.eduSchoolContent = eduSchool;
        this.eduYearContent = eduYear;
        this.techContent = tech;
        this.softContent = soft;
        this.imageUrl = imageUrl;
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
}