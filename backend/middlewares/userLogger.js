const fs = require('fs');

const userLogger = (req, res, next)=>{
    const logData = `User: ${req.user.username}, Role: ${req.user.role}\n`;
    fs.appendFile('log.txt', logData, (err)=>{
        if (err){
            console.log('Error writing to log file', err);
        }
    });
    next();
};

module.exports = userLogger;
