import React from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './components/Hello';
import PageHeader from './components/PageHeader';
import Recursive from './components/Recursive';
import { TreeNode } from './model/TreeNode';

let node: TreeNode = new TreeNode([
  "1-1", "1-2", "1-3", "1-4"
], new TreeNode([
  "2-1", "2-2", "2-3", "2-4"
], new TreeNode([
  "3-1", "3-2", "3-3", "3-4"
])));

function App() {
  return (
    <div className="App">
      <Hello />
      <PageHeader title="Hello????" />
      <Recursive
        node={node}
        depth={0}
       />
    </div>
  );
}

export default App;
