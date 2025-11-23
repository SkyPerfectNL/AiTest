import type React from "react";

import "./Pipeline.scss";

interface PipelineProps {
  children?: React.ReactNode
}

export const Pipeline: React.FC<PipelineProps> = ({children}) => {
  const text = "Pipeline";

  return (
    <div className="pipeline">
      {children || (<p>{text}</p>)}
    </div>
  );
};
