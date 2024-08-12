import React, { useEffect } from 'react';
import { ReactFlowNode } from '../../Node/ReactFlowNode';
import { DiagramIcon } from '../icons/diagramIcon';
import { ConfigIcon } from '../icons/configIcon';
import { NodeIcon } from '../icons/nodeIcon';

type Activity = {
  id: string;
  name: string;
  icon: React.FC<{}>;
  position: 'top' | 'bottom';
};

const activityGroups: Activity[] = [
  { id: 'node', name: 'Node Config', icon: NodeIcon, position: 'top' },
  { id: 'diagram', name: 'Diagram Config', icon: DiagramIcon, position: 'top' },
  { id: 'settings', name: 'Settings', icon: ConfigIcon, position: 'top' },
  { id: 'experiment', name: 'Experiment', icon: ConfigIcon, position: 'top' },
]

export const ActivityBar = ({
  setActiveKey,
  onClose,
  activeKey,
  selectedNode,
}: {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveKey: (activity: string) => void;
  activeKey: string;
  selectedNode?: ReactFlowNode;
}) => {
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

  const renderActivityButtons = (position: 'top' | 'bottom') => {
    return activityGroups
      .filter((activity) => activity.position === position)
      .map(({ id, name, icon }) => (
        <button
          key={id}
          title={name} // Tooltips are provided by the title attribute.
          className={`py-1 w-full 
          ${activeKey === id
          ? 'border-l-2 border-blue-500 bg-blue-500 fill-white text-blue-500'
          : 'hover:bg-blue-100 border-gray-400 fill-gray-400 text-white'}`}
          onClick={() => handleActivityClick(id)}
        >
          <div className="p-2 flex justify-center items-center">
            {icon({})}
          </div>
        </button>
      ));
  };

  return (
    <aside
      aria-label="ActivityBar"
      id="default-activity-bar"
      className="bg-gray-50 text-gray-800 flex flex-col items-center h-full"
    >
      <div className="col-start">{renderActivityButtons('top')}</div>
    </aside>
  );
};
