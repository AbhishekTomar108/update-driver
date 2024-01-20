
// const { exec } = require('child_process');

// // Example: Open Windows Update settings
// exec('start ms-settings:windowsupdate', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });

// const { exec } = require('child_process');

// // Example: Check for driver updates using PowerShell
// exec('powershell Get-WindowsDriver -Online -All | Select-Object -Property * | Format-Table -AutoSize', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   console.log(`Driver Updates:\n${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });



// const { exec } = require('child_process');

// // Example: Check for driver updates using PowerShell script
// exec('powershell -File script.ps1', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   console.log(`Driver Updates:\n${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });


// const { exec } = require('child_process');
// const path = require('path');

// // Specify the full path to the PowerShell script
// const scriptPath = path.resolve(__dirname, 'script.ps1');

// // Example: Check for driver updates using PowerShell script
// exec(`powershell -File "${scriptPath}"`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   console.log(`Driver Updates:\n${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });

// const { exec } = require('child_process');
// const path = require('path');

// // Specify the full path to the PowerShell script
// const scriptPath = path.resolve(__dirname, 'script.ps1');

// // Example: Check for driver updates using elevated PowerShell script
// exec(`Start-Process powershell -ArgumentList '-File "${scriptPath}"' -Verb RunAs`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   console.log(`Driver Updates:\n${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });


// const { exec } = require('child_process');
// const path = require('path');

// // Specify the full path to the PowerShell script
// const scriptPath = path.resolve(__dirname, 'script.ps1');

// // Example: Check for driver updates using elevated PowerShell script
// exec(`powershell -Command "Start-Process -Filepath powershell -ArgumentList '-File "${scriptPath}"' -Verb RunAs"`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   console.log(`Driver Updates:\n${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });


// const { exec } = require('child_process');
// const path = require('path');

// // Specify the full path to the PowerShell script
// const scriptPath = path.resolve(__dirname, 'script.ps1');

// // Example: Check for driver updates using PowerShell script
// exec(`powershell -File "${scriptPath}"`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   console.log(`Driver Updates:\n${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });

// const { exec } = require('child_process');

// // Example: Check for available Windows updates using PowerShell
// const powershellCommand = 'Get-WindowsUpdate -MicrosoftUpdate';

// exec(`powershell -Command "${powershellCommand}"`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }

//   console.log(`PowerShell Output:\n${stdout}`);
//   console.error(`PowerShell Error Output:\n${stderr}`);
// });


// const { exec } = require('child_process');

// // Example: Check for available Windows updates using PowerShell
// const powershellCommand = 'Invoke-Expression -Command "Get-WUList"';

// exec(`powershell -Command "${powershellCommand}"`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }

//   console.log(`PowerShell Output:\n${stdout}`);
//   console.error(`PowerShell Error Output:\n${stderr}`);
// });

// const { exec } = require('child_process');

// // Example: Check for installed updates using PowerShell
// const powershellCommand = 'Get-HotFix';

// exec(`powershell -Command "${powershellCommand}"`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }

//   console.log(`PowerShell Output:\n${stdout}`);
//   console.error(`PowerShell Error Output:\n${stderr}`);
// });


// const { exec } = require('child_process');

// // Example: Check for installed PnP devices using PowerShell
// // const powershellCommand = 'Get-PnpDevice';
// const powershellCommand = 'Get-WindowsDriver -Online -All';

// exec(`powershell -Command "${powershellCommand}"`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }

//   console.log(`PowerShell Output:\n${stdout}`);
//   console.error(`PowerShell Error Output:\n${stderr}`);
// });


const { exec } = require('child_process');

// Example: Get information about all system drivers using PowerShell
// const powershellCommand = 'Get-PnpDevice | Format-Table -AutoSize';
// const powershellCommand = 'driverquery /v';

const powershellScriptPath = 'GetDrivers.ps1';
const powershellCommand = `powershell -ExecutionPolicy Bypass -File "${powershellScriptPath}"`;

