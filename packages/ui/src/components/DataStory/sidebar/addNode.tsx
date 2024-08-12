import { SidebarWrap } from './sidebarWrap';
import { AddNodeFormContent, AddNodeModalContentProps } from '../modals/addNodeForm';

export function AddNode(props: AddNodeModalContentProps) {
  return (
    <SidebarWrap title={'AddNode'} setShowSidebar={props.setSidebarKey}>
      <AddNodeFormContent {...props}/>
    </SidebarWrap>
  );
}
