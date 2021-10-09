import * as esbuild from 'esbuild-wasm';


// (async ()=> {
//   await localCache.setItem('color', 'red');

//   const color = await localCache.getItem('color');

//   console.log(color)
// })()
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {

    //handle root entry file of 'index.js'
    build.onResolve({ filter: /(^index\.js$)/ }, ()=> {
      return {path: 'index.js', namespace: 'a '};
    });

    // handle relative paths of a module
    build.onResolve({ filter: /^\.+\// }, (args: any)=> {
      return {
        namespace: 'a',
        path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
      }
    });

    //handle main file of a module
    build.onResolve({ filter: /.*/ }, async (args: any) => {
   
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        }
        
        
    });
 
      
    },
  };
};