exec(`powershell -Command "${powershellCommand}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  const drivers = JSON.parse(stdout);

  console.log(`Number of Drivers: ${drivers.length}`);

  console.log(`PowerShell Output:\n${stdout}`);
  console.error(`PowerShell Error Output:\n${stderr}`);
});


const { spawn } = require("child_process");

function getDriverInfo() {
  const powershellScript = `
    $driverInfo = Get-WmiObject Win32_PnPSignedDriver | Select-Object DeviceName, DriverVersion
    $driverStatus = driverquery /v

    $combinedInfo = @{}
    $combinedInfo.Add('DriverInfo', $driverInfo)
    $combinedInfo.Add('DriverStatus', $driverStatus)

    ConvertTo-Json $combinedInfo
  `;

  const powershell = spawn("powershell.exe", [
    "-ExecutionPolicy",
    "Bypass",
    "-NoLogo",
    "-NoProfile",
    "-Command",
    powershellScript,
  ]);

  let output = "";

  powershell.stdout.on("data", (data) => {
    output += data.toString();
  });

  powershell.stderr.on("data", (data) => {
    console.error(`PowerShell Error: ${data}`);
  });

  powershell.on("close", (code) => {
    if (code === 0) {
      // Parse the combined output
      const parsedOutput = JSON.parse(output);
      console.log("driver info=",parsedOutput.DriverInfo.length);
      console.log("DriverStatus=",parsedOutput.DriverStatus.length);
      console.log("parsed output =",parsedOutput);
      console.log("PowerShell process has exited.");
    } else {
      console.error(`PowerShell process exited with code ${code.length}`);
    }
  });

  powershell.on("error", (err) => {
    console.error(`PowerShell process encountered an error: ${err}`);
  });

  powershell.on("exit", (code) => {
    console.log(`PowerShell process exited with code ${code.length}`);
  });
}

// Call the function to get driver information
getDriverInfo();


// const { exec } = require('child_process');
// // const runas = require('runas');

// // Example: Get information about all system drivers using PowerShell script file
// const powershellScriptPath = 'GetDrivers.ps1';
// const powershellCommand = `powershell -ExecutionPolicy Bypass -File "${powershellScriptPath}"`;

// exec(powershellCommand, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }

//   console.log(`PowerShell Output:\n${stdout}`);
//   console.error(`PowerShell Error Output:\n${stderr}`);
// });

// runas(powershellCommand, {
//     admin: true,
//     hide: true,  // Optionally hide the command prompt window
//   }, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error: ${error.message}`);
//       return;
//     }
  
//     try {
//       const drivers = JSON.parse(stdout);
  
//       // Now 'drivers' is an array containing information about all drivers
//       console.log('Driver Information:', drivers);
  
//       // Your logic to check for updates and prompt the user goes here
//       // For simplicity, let's assume you want to update all drivers
//       console.log('Updating all drivers...');
  
//       // Replace the following with your actual update logic
//       // For example, you might want to use npm packages for driver updates
  
//     } catch (parseError) {
//       console.error('Error parsing PowerShell output:', parseError.message);
//     }
//   });


// const { exec } = require('child_process');

// // Example: Get information about all system drivers using PowerShell script file
// const powershellScriptPath = 'C:\\Users\\Dell\\Desktop\\update-driver\\GetDrivers.ps1';
// const powershellCommand = `powershell -ExecutionPolicy Bypass -File "${powershellScriptPath}"`;

// exec(powershellCommand, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }

//   try {
//     console.log("std out =",stdout)
//     const drivers = JSON.parse(stdout);

//     // Now 'drivers' is an array containing information about all drivers
//     console.log('Driver Information:', drivers);

//     // Your logic to check for updates and prompt the user goes here
//     // For simplicity, let's assume you want to update all drivers
//     console.log('Updating all drivers...');

//     // Replace the following with your actual update logic
//     // For example, you might want to use npm packages for driver updates

//   } catch (parseError) {
//     console.error('Error parsing PowerShell output:', parseError.message);
//   }
// });



















// console.log('hello')