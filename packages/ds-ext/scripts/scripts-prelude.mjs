import { $, usePowerShell, usePwsh } from 'zx';

if ($.shell.toLowerCase().includes('pwsh')) {
  usePwsh();
} else if ($.shell.toLowerCase().includes('powershell')) {
  usePowerShell();
}
