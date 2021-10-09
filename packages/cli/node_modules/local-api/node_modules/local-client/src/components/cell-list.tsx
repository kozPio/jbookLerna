import './cell-list.css';
import { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { CellState }  from '../state/reducers/cellsReducer'
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

const CellList: React.FC = () =>  {
  const cells = useTypedSelector((state) => {
    if(instanceOfCell(state.cells)){
      let order= state.cells.order;
      let data =state.cells.data;
      return  order.map((id) => data[id]);
    };
  })

  const renderCells = cells?.map(cell => <Fragment key={cell.id}>
    <CellListItem  cell={cell}/>
    <AddCell previousCellId={cell.id} />   
   </ Fragment>)

  return <div className="cell-list">
      <AddCell forceVisible={cells?.length === 0} previousCellId={null}/>
      {renderCells}
    </div>
};

export default CellList;



function instanceOfCell(object: any): object is CellState {
  return 'loading' in object;
}


