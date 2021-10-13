import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const cumulativeCode = [];
    if (state.cells) {
      const { data, order } = state.cells;

      const showFunc = `
		import _React from 'react';
		import _ReactDOM from 'react-dom';

		var show = (value) => {
			const root = document.querySelector('#root');

			if (typeof value === 'object') {
				console.log(value);
				if (value.$$typeof && value.props) {
					_ReactDOM.render(value, root);
				} else {
					root.innerHTML = JSON.stringify(value);
				}
			} else if (typeof value === 'function') {
				const Comp = value;
				_ReactDOM.render(<Comp />, root);
			} else {
				root.innerHTML = value;
			}
		};
	`;

      const showFuncNoop = 'var show = () => {}';

      const orderedCells = order.map((id) => data[id]);

      for (let c of orderedCells) {
        if (c.type === 'code') {
          if (c.id === cellId) {
            cumulativeCode.push(showFunc);
          } else {
            cumulativeCode.push(showFuncNoop);
          }
          cumulativeCode.push(c.content);
        }

        if (c.id === cellId) {
          break;
        }
      }
    }
    return cumulativeCode;
  }).join('\n');
};
