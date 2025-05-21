import { CheckCircle, Clock, Package } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function OrdersTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">ORD-2023-1234</TableCell>
            <TableCell>FreshMart EU</TableCell>
            <TableCell>Red Globe - 10 Pallets</TableCell>
            <TableCell>
              <Badge variant="outline" className="flex w-fit items-center gap-1">
                <Clock className="h-3 w-3 text-amber-500" />
                Pending
              </Badge>
            </TableCell>
            <TableCell>May 20, 2023</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                View
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">ORD-2023-1233</TableCell>
            <TableCell>GlobeExport</TableCell>
            <TableCell>Crimson - 5 Pallets</TableCell>
            <TableCell>
              <Badge variant="outline" className="flex w-fit items-center gap-1">
                <Clock className="h-3 w-3 text-amber-500" />
                Pending
              </Badge>
            </TableCell>
            <TableCell>May 19, 2023</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                View
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">ORD-2023-1232</TableCell>
            <TableCell>EuroFresh</TableCell>
            <TableCell>Thompson - 8 Pallets</TableCell>
            <TableCell>
              <Badge variant="outline" className="flex w-fit items-center gap-1">
                <Package className="h-3 w-3 text-blue-500" />
                Processing
              </Badge>
            </TableCell>
            <TableCell>May 18, 2023</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                View
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">ORD-2023-1231</TableCell>
            <TableCell>AsiaFruit</TableCell>
            <TableCell>Flame - 3 Pallets</TableCell>
            <TableCell>
              <Badge variant="outline" className="flex w-fit items-center gap-1">
                <Package className="h-3 w-3 text-blue-500" />
                Processing
              </Badge>
            </TableCell>
            <TableCell>May 17, 2023</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                View
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">ORD-2023-1230</TableCell>
            <TableCell>AmeriTrade</TableCell>
            <TableCell>Red Globe - 6 Pallets</TableCell>
            <TableCell>
              <Badge variant="outline" className="flex w-fit items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                Completed
              </Badge>
            </TableCell>
            <TableCell>May 16, 2023</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                View
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
