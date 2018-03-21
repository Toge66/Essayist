##Table

###1、多列横向滚动
```javascripg
const columns = [
  { title: 'Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="#">action</a>,
  },
];

const x = columns.map(line => line.width || 150)

ReactDOM.render(<Table columns={columns} dataSource={data} scroll={{ x }}

```
> 1、要设置`scroll`的`x`，否则横向不会滚动
> >`y`是设置纵向滚动的
> 
> 2、`colums`中至少要有一列不要指定宽度，否则表格太宽的话固定的列会展示出两列