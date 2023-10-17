import React, {useState } from 'react';
import { Button,  Popconfirm, Radio, Table } from 'antd';
import { EditableCell, EditableRow } from './helperFunctions';
import {  DeleteOutlined } from '@ant-design/icons'
import StatusSelect from './StatusSelect';
import './TasksTable.css'
const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(1);
  const handleDelete = (key) => {
    const newTask = tasks.filter((item) => item.key !== key);
    setTasks(newTask);
  };
  const defaultColumns = [
    {
      title: 'Task',
      dataIndex: 'task',
      width: '20%',
      editable: true,
    },
    {
      title: 'Task Description',
      dataIndex: 'taskDescription',
      width: '50%',
      editable: true,
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
      <Table
        components={components}
        rowClassName={(record) => {
          if (record.status === 'Not Started') return 'not-started editable-row';
          if (record.status === 'In Progress') return 'in-progress editable-row';
          if (record.status === 'Finished') return 'finished editable-row';
          return 'editable-row';
        }}
        bordered
        dataSource={tasks}
        columns={columns}
      />
    </div>
  );
};
export default TasksTable;