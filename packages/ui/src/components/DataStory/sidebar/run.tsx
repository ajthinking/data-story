import { RunFormContent, RunModalContentProps } from '../modals/runModal/runForm';
import { SidebarWrap } from './sidebarWrap';

export function Run(props: RunModalContentProps) {
  return (
    <SidebarWrap title={'Run'} setShowSidebar={props.setSidebarKey}>
      <RunFormContent onRun={props.onRun} setSidebarKey={props.setSidebarKey}/>
    </SidebarWrap>
  );
}
