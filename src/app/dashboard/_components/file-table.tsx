import { ColumnDef } from "@tanstack/react-table"
import { Doc } from "../../../../convex/_generated/dataModel"
// import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

// async function getData(): Promise<Doc<'files'>[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ]
// }

export default function FileTable({files, columns}: {files: Doc<'files'>[], columns: ColumnDef<Doc<'files'>>[]}) {
//   const data = await getData()

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={files} />
    </div>
  )
}
