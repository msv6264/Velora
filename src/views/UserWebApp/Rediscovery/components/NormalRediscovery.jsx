import React from 'react';
import ResourceViewer from './ResourceViewer';

const NormalRediscovery = ({ resources }) => {
  return (
    <ResourceViewer 
      resources={resources} 
      title={<>Your Daily <i className="text-[#ba8ffa]">Insight.</i></>}
      subtitle="Velora's algorithm picked this gem from your library. Ready to dive back in?"
    />
  );
};

export default NormalRediscovery;
