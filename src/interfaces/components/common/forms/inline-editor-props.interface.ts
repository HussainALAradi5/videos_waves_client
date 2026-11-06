export interface InlineEditorProps {
  initialValue: string
  maxLength: number
  /** May return a promise; Save stays busy until it settles. */
  onSave: (value: string) => unknown
  onCancel: () => void
  saveLabel: string
  cancelLabel: string
  placeholder?: string
}
