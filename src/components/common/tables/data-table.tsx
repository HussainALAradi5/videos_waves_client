import { Table } from '@chakra-ui/react'
import type { DataTableProps } from '@/interfaces/components/common/tables/data-table-props.interface'

const hiddenBelow = (breakpoint?: string) => (breakpoint ? { base: 'none', [breakpoint]: 'table-cell' } : undefined)

/** Column-config table; each column decides how to render its cell. */
export function DataTable<T>({ columns, rows, getKey, caption }: DataTableProps<T>) {
  return (
    <Table.ScrollArea borderWidth="1px" borderRadius="lg">
      <Table.Root size="sm" interactive>
        {caption && <Table.Caption>{caption}</Table.Caption>}
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeader key={column.key} display={hiddenBelow(column.hideBelow)} textAlign={column.align}>
                {column.header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={getKey(row)}>
              {columns.map((column) => (
                <Table.Cell key={column.key} display={hiddenBelow(column.hideBelow)} textAlign={column.align}>
                  {column.render(row)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}
