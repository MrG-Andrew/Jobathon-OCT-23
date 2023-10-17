import React, {useState } from 'react';
import { Button,  Input,  Popconfirm, Radio, Table } from 'antd';
import { EditableCell, EditableRow } from './helperFunctions';
import {  DeleteOutlined } from '@ant-design/icons'
import StatusSelect from './StatusSelect';
import './TasksTable.css'
const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(1);
  const [filtedTasks, setfiltedTasks] = useState([])
  const [filterInput, setFilterInput] = useState('')
  const handleDelete = (key) => {
    setfiltedTasks([])
    setFilterInput('')
    const newTask = tasks.filter((item) => item.key !== key);
    setTasks(newTask);
  };
  const defaultColumns = [
    {
      title: 'Task',
      dataIndex: 'task',
      width: '20%',
      editable: true,
      sorter: (a, b) => a.task.toLowerCase().localeCompare(b.task.toLowerCase()),
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: 'Task Description',
      dataIndex: 'taskDescription',
      width: '50%',
      editable: true,
      sorter: (a, b) => a.task.toLowerCase().localeCompare(b.task.toLowerCase()),
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: 'Status',
      width: '30%',
      dataIndex: 'status',
      render: (_, record) => (
        tasks.length >= 1 ? (
          <StatusSelect handleStatus={handleStatus} keyValue={record.key}/>
        ) : null
      )
    },
    {
      align:'center',
      title: '',
      dataIndex: 'action',
      render: (_, record) =>
        tasks.length >= 1 ? (
          <Popconfirm title="Are you sure ?" onConfirm={() => handleDelete(record.key)}>
            <DeleteOutlined style={{color:"red", fontSize:'1.2rem'}} />
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    setfiltedTasks([])
    setFilterInput('')
    const newTask = {
      key: count,
      task: `New Task ${count}`,
      taskDescription:'Task Description... ',
      status: 'Not Started',
    };
    setTasks([...tasks, newTask]);
    setCount(prev=>prev + 1);
  };
  const handleSave = (row) => {
    const newTask = [...tasks];
    const index = newTask.findIndex((item) => row.key === item.key);
    const item = newTask[index];
    newTask.splice(index, 1, {
      ...item,
      ...row,
    });
    setTasks(newTask);
  };
  const handleStatus = (key, value) => {
    const newTasks = [...tasks];
    const index = newTasks.findIndex((item) => item.key === key);
    newTasks[index].status = value;
    setTasks(newTasks);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a Task
      </Button>
      <Input value={filterInput} allowClear placeholder='Type to filter tasks...' onChange={e =>{ setfiltedTasks(tasks.filter(task => task.task.includes(e.target.value) || task.taskDescription.includes(e.target.value)));setFilterInput(e.target.value)}} />
      <Table
        components={components}
        rowClassName={(record) => {
          if (record.status === 'Not Started') return 'not-started editable-row';
          if (record.status === 'In Progress') return 'in-progress editable-row';
          if (record.status === 'Finished') return 'finished editable-row';
          return 'editable-row';
        }}
        bordered
        dataSource={filtedTasks.length > 0? filtedTasks:tasks}
        columns={columns}
      />
      <div className='note'>*click on any field to edit</div>
    </div>
  );
};
export default TasksTable;