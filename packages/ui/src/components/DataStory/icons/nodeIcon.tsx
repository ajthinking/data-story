export function NodeIcon (isActive = false) {
  return (
    <svg className={`w-6 h-6 ${isActive ? 'fill-white' : 'fill-blue-500'}`} viewBox="0 0 1024 1024" version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="8453" id="mx_n_1722588859007" width="200" height="200">
      <path
        d="M320 192v128c0 35.2-28.8 64-64 64H128c-35.2 0-64-28.8-64-64V192c0-35.2 28.8-64 64-64h128c35.2 0 64 28.8 64 64z"
        p-id="8454"></path>
      <path
        d="M960 704v128c0 35.2-28.8 64-64 64h-128c-35.2 0-64-28.8-64-64v-128c0-35.2 28.8-64 64-64h128c35.2 0 64 28.8 64 64zM960 192v128c0 35.2-28.8 64-64 64h-128c-35.2 0-64-28.8-64-64V192c0-35.2 28.8-64 64-64h128c35.2 0 64 28.8 64 64z"
        p-id="8455"></path>
      <path d="M704 288V224H320v64h158.72L480 768c0 17.6 14.4 32 32 32h192v-64h-160l-1.28-448H704z"
        p-id="8456"></path>
    </svg>);
}
