import { RunFormContent, RunModalContentProps } from '../modals/runModal/runForm';
import { SidebarWrap } from './sidebarWrap';

export function Run(props: RunModalContentProps) {
  return (
    <SidebarWrap title={'RUN'} setShowSidebar={props.setShowBar}>
      <RunFormContent onRun={props.onRun} setShowBar={props.setShowBar}/>
    </SidebarWrap>
  );
}
