System.config({
  transpiler: 'babel',
  map: {
    'react': 'npm:react@15.0',
    'react-dom': 'npm:react-dom@15.0',
    'react-redux': 'npm:react-redux@4.4',
    'redux': 'npm:redux@3.5',
    'react-router': 'npm:react-router@2.3'
  }
});

System.import('./src/main.js');