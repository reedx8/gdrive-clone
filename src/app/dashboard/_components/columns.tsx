"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Doc } from "../../../../convex/_generated/dataModel"

// DNU: Doc type (AI: its a convex type, which is a type that represents a document in your database)
export const columns: ColumnDef<Doc<'files'>>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
]
