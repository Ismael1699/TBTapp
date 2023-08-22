export default function createDownload(arrBytes, nameFile) {
  const uint8Array = new Uint8Array(arrBytes);
  const blob = new Blob([uint8Array], { type: 'Buffer' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = nameFile;
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
  return;
}
