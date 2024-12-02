// import NewResumeForm from "@/components/form/newForm/NewResumeForm";
import ResumeForm from "@/components/form/newForm/ResumeForm";
// import Test from "@/components/form/newtryForm/Test";
// import ResumeForm from "@/components/form/ResumeForm";

// 経歴書作成ページ
// stepのクエリパラメータで入力を細かく制御
export default function Resume() {
  return (
    <>
      <h2>職務経歴</h2>
      <p>職務経歴を入力してください</p>
      <ResumeForm />
    </>
  );
}
