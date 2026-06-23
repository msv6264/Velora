import React from 'react';
import ResourceViewer from './ResourceViewer';

const FirstRediscovery = ({ resources }) => {
  return (
    <ResourceViewer 
      resources={resources} 
      title={<>Let's start your <i className="text-[#ba8ffa]">learning journey!</i></>}
      subtitle="Here is your first resource to dive into. Enjoy the ride!"
    />
  );
};

export default FirstRediscovery;
