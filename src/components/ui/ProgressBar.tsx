type ProgressBarProps = {
  progress: string; //"33"
  progressbar: string; //"w-1/3"
};

const ProgressBar = ({ progress, progressbar }: ProgressBarProps) => {
  return (
    <div className="flex justify-center">
      <div className="w-4/5 bg-gray-400 rounded-full h-5 text-center">
        <div className={` bg-blue-800 h-5 rounded-full ${progressbar}`}></div>
        入力進捗 {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
