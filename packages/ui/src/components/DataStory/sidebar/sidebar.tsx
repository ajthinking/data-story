export const Sidebar = () => {
  // const selector = (state: StoreSchema) => ({
  //   nodes: state.nodes,
  //   openNodeModalId: state.openNodeModalId,
  //   setOpenNodeModalId: state.setOpenNodeModalId,
  //   updateNode: state.updateNode,
  // });
  // const { nodes, openNodeModalId, setOpenNodeModalId } = useStore(selector, shallow);

  // const node = nodes.find((node: ReactFlowNode) => node.id === openNodeModalId)!
  // const close = () => setOpenNodeModalId(null);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Data Stories</h2>
      </div>
      <div className="sidebar-content">
        {/*<NodeSettingsForm node={node} close={close}/>*/}
      </div>
    </div>
  );
}
