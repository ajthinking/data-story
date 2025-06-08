import {$, usePwsh, os } from 'zx';


async function fixPowerShellQuote() {
  if(os.platform() !== 'win32') {
    return;
  }
  usePwsh();
  console.log($.shell)
}

await fixPowerShellQuote();
