export const initContent = [
  {
    id: 'initText',
    type: 'text',
    content:
      '# JBook \nThis is an interactive environment. You can write JavaScript, see it executed, and write comprehensive documentation using Markdown.\n- Click any text cell (including this one) to edit it\n- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!\n- You can show any React component, string, number, or anything else by calling the `show`function. This is a function built into this environment. Call show multiple times to show multiple values\n- Re-order or delete cells using the buttons on the top right\n- Add new cells by hovering on the divider between each cell\nAll of your changes get saved to the file you opened JBook with. So if you ran `npx jbook serve test.js`, all of the text and code you write will be saved to `test.js` file in the same folder where the command is executed.\n\t\t',
  },
  {
    id: 'firstCode',
    type: 'code',
    content:
      "import { useState } from 'react';\n\nconst Counter = () => {\n\tconst [count, setCount] = useState(0);\n\treturn (\n\t\t<div>\n\t\t\t<button onClick={() => setCount(count + 1)}>Click</button>\n\t\t\t<h3>Count: {count}</h3>\n\t\t</div>\n\t);\n};\n\n// Display any variable or React Component by calling 'show'\nshow(Counter);\n",
  },
  {
    id: 'secondCode',
    type: 'code',
    content:
      'const App = () => {\n\treturn (\n\t\t<div>\n\t\t\t<h3>App Says Hi!</h3>\n\t\t\t<i>Counter component will be rendered below...</i>\n\t\t\t<hr />\n\t\t\t{/*\n\t\t\t\tCounter was declared in the previous cell - you can reference it here!\n\t\t\t*/}\n\t\t\t<Counter />\n\t\t</div>\n\t);\n};\n\nshow(App);\n',
  },
];
