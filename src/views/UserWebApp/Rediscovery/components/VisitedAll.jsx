import React from 'react';
import ResourceViewer from './ResourceViewer';

const VisitedAll = ({ resources }) => {
  return (
    <ResourceViewer 
      resources={resources} 
      title={<>You've visited <i className="text-[#ba8ffa]">everything.</i></>}
      subtitle="Here are the best resources to revisit to strengthen your knowledge."
    />
  );
};

export default VisitedAll;
