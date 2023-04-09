<template>
<div class="echart">
  <div id="chartPie" class="pie-wrap"></div>
  <div id="chartLine" class="line-wrap"></div>
</div>
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons')
require('echarts/theme/shine')

export default {
  data() {
    return {
      chartPie: null,
      chartLine: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawPieChart()
      this.drawLineChart()
    })
  },
  methods: {
    drawPieChart() {
      let mytextStyle = {
        color: "#333",                          
        fontSize: 18,                            
      };
      let mylabel = {
        show: true,                 
        position: "right",          
        offset: [30, 40],             
        formatter: '{b} : {c} ({d}%)',      
        textStyle: mytextStyle
      };
      this.chartPie = echarts.init(document.getElementById('chartPie'),'macarons');
      this.chartPie.setOption({
        title: {
          text: '订单数据图',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          data: ['蔬菜', '水果', '肉类', '速冻食品', '海鲜'],
          left:"center",                              
          top:"bottom",                              
          orient:"horizontal",                        
        },
        series: [
          {
            name: '菜品分类',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            data: [
              {value: 335, name: '蔬菜'},
              {value: 310, name: '水果'},
              {value: 234, name: '肉类'},
              {value: 135, name: '速冻食品'},
              {value: 1548, name: '海鲜'}
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            label: {           
              emphasis: mylabel
            }
          }
        ]
      })
    },

    drawLineChart() {
      this.chartLine = echarts.init(document.getElementById('chartLine'),'shine');// 基于准备好的dom，初始化echarts实例
      let option = {
          tooltip : {
              trigger: 'axis'
          },
          legend: {
              data:['志愿者申请', '志愿者登记']
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  axisTick: {
                      show: false
                  },
                  name: '日期',   
                  data : ['周一','周二','周三','周四','周五','周六','周日']
              }
          ],
          yAxis : [
            {
              type : 'value',
              axisTick: {
                show: false
              },
              name: '（人）'
            }
          ],
          series : [
            {
              name:'志愿者申请',
              type:'line',
              stack: '总量',
              data:[3, 5, 1, 7, 9, 1, 4]
            },
            {
              name:'志愿者登记',
              type:'line',
              stack: '总量',
              data:[18, 21, 5, 2, 18, 19]
            },
          ]
      };
      // 使用刚指定的配置项和数据显示图表
      this.chartLine.setOption(option)
    }
  }
}
</script>

<style scope>
.echart {
  display: flex;
}
.pie-wrap{
  width:600px;
  height:400px;
  margin-right: 100px;
}
.line-wrap{
  width:600px;
  height:400px;
}
</style>