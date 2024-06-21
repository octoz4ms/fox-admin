<template>
  <el-card shadow="never" header="进阶示例">
    <el-button size="small" @click="printDataTable">打印数据表格</el-button>
    <el-button size="small" @click="printAnyTable">打印复杂表格</el-button>
    <el-button size="small" @click="printPdfUrl">打印 pdf</el-button>
  </el-card>
</template>

<script>
  import { printHtml, printPdf, makeTable } from 'ele-admin';

  export default {
    data() {
      return {
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
        ]
      };
    },
    methods: {
      /* 打印数据表格 */
      printDataTable() {
        const html = makeTable(this.users, [
          [
            {
              field: 'username',
              width: 150,
              rowspan: 2,
              title: '联系人'
            },
            {
              align: 'center',
              colspan: 3,
              title: '地址'
            },
            {
              field: 'amount',
              width: 120,
              rowspan: 2,
              title: '金额',
              align: 'center'
            }
          ],
          [
            {
              field: 'province',
              width: 120,
              title: '省'
            },
            {
              field: 'city',
              width: 120,
              title: '市'
            },
            {
              width: 200,
              title: '区',
              templet: (d) => {
                return `<span style="color: red;">${d.zone}</span>`;
              }
            }
          ]
        ]);
        printHtml({
          html: '<p>提供数据和cols配置自动生成复杂表格, 非常的方便</p>' + html,
          loading: false
        });
      },
      /* 打印自定义表格 */
      printAnyTable() {
        const html = `
        <h2 style="text-align: center;color: #333;">XXXXX班级课程表</h2>
        <table class="ele-printer-table">
          <colgroup>
            <col width="130px"/>
          </colgroup>
          <tr>
            <th style="position: relative;">
              <div style="position: absolute;right: 20px;top: 10px;line-height: normal;">星期</div>
              <div style="position: absolute;left: 20px;bottom: 10px;line-height: normal;">时间</div>
              <div
                style="border-top: 1px solid #000; width:141px;height: 0;position: absolute;left: 0;top: 0;transform: rotate(22deg);transform-origin: 0 0;">
              </div>
            </th>
            <th>周一</th>
            <th>周二</th>
            <th>周三</th>
            <th>周四</th>
            <th>周五</th>
          </tr>
          <tr>
            <td>8:00-10:00</td>
            <td>HTML5网页设计<br/>曲丽丽 - 441教室</td>
            <td>数据库原理及应用<br/>严良 - 716机房</td>
            <td>JavaSE初级程序设计<br/>肖萧 - 715机房</td>
            <td></td>
            <td>JavaScript程序设计<br/>董娜 - 733机房</td>
          </tr>
          <tr>
            <td>10:30-12:30</td>
            <td></td>
            <td>JavaScript程序设计<br/>董娜 - 733机房</td>
            <td></td>
            <td>锋利的jQuery<br/>程咏 - 303教室</td>
            <td>JavaEE应用开发<br/>周星 - 303教室</td>
          </tr>
          <tr>
            <td colspan="6" style="height: auto;">午休</td>
          </tr>
          <tr>
            <td>13:30-15:30</td>
            <td>JavaSE初级程序设计<br/>肖萧 - 715机房</td>
            <td></td>
            <td>HTML5网页设计<br/>曲丽丽 - 441教室</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>16:00-18:00</td>
            <td></td>
            <td>JavaEE应用开发<br/>周星 - 303教室</td>
            <td></td>
            <td>数据库原理及应用<br/>严良 - 716机房</td>
            <td></td>
          </tr>
        </table>
        <style>
          th, td {
            text-align: center;
            line-height: 35px;
          }
          td {
            height: 100px;
          }
        </style>
        `;
        printHtml({
          html: html,
          horizontal: true,
          title: '.',
          loading: false
        });
      },
      /* 打印pdf */
      printPdfUrl() {
        printPdf({
          url: 'https://cdn.eleadmin.com/20200610/20200708224450.pdf'
        });
      }
    }
  };
</script>
