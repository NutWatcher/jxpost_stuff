<template>
  <div class="add_stuff">
    <Form inline>
      <FormItem>
        <Select v-model="form.name" filterable placeholder="物品名称"
                remote :remote-method="fetchStuffByName" :loading="loading1"
        >
          <Option v-for="(option, index) in stuffNameList" :key="index" :value="option.name">{{ option.name }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select v-model="form.recordType" filterable placeholder="记录类型">
          <Option v-for="item in recordTypeList" :key="item.id" :value="item.name">
            {{ item.name }}
          </Option>
        </Select>
      </FormItem>
      <FormItem>
        <DatePicker v-model="form.startDate" type="date" placeholder="开始日期" style="width: 200px" />
      </FormItem>
      <FormItem>
        <DatePicker v-model="form.endDate" type="date" placeholder="结束日期" style="width: 200px" />
      </FormItem>
      <br>
      <FormItem>
        <Input v-model="form.number" placeholder="单据编号" style="width: 200px" />
      </FormItem>
      <FormItem>
        <Select v-model="form.department" filterable placeholder="公司部门"
                remote :remote-method="fetchDepartmentList" :loading="loading1"
        >
          <Option v-for="(option, index) in departmentList"
                  :key="index" :value="option.id"
          >{{ option.name }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select v-model="form.settlementCompany" filterable placeholder="结算单位"
                remote :remote-method="fetchSettlementCompanyList" :loading="loading1"
        >
          <Option v-for="(option, index) in settlementCompanyList"
                  :key="index" :value="option.name"
          >{{ option.name }}</Option>
        </Select>
      </FormItem>
      <Button type="primary" @click="handleSubmit">
        查询
      </Button>
    </Form>
    <Table :columns="columns1" :data="stuffList" />
  </div>
</template>

<script>
// import {
//     Component,
//     Vue,
// } from 'vue-property-decorator';
import Vue from 'vue';

const Component = Vue.extend({
    components: {},
    data() {
        return {
            form: {
                name: '',
                recordType: '',
                date: '',
                number: '',
                department: '',
                settlementCompany: '',
            },
            submitFlag: false,
            loading1: false,
            stuffNameList: [],
            departmentList: [],
            settlementCompanyList: [],
            recordTypeList: [{ id: 1, name: '出库' }, { id: 2, name: '入库' }],
            stuff: {
                name: '',
                type: '',
                price: 0,
                num: 0,
            },
            columns1: [
                {
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
                {
                    title: '总价',
                    key: 'totalPrice',
                },
                {
                    title: '收料编号',
                    key: 'totalPrice',
                },
                {
                    title: '出库编号',
                    key: 'totalPrice',
                },
            ],
            stuffList: [],
        };
    },
    mounted() {
        console.log(111);
    },
    methods: {
        fetchStuffByName(query) {
            this.stuffNameList = [];
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
                            this.stuffNameList = res.data.stuffList;
                        } else {
                            alert('获取物品信息失败');
                        }
                    }).catch((err) => {
                        this.loading1 = false;
                        console.log(`请求失败：${err}`);
                    });
            }
        },
        fetchDepartmentList(query) {
            if (query !== '') {
                this.loading1 = true;
                this.$axios
                    .get('/stock/department', {
                        params: {
                            query: encodeURIComponent(query),
                            page: 0,
                            limit: 10,
                        },
                    })
                    .then((res) => {
                        this.loading1 = false;
                        if (res.data.code === '2000') {
                            this.departmentList = res.data.departmentList;
                        } else {
                            alert('获取部门信息失败');
                        }
                    }).catch((err) => {
                        this.loading1 = false;
                        console.log(`请求失败：${err}`);
                    });
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
        handleSubmit() {
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
                .get('/stock/record', {
                    params: {
                        ...this.form,
                        page: 0,
                        limit: 20,
                    },
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
        },
    },
});
export default Component;
</script>

<style lang="less">
.mr_t_20 {
  margin-top: 20px;
}
</style>
