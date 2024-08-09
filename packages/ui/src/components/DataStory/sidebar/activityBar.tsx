import React, { useEffect, useState } from 'react';
import { ReactFlowNode } from '../../Node/ReactFlowNode';
import { DiagramIcon } from '../icons/diagramIcon';
import { ConfigIcon } from '../icons/configIcon';
import { NodeIcon } from '../icons/nodeIcon';

type Activity = {
  id: string;
  name: string;
  icon: (isActive: boolean) => JSX.Element;
};

const activities: Activity[] = [
  { id: 'node', name: 'Node Config', icon: NodeIcon },
  { id: 'diagram', name: 'Diagram Config', icon: DiagramIcon },
  { id: 'settings', name: 'Settings', icon: ConfigIcon },
  { id: 'experiment', name: 'Experiment', icon: ConfigIcon },
];

export const ActivityBar = ({
  onActivityChange,
  onClose,
  selectedNode
}: {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onActivityChange: (activity: string) => void;
  selectedNode?: ReactFlowNode;
}) => {
  const [activeKey, setActiveKey] = useState<string>(activities[0].id);

  useEffect(() => {
    onActivityChange(activeKey);
  }, [activeKey, onActivityChange]);

  const handleActivityClick = (id: string) => {
    // 1. when click the same activity, switch sidebar status
    if (id === activeKey) {
      onClose((prev) => !prev);
    } else {
      // 2. when click different activity, show sidebar and switch activity
      onClose(false);
    }
    setActiveKey(id);
  };

  useEffect(() => {
    if (selectedNode) {
      setActiveKey('node');
      onClose(false);
    }
  }, [selectedNode]);

  return (
    <aside
      aria-label="ActivityBar"
      id="default-activity-bar"
      className="bg-gray-50 text-gray-800 flex flex-col items-center h-full"
    >
      {activities.map(({ id, name, icon }) => (
        <button
          key={id}
          title={name}
          className={`py-1 w-full ${activeKey === id ? 'border-l-2 border-blue-500 bg-blue-500' : 'hover:bg-blue-100'}`}
          onClick={() => handleActivityClick(id)}
        >
          <div className="p-2 flex justify-center items-center">
            {icon(activeKey === id)}
          </div>
        </button>
      ))}
    </aside>
  );
};
