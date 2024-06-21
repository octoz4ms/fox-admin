export default [
  {
    label: '系统管理',
    value: '1',
    children: [
      {
        label: '用户管理',
        value: '2',
        children: [
          {
            label: '添加用户',
            value: '3'
          },
          {
            label: '修改用户',
            value: '4'
          }
        ]
      },
      {
        label: '角色管理',
        value: '5',
        children: [
          {
            label: '添加角色',
            value: '6',
            disabled: false
          },
          {
            label: '修改角色',
            value: '7'
          }
        ]
      }
    ]
  },
  {
    label: '日志管理',
    value: '8',
    children: [
      {
        label: '登录日志',
        value: '9'
      },
      {
        label: '操作日志',
        value: '10',
        disabled: false
      }
    ]
  },
  {
    label: '列表页面',
    value: '11',
    children: [
      {
        label: '基础列表',
        value: '12'
      },
      {
        label: '卡片列表',
        value: '13',
        children: [
          {
            label: '项目',
            value: '14'
          },
          {
            label: '应用',
            value: '15'
          },
          {
            label: '文章',
            value: '16'
          }
        ]
      }
    ]
  }
];
