export interface ICursor {
  cursor?: // General
  | 'auto'
    | 'default'
    | 'none'
    // Links & status
    | 'context-menu'
    | 'help'
    | 'pointer'
    | 'progress'
    | 'wait'
    // Selection
    | 'cell'
    | 'crosshair'
    | 'text'
    | 'vertical-text'
    // Drag & drop
    | 'alias'
    | 'copy'
    | 'move'
    | 'no-drop'
    | 'not-allowed'
    | 'grab'
    | 'grabbing'
    // Resizing & scrolling
    | 'all-scroll'
    | 'col-resize'
    | 'row-resize'
    | 'n-resize'
    | 'e-resize'
    | 's-resize'
    | 'w-resize'
    | 'ne-resize'
    | 'nw-resize'
    | 'se-resize'
    | 'sw-resize'
    | 'ew-resize'
    | 'ns-resize'
    | 'nesw-resize'
    | 'nwse-resize'
    // Zooming
    | 'zoom-in'
    | 'zoom-out';
}

export const cursor = (props: ICursor) => {
  if (!props.cursor) return '';

  return `cursor: ${props.cursor};`;
};
