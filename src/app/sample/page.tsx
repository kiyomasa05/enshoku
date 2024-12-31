import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function WithActions() {
  return (
    <div className="mx-auto w-full max-w-6xl overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Folder Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Bookmarks</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Work Bookmarks</TableCell>
            <TableCell>Bookmarks related to my work projects</TableCell>
            <TableCell>25</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
                <Button variant="outline" size="sm">
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Personal Bookmarks</TableCell>
            <TableCell>
              Bookmarks for my personal interests and hobbies
            </TableCell>
            <TableCell>42</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
                <Button variant="outline" size="sm">
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Travel Bookmarks</TableCell>
            <TableCell>Bookmarks for my upcoming travel plans</TableCell>
            <TableCell>18</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
                <Button variant="outline" size="sm">
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Shopping Bookmarks</TableCell>
            <TableCell>
              Bookmarks for online shopping and product research
            </TableCell>
            <TableCell>14</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
                <Button variant="outline" size="sm">
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
