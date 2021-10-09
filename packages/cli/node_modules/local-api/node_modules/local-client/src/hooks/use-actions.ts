import { useMemo } from "react";
import { useDispatch, } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";


export const  useAction =() => {
  const  dispach = useDispatch();

 

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispach);
  }, [dispach]  )
};


