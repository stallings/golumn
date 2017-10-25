#!/usr/bin/env node
const { execFile, exec } = require('child_process');
const golumn = require('commander');
const shell = require('shelljs');
const tmp = require('tmp');
const fs = require('fs');

let electronPath = '';

golumn
  .version('0.1.0')
  .option('-h, --help', 'Get help!')

golumn
  .command('path [path]')
  .description('Provide the path to the unbuilt electron app. This is for development purposes')
  .action(function(path){
    electronPath = path;
  });

golumn.parse(process.argv);

let data = '';
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {

  // Consider cleaning and streaming directly to the tmp file
  const chunk = process.stdin.read();
  if (chunk) {
    data += chunk
  }
});

process.stdin.on('end', () => {

  //Clean the data
  let stripData = data.replace("null","");

  //Create a tmp file
  tmp.file({ postfix: '.csv' }, function _tempFileCreated(err, path, fd, cleanupCallback) {
    if (err) throw err;

    writeDataToTmp(path, stripData);
  });
});


const writeDataToTmp = function(tmpPath, data) {
  fs.writeFile(tmpPath, data, function(err) {
    if(err) {
        return console.log("ERROR: ", err);
    }

    console.log("The file was saved!");

    openApp(tmpPath);
  });
}


const openApp = function(path) {
  if (!electronPath) {

    // Find the golumnv path
    const appPath = exec('sh app_path.sh');

    appPath.stdout.on('data', function(appPath){
      const command = `open ${appPath} --csv="${path}"`;
      exec(command)
    });

    appPath.stderr.on('data', function(data){
      console.error("ERROR:", data)
      process.exit(1)
    });
  }
  else {
    shell.cd(electronPath);
    shell.exec(`electron . --csv=${path}`)
    shell.exit(1);
  }
}
