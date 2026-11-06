/** Saves a blob as a file through a temporary link. */
export const downloadBlob = (blob: Blob, fileName: string): void => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}

export const downloadText = (text: string, fileName: string, type = 'text/csv;charset=utf-8'): void =>
  downloadBlob(new Blob([text], { type }), fileName)
