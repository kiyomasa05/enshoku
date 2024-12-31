"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useResumeFormContext } from "@/app/provider/resumeFormProvider";
import { useRouter } from "next/navigation";

const ConformForm = () => {
  const { experience, skills } = useResumeFormContext();
  const router = useRouter();
  // const resume = experience.experience

  return (
    <>
      <div className="mx-auto w-full max-w-6xl overflow-x-auto">
        <h2>職務経歴</h2>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-400 border-solid">
              <TableHead className="min-w-20"></TableHead>
              <TableHead>スキル</TableHead>
              <TableHead>経験年数</TableHead>
              <TableHead>備考、説明</TableHead>
              <TableHead>
                <Button
                  className="bg-sky-600 p-3 text-right"
                  onClick={() => {
                    router.push("/resume?step=2");
                  }}
                >
                  編集する
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {resume.map(()=>{return (null)})} */}
          </TableBody>
          </Table>
        <h2>テクニカルスキル</h2>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-400 border-solid">
              <TableHead className="min-w-20"></TableHead>
              <TableHead>スキル</TableHead>
              <TableHead>経験年数</TableHead>
              <TableHead>備考、説明</TableHead>
              <TableHead>
                <Button
                  className="bg-sky-600 p-3 text-right"
                  onClick={() => {
                    router.push("/resume?step=2");
                  }}
                >
                  編集する
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
           
            {skills && Object.entries(skills).map(
              ([category, skillList]) => {
                if (skillList.length > 0) {
                  return skillList.map((skill, index) => (
                    <TableRow key={`${category}-${index}`}>
                      <TableHead key={category}>{category}</TableHead>
                      <TableCell key={`${category}-${index}-kinds`}>
                        {skill.kinds}
                      </TableCell>
                      <TableCell key={`${category}-${index}-years`}>
                        {skill.yearsOfExperience}
                      </TableCell>
                      <TableCell key={`${category}-${index}-description`}>
                        {skill.description}
                      </TableCell>
                    </TableRow>
                  ));
                } else {
                  return (
                    <TableRow key={category}>
                      <TableCell colSpan={3} className="text-center">
                        {category} のデータはありません
                      </TableCell>
                    </TableRow>
                  );
                }
              }
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ConformForm;
