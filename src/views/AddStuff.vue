<template>
  <div class="add_stuff">
    <Form inline>
      <FormItem>
        <Select v-model="settlementCompany" filterable placeholder="结算单位"
                remote :remote-method="fetchSettlementCompanyList" :loading="loading1" @on-change="handleChange(11)"
        >
          <Option v-for="(option, index) in settlementCompanyList"
                  :key="index" :value="option.name"
          >{{ option.name }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select v-model="settlementMethod" filterable placeholder="结算方式"
                remote :remote-method="fetchSettlementMethodList" :loading="loading1"
        >
          <Option v-for="(option, index) in settlementMethodList"
                  :key="index" :value="option.name"
          >{{ option.name }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Input v-model="stuff.using" placeholder="器材用途" style="width: 200px" />

        <!-- <Select filterable placeholder="器材用途">
          <Option v-for="item in cityList" :key="item.value" v-model="stuff.using" :value="item.value">
            {{ item.label }}
          </Option>
        </Select> -->
      </FormItem>
      <FormItem>
        <DatePicker v-model="date" type="date" placeholder="日期" style="width: 200px" />
      </FormItem>

      <br>
      <FormItem label="物品名称">
        <Select v-model="stuff.name" filterable placeholder="物品名称"
                remote :remote-method="fetchStuffByName" :loading="loading1" @on-change="handleCheckStuffList"
        >
          <Option v-for="(option, index) in stuffNameList" :key="index" :value="option.name">{{ option.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="单位">
        <Input v-model="stuff.type" placeholder="单位" />
      </FormItem>
      <FormItem label="数量">
        <InputNumber v-model="stuff.num" placeholder="数量" />
      </FormItem>

      <FormItem label="单价">
        <InputNumber v-model="stuff.price" placeholder="单价" />
      </FormItem>
      <FormItem label="加入清单 ">
        <Button type="primary" long @click="handleAddTable">
          <Icon type="md-add" />
        </Button>
      </FormItem>
    </Form>
    <Table :columns="columns1" :data="stuffList" />
    <div class="mr_t_20">
      <Button type="primary" @click="handleSubmit">
        入库
      </Button>
    </div>
    <div class="mr_t_20">
      <h2>票据打印</h2> <Button v-print="'#printAdd'" type="primary">打印</button>
      <div id="printAdd">
        <p id="print_settlementCompany">{{ printInfo.settlementCompany }}</p>
        <p id="print_settlementMethod">{{ printInfo.settlementMethod }}</p>
        <p id="print_date0">{{ printInfo.dateList[0] }}</p>
        <p id="print_date1">{{ printInfo.dateList[1] }}</p>
        <p id="print_date2">{{ printInfo.dateList[2] }}</p>
        <p id="print_using">{{ printInfo.using }}</p>
        <p id="print_shouliaobianhao">{{ printInfo.shouliaobianhao }}</p>
        <table id="print_table">
          <tr v-for="item in printInfo.stuffList" :key="item.id">
            <td id="print_itemId">{{ item.id }}</td>
            <td id="print_itemName">{{ item.name }}</td>
            <td id="print_itemType">{{ item.type }}</td>
            <td id="print_itemAmount">{{ item.amount }}</td>
            <td id="print_itemTotalPrice">{{ item.totalPrice }}</td>
            <td id="print_itemAmount">{{ item.amount }}</td>
            <td id="print_itemTotalPrice">{{ item.totalPrice }}</td>
            <td id="print_itemFapiaohao">{{ item.fapiaohao }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

const Component = Vue.extend({
    components: {},
    data() {
        return {
            printInfo: {
                settlementCompany: '啊压力公司',
                settlementMethod: '发票回款',
                date: '2018-12-8',
                dateList: ['2018', '12', '8'],
                using: '维护料',
                shouliaobianhao: '151616516',
                stuffList: [{
                    id: 123,
                    name: '坤超神',
                    type: '个',
                    amount: '80',
                    unitPrice: '20',
                    totalPrice: '1600',
                    fapiaohao: '131564',
                },
                {
                    id: 1234,
                    name: '坤超神1',
                    type: '个',
                    amount: '180',
                    unitPrice: '220',
                    totalPrice: '16000',
                    fapiaohao: '13asf1564',
                }],
            },
            submitFlag: false,
            loading1: false,
            settlementMethod: '',
            settlementCompany: '',
            date: '',
            using: '',
            stuff: {
                name: '',
                type: '',
                price: 0,
                num: 0,
            },
            settlementMethodList: [],
            settlementCompanyList: [],
            stuffNameList: [],
            columns1: [{
                title: '物品名称',
                key: 'name',
            },
            {
                title: '单位',
                key: 'type',
            },
            {
                title: '数量',
                key: 'num',
            },
            {
                title: '价格',
                key: 'price',
            },
            ],
            stuffList: [],
        };
    },
    mounted() {
        this.$axios
            .get('/stock/settlementMethod?query=&page=0&limit=10', {
                param: {},
            })
            .then((res) => {
                console.log(res);
                if (res.data.code === '2000') {
                    this.settlementMethodList = res.data.settlementMethodList;
                } else {
                    alert('获取结算单位失败');
                }
            }).catch((err) => {
                console.log(`请求失败：${err}`);
            });
        this.$axios
            .get('/stock/company', {
                params: {
                    query: '',
                    page: 0,
                    limit: 10,
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.code === '2000') {
                    this.settlementCompanyList = res.data.settlementCompanyList;
                } else {
                    alert('获取结算单位失败');
                }
            }).catch((err) => {
                console.log(`请求失败：${err}`);
            });
        this.$axios
            .get('/stock/stuff', {
                params: {
                    queryList: encodeURIComponent(JSON.stringify([])),
                    page: 0,
                    limit: 10,
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.code === '2000') {
                    this.stuffNameList = res.data.stuffList;
                } else {
                    alert('获取结算单位失败');
                }
            }).catch((err) => {
                console.log(`请求失败：${err}`);
            });
    },
    methods: {
        handleChange(a) {
            console.log(a);
        },
        fetchStuffByName(query) {
            if (query !== '') {
                this.loading1 = true;
                this.$axios
                    .get('/stock/stuff', {
                        params: {
                            queryList: encodeURIComponent(JSON.stringify([{ name: 'name', value: query }])),
                            page: 0,
                            limit: 10,
                        },
                    })
                    .then((res) => {
                        this.loading1 = false;
                        console.log(res);
                        if (res.data.code === '2000') {
                            const filter = res.data.stuffList.filter(item => item.name === query);
                            this.stuffNameList = res.data.stuffList;
                            if (filter.length === 0) {
                                this.stuffNameList = [{ name: query, id: -1 }, ...this.stuffNameList];
                            }
                        } else {
                            alert('获取物品信息失败');
                        }
                    }).catch((err) => {
                        this.loading1 = false;
                        console.log(`请求失败：${err}`);
                    });
            } else {
                this.stuffNameList = [{ name: '', id: -2 }];
                this.stuff.name = '';
            }
        },
        fetchSettlementCompanyList(value) {
            if (value !== '') {
                this.loading1 = true;
                this.$axios
                    .get('/stock/company', {
                        params: {
                            query: value,
                            page: 0,
                            limit: 10,
                        },
                    })
                    .then((res) => {
                        this.loading1 = false;
                        console.log(res);
                        if (res.data.code === '2000') {
                            const filter = res.data.companyList.filter(item => item.name === value);
                            this.settlementCompanyList = res.data.companyList;
                            if (filter.length === 0) {
                                this.settlementCompanyList = [{ name: value, id: -1 }, ...this.settlementCompanyList];
                            }
                        } else {
                            alert('获取结算单位失败');
                        }
                    }).catch((err) => {
                        this.loading1 = false;
                        console.log(`请求失败：${err}`);
                    });
            } else {
                this.settlementCompanyList = [{ name: '', id: -2 }];
                this.settlementCompany = '';
            }
        },
        fetchSettlementMethodList(value) {
            if (value !== '') {
                this.loading1 = true;
                this.$axios
                    .get('/stock/settlementMethod', {
                        params: {
                            query: value,
                            page: 0,
                            limit: 10,
                        },
                    })
                    .then((res) => {
                        this.loading1 = false;
                        console.log(res);
                        if (res.data.code === '2000') {
                            const filter = res.data.settlementMethodList.filter(item => item.name === value);
                            this.settlementMethodList = res.data.settlementMethodList;
                            if (filter.length === 0) {
                                this.settlementMethodList = [{ name: value, id: -1 }, ...this.settlementMethodList];
                            }
                        } else {
                            alert('获取结算方式失败');
                        }
                    }).catch((err) => {
                        this.loading1 = false;
                        console.log(`请求失败：${err}`);
                    });
            } else {
                this.settlementMethodList = [{ name: '', id: -2 }];
                this.settlement = '';
            }
        },
        handleCheckStuffList(v) {
            console.log('new stuff');
            const res = this.stuffNameList.filter(item => item.name === v);
            if (res.length > 0 && res[0].id >= 0) {
                this.stuff.name = res[0].name;
                this.stuff.type = res[0].type || '个';
                this.stuff.num = Number(res[0].amount);
                this.stuff.price = Number(res[0].unitPrice);
            }
        },
        handleSubmit() {
            if (this.stuffList.length > 0 && this.submitFlag === false) {
                this.submitFlag = true;
                const tempStuffList = [];
                for (let i = 0; i < this.stuffList.length; i++) {
                    tempStuffList.push({
                        name: this.stuffList[i].name,
                        type: this.stuffList[i].type,
                        quantity: this.stuffList[i].num,
                        unitPrice: Number(this.stuffList[i].price),
                        totalPrice: Number(this.stuffList[i].totalPrice),
                    });
                }
                this.$axios
                    .post('/stock/stuff', {
                        action: 'post',
                        settlementMethod: this.settlementMethod,
                        settlementCompany: this.settlementCompany,
                        date: this.date,
                        using: this.using,
                        stuffList: tempStuffList,
                    })
                    .then((res) => {
                        this.submitFlag = false;
                        console.log(res);
                        if (res.data.code === '2000') {
                            alert('入库成功');
                            this.stuffList = [];
                        } else {
                            alert('入库失败');
                        }
                    }).catch((err) => {
                        this.submitFlag = false;
                        console.log(`请求失败：${err}`);
                    });
            } else {
                alert('入库失败:不能提交空数据');
            }
        },
        handleAddTable() {
            this.stuffList.push({
                name: this.stuff.name,
                type: this.stuff.type,
                num: Number(this.stuff.num),
                price: Number(this.stuff.price),
                totalPrice: Number(this.stuff.price) * Number(this.stuff.num),
            });
        },
    },
});
export default Component;
</script>

<style lang="less">
.mr_t_20 {
    margin-top: 20px;
}
@print_offset_left:0px;
@print_offset_top:0px;
#printAdd {
    position:relative;
}
#printAdd p {
    position: absolute;
}
#print_settlementCompany {
    position: absolute;
    left: 135px + @print_offset_left;
    top: 27px + @print_offset_top
}
#print_settlementMethod {
    position: absolute;
    left: 135px + @print_offset_left;
    top: 50px + @print_offset_top;
}
#print_date0 {
    position: absolute;
    left: 400px + @print_offset_left;
    top: 50px + @print_offset_top;
}
#print_date1 {
    position: absolute;
    left: 450px + @print_offset_left;
    top: 50px + @print_offset_top;
}
#print_date2 {
    position: absolute;
    left: 490px + @print_offset_left;
    top: 50px + @print_offset_top;
}
#print_shouliaobianhao {
    position: absolute;
    left: 670px + @print_offset_left;
    top: 27px + @print_offset_top;
}
#print_using {
    position: absolute;
    left: 670px + @print_offset_left;
    top: 50px + @print_offset_top;
}
</style>
