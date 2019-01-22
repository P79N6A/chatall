<template>
  <div class="plan-container">
    <div v-if="isItem" class="select-menu">
      <ul>
        <li @click.prevent="changeItem(index, item.token)" v-for="(item, index) in allItem[$route.params.id]" :key="index">
          <p :style="{color: itemIndex === index?'#EE0024':'#444'}">{{item.name}}</p>
        </li>
      </ul>
    </div>
    <div class="plan-head">
      <p @click.prevent="backto" v-text="'<'"></p>
      <h1>{{titleName[$route.params.id]}}</h1>
      <div @click="showItem" class="item-can">
        <span>{{allItem[$route.params.id][itemIndex].name}}</span>
        <img src="../../static/images/tag/tag.png" alt="">
      </div>
    </div>
    <!-- <div class="second-top">
        <div class="top-child">
            <p>期号</p>
        </div>
        <div class="top-child">
            <p>号码</p>
        </div>
        <div class="top-child">
            <p style="line-height: 5px">万位五码-</p>
            <p style="line-height: 5px">计划</p>
        </div>
        <div class="top-child">
            <p style="line-height: 5px">当前</p>
            <p style="line-height: 5px">成本</p>
        </div>
        <div class="top-child">
            <p style="line-height: 5px">累计</p>
            <p style="line-height: 5px">成本</p>
        </div>
        <div class="top-child">
            <p style="line-height: 5px">亏损</p>
            <p style="line-height: 5px">盈利</p>
        </div>
        <div class="top-child">
            <p style="line-height: 5px">开奖</p>
            <p style="line-height: 5px">时间</p>
        </div>
    </div> -->
    <div class="plan-body">
      <table>
        <tr style="background: #f5f5f5; height: 44px;">
          <td>
            <p>期号</p>
          </td>
          <td>
            <p>号码</p>
          </td>
          <td>
            <p style="line-height: 5px">{{littleTitleName+ '-'}}</p>
            <p style="line-height: 5px">计划</p>
          </td>
          <td>
            <p style="line-height: 5px">当前</p>
            <p style="line-height: 5px">成本</p>
          </td>
          <td>
            <p style="line-height: 5px">累计</p>
            <p style="line-height: 5px">成本</p>
          </td>
          <td>
            <p style="line-height: 5px">亏损</p>
            <p style="line-height: 5px">盈利</p>
          </td>
          <td>
            <p style="line-height: 5px">开奖</p>
            <p style="line-height: 5px">时间</p>
          </td>
        </tr>
        <tr v-for="(item, index) in tableData" :key="index">
          <td style="padding-top: 10px;">
            <p style="line-height: 20px;">{{item.periods}}</p>
          </td>
          <td algin="center">
            <p :class="{zhongjiang: item.ylks>0&&item.openContent !== '待开'}"
               :style="{color: item.openContent === '待开'?'#EE0024':'#444'}">{{item.openContent}}</p>
          </td>
          <td style="position: relative;text-align: center">
            <!-- <p style="position: absolute;top: 10px;left: 5px;margin-right: 10px;">12</p> -->
            <p>{{item.recommendContent}}</p>
          </td>
          <td>
            <p>{{item.dqcb}}</p>
          </td>
          <td><p>{{item.ljcb}}</p></td>
          <td><p :style="{color: item.ylks>0?'#444':'#EE0024'}">{{item.ylks}}</p></td>
          <td><p>{{item.openTime - 0 | dateFormat('mm:ss')}}</p></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import '../assets/css/plan.less'
  import Plan from '../api/plan.js'

  export default {
    data() {
      return {
        tableData: [],
        isItem: false,
        itemIndex: 0,
        titleName: {
          bjsc: '北京赛车',
          cqssc: '重庆时时彩',
          jsk3: '江苏快三'
        },
        littleTitleName: '',
        planName: [
          'bjsc',
          'cqssc',
          'jsk3'
        ],
        realItem: [],
        allData: [],
        allItem: {
          bjsc: [
            {
              name: '冠亚和大小',
              token: 'gyhdxjh'
            },
            {
              name: '冠亚和单双',
              token: 'gyhdsjh'
            },
            {
              name: '冠军五码',
              token: 'gjnumjh'
            },
            {
              name: '冠军大小',
              token: 'gjdxjh'
            },
            {
              name: '冠军单双',
              token: 'gjdsjh'
            }
          ],
          cqssc: [
            {
              name: '万位大小',
              token: 'wwdxjh'
            },
            {
              name: '万位单双',
              token: 'wwdsjh'
            },
            {
              name: '和值大小',
              token: 'hdxjh'
            },
            {
              name: '和值单双',
              token: 'hdsjh'
            },
            {
              name: '万位五码',
              token: 'wwnumjh'
            }

          ],
          jsk3: [
            {
              name: '和值大小',
              token: 'hdxjh'
            },
            {
              name: '和值单双',
              token: 'hdsjh'
            }
          ]
        }
      }
    },
    created() {
      this.getPlan(this.$route.params.id);
    },
    mounted() {
    },
    methods: {
      backto() {
        window.history.go(-1);
      },
      returnData() {

      },
      changeItem(index, token) {
        this.itemIndex = index;
        this.littleTitleName = this.allData[index].name;
        for (let i = 0; i < this.allData.length; i++) {
          if (this.allData[i].key === token) {
            this.tableData = this.allData[i].value;
          }
        }
        this.isItem = !this.isItem;
      },
      showItem() {
        this.isItem = !this.isItem;
      },
      getPlan(data) {
        Plan(data).then(res => {
            this.allData = res.data.plan;
            this.tableData = this.allData[0].value;
            this.littleTitleName = this.allData[0].name;
          }
        )
      }
    }
  }
</script>



