import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FieldMetadata } from "@conform-to/react";

type Props = {
  text: string;
  fields: FieldMetadata;
};

export default function Table(props:Props) {
  return (
    <>
      <div className="mx-auto w-full max-w-6xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>言語</TableHead>
              <TableHead>経験年数</TableHead>
              <TableHead>備考、説明</TableHead>
              <TableHead className="text-right">アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {languages.map((language, lIndex) => {
              const languageFields = language.getFieldset();
              return (
                <TableRow key={language.key}>
                  <TableCell className="font-medium">{lIndex + 1}</TableCell>
                  <TableCell className="font-medium">
                    <TextInputForm content={languageFields.kinds} />
                  </TableCell>
                  <TableCell className="font-medium">
                    <TextInputForm content={languageFields.yearsOfExperience} />
                  </TableCell>
                  <TableCell className="font-medium">
                    <TextInputForm content={languageFields.description} />
                  </TableCell>
                  <TableCell>
                    <button
                      className="bg-purple-300 p-3 cursor-pointer hover:bg-pink-200"
                      {...form.remove.getButtonProps({
                        name: fields.language.name,
                        index: lIndex,
                      })}
                    >
                      削除
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
