<template>
  <el-card shadow="never" header="导出 Excel">
    <ele-pro-table
      size="mini"
      :columns="columns"
      :datasource="users"
      :selection.sync="select"
      :toolkit="['size', 'columns', 'fullscreen']"
      :need-page="false"
    >
      <template v-slot:toolbar>
        <el-button type="primary" size="small" @click="exportBas">
          导出
        </el-button>
        <el-button type="primary" size="small" @click="exportAdv">
          导出带表头合并
        </el-button>
        <el-button type="primary" size="small" @click="exportSel">
          导出选中
        </el-button>
      </template>
    </ele-pro-table>
  </el-card>
</template>

<script>
  import { utils, writeFile } from 'xlsx';

  export default {
    data() {
      return {
        // 表格列配置
        columns: [
          {
            columnKey: 'selection',
            type: 'selection',
            width: 45,
            align: 'center'
          },
          {
            columnKey: 'index',
            type: 'index',
            width: 45,
            align: 'center'
          },
          {
            prop: 'username',
            label: '用户名',
            align: 'center',
            showOverflowTooltip: true
          },
          {
            prop: 'addressGroup',
            label: '地址',
            align: 'center',
            showOverflowTooltip: true,
            children: [
              {
                prop: 'province',
                label: '省',
                align: 'center',
                showOverflowTooltip: true
              },
              {
                prop: 'city',
                label: '市',
                align: 'center',
                showOverflowTooltip: true
              },
              {
                prop: 'zone',
                label: '区',
                align: 'center',
                showOverflowTooltip: true
              },
              {
                prop: 'street',
                label: '街道',
                align: 'center',
                showOverflowTooltip: true
              },
              {
                prop: 'address',
                label: '详细地址',
                align: 'center',
                showOverflowTooltip: true
              }
            ]
          },
          {
            prop: 'amount',
            label: '金额',
            align: 'center',
            showOverflowTooltip: true
          }
        ],
        // 表格数据
        users: [
          {
            key: 1,
            username: '张小三',
            amount: 18,
            province: '浙江',
            city: '杭州',
            zone: '西湖区',
            street: '西溪街道',
            address: '西溪花园30栋1单元'
          },
          {
            key: 2,
            username: '李小四',
            amount: 39,
            province: '江苏',
            city: '苏州',
            zone: '姑苏区',
            street: '丝绸路',
            address: '天墅之城9幢2单元'
          },
          {
            key: 3,
            username: '王小五',
            amount: 8,
            province: '江西',
            city: '南昌',
            zone: '青山湖区',
            street: '艾溪湖办事处',
            address: '中兴和园1幢3单元'
          },
          {
            key: 4,
            username: '赵小六',
            amount: 16,
            province: '福建',
            city: '泉州',
            zone: '丰泽区',
            street: '南洋街道',
            address: '南洋村6幢1单元'
          },
          {
            key: 5,
            username: '孙小七',
            amount: 12,
            province: '湖北',
            city: '武汉',
            zone: '武昌区',
            street: '武昌大道',
            address: '两湖花园16幢2单元'
          },
          {
            key: 6,
            username: '周小八',
            amount: 11,
            province: '安徽',
            city: '黄山',
            zone: '黄山区',
            street: '汤口镇',
            address: '温泉村21号'
          }
        ],
        // 选中数据
        select: []
      };
    },
    methods: {
      /* 导出 excel */
      exportBas() {
        const array = [
          ['用户名', '省', '市', '区', '街道', '详细地址', '金额']
        ];
        this.users.forEach((d) => {
          array.push([
            d.username,
            d.province,
            d.city,
            d.zone,
            d.street,
            d.address,
            d.amount
          ]);
        });
        const sheetName = 'Sheet1';
        const workbook = {
          SheetNames: [sheetName],
          Sheets: {}
        };
        const sheet = utils.aoa_to_sheet(array);
        workbook.Sheets[sheetName] = sheet;
        // 设置列宽
        sheet['!cols'] = [
          { wch: 10 },
          { wch: 10 },
          { wch: 10 },
          { wch: 10 },
          { wch: 20 },
          { wch: 40 },
          { wch: 10 }
        ];
        writeFile(workbook, '用户数据.xlsx');
      },
      /* 导出带单元格合并 */
      exportAdv() {
        const array = [
          ['用户名', '地址', null, null, null, null, '金额'],
          [null, '省', '市', '区', '街道', '详细地址', null]
        ];
        this.users.forEach((d) => {
          array.push([
            d.username,
            d.province,
            d.city,
            d.zone,
            d.street,
            d.address,
            d.amount
          ]);
        });
        const sheet = utils.aoa_to_sheet(array);
        sheet['!merges'] = [
          { s: { r: 0, c: 1 }, e: { r: 0, c: 5 } }, // 合并第 0 行第 1 列到第 0 行第 5 列
          { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, // 合并第 0 行第 0 列到第 1 行第 0 列
          { s: { r: 0, c: 6 }, e: { r: 1, c: 6 } } // 合并第 0 行第 6 列到第 1 行第 6 列
        ];
        const sheetName = 'Sheet1';
        const workbook = {
          SheetNames: [sheetName],
          Sheets: {}
        };
        workbook.Sheets[sheetName] = sheet;
        writeFile(workbook, '用户数据.xlsx');
      },
      /* 导出选中数据 */
      exportSel() {
        if (this.select.length === 0) {
          this.$message.error('请至少选择一条数据');
          return;
        }
        const array = [
          ['用户名', '省', '市', '区', '街道', '详细地址', '金额']
        ];
        this.select.forEach((d) => {
          array.push([
            d.username,
            d.province,
            d.city,
            d.zone,
            d.street,
            d.address,
            d.amount
          ]);
        });
        const sheetName = 'Sheet1';
        const workbook = {
          SheetNames: [sheetName],
          Sheets: {}
        };
        workbook.Sheets[sheetName] = utils.aoa_to_sheet(array);
        writeFile(workbook, '用户数据.xlsx');
      }
    }
  };
</script>
