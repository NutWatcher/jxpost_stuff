<template>
  <div class="add_stuff">
    <Form inline>
      <FormItem>
        <Select v-model="form.department" filterable placeholder="领料单位"
                remote :remote-method="fetchDepartmentList" :loading="loading1"
        >
          <Option v-for="(option, index) in departmentList"
                  :key="index" :value="option.id"
          >{{ option.name }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select v-model="form.accountDepartment" filterable placeholder="列账单位"
                remote :remote-method="fetchDepartmentList" :loading="loading1"
        >
          <Option v-for="(option, index) in departmentList"
                  :key="index" :value="option.id"
          >{{ option.name }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select v-model="form.financialType" filterable placeholder="会计科目"
                remote :remote-method="fetchFinancialTypeList" :loading="loading1"
        >
          <Option v-for="(option, index) in financialTypeList"
                  :key="index" :value="option.name"
          >{{ option.name }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <DatePicker v-model="form.date" type="date" placeholder="日期" style="width: 200px" />
      </FormItem>
    </Form>
    <Table :columns="shopCart" :data="shopCartList" />
    <div class="mr_t_20">
      <Button type="primary" @click="handleSubmit">
        出库
      </Button>
      <span class="mr_l_20">合计：200元</span>
    </div>
    <Divider orientation="center" />
    <div>
      <Select v-model="queryStuffName" style="width:200px" filterable placeholder="物品名称"
              remote :remote-method="fetchStuffByName" :loading="loading1"
      >
        <Option v-for="(option, index) in stuffNameList" :key="index" :value="option.name">{{ option.name }}</Option>
      </Select>
      <Button class="mr_l_20" type="primary" @click="handleGetStore">
        搜索库存
      </Button>
    </div>
    <Table class="mr_t_20" :columns="columns1" :data="stuffList" />
    <Modal v-model="V_modal" :title="M_title" @on-ok="addToShopCartList" @on-cancel="cancel">
      <span>加入数量：</span>
      <InputNumber v-model="M_value" :max="M_max" :min="M_min" />
    </Modal>
  </div>
</template>

<script lang="ts">
// import {
//     Component,
//     Vue,
// } from 'vue-property-decorator';
import Vue from 'vue';

const Component = Vue.extend({
    components: {},
    data() {
        return {
            loading1: false,
            submitFlag: false,
            form: {
                department: '',
                accountDepartment: '',
                financialType: '',
                date: '',
            },
            queryStuffName: '',
            stuffNameList: [],
            departmentList: [],
            accountDepartmentList: [],
            financialTypeList: [],
            T_stuff: {},
            M_title: '',
            V_modal: false,
            M_value: 1,
            M_max: 1,
            M_min: 0,
            shopCart: [{
                title: '物品名称',
                key: 'name',
            },
            {
                title: '单位/价格',
                key: 'price',
            },
            {
                title: '数量',
                key: 'number',
            },
            {
                title: '总价',
                key: 'totalPrice',
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
                align: 'center',
                render: (h, params) => h('div', [
                    h(
                        'Button', {
                            props: {
                                type: 'error',
                            },
                            on: {
                                click: () => {
                                    this.handleRemoveShopCartItem(params.row);
                                },
                            },
                        },
                        '删除',
                    ),
                ]),
            },
            ],
            stuff: {
                name: '',
                type: '',
                price: 0,
                num: 0,
            },
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
                key: 'showNum',
            },
            {
                title: '单价',
                key: 'price',
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
                align: 'center',
                render: (h, params) => h('div', [
                    h(
                        'Button', {
                            props: {
                                type: 'primary',
                            },
                            on: {
                                click: () => {
                                    this.handleChangeCartNumber(params.row);
                                },
                            },
                        },
                        '加入清单',
                    ),
                ]),
            },
            ],
            stuffList: [],
            shopCartList: [],
        };
    },
    mounted() {
        this.$axios
            .get('/stock/department', {
                params: {
                    query: '',
                    page: 0,
                    limit: 10,
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.code === '2000') {
                    this.stuffNameList = res.data.stuffList;
                } else {
                    alert('获取领料单位失败');
                }
            }).catch((err) => {
                console.log(`请求失败：${err}`);
            });
    },
    methods: {
        fetchFinancialTypeList(query) {
            this.financialTypeList = [{ name: query, id: -2 }];
            if (query === 'qqqqqqqq') {
                this.loading1 = true;
                this.$axios
                    .get('/stock/financialType', {
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
        handleGetStore() {
            this.loading1 = true;
            this.$axios
                .get('/stock/stuff', {
                    params: {
                        queryList: encodeURIComponent(JSON.stringify([{ name: 'name', value: this.queryStuffName }])),
                        page: 0,
                        limit: 10,
                    },
                })
                .then((res) => {
                    this.loading1 = false;
                    if (res.data.code === '2000') {
                        this.stuffList = [];
                        for (let i = 0; i < res.data.stuffList.length; i++) {
                            this.stuffList.push({
                                id: res.data.stuffList[i].id,
                                name: res.data.stuffList[i].name,
                                type: res.data.stuffList[i].type || '个',
                                num: Number(res.data.stuffList[i].amount),
                                showNum: Number(res.data.stuffList[i].amount),
                                price: Number(res.data.stuffList[i].unitPrice),
                            });
                        }
                        this.resetStuffListNumber();
                    } else {
                        alert('获取物品信息失败');
                    }
                }).catch((err) => {
                    this.loading1 = false;
                    console.log(`请求失败：${err}`);
                });
        },
        handleChangeCartNumber(stuff) {
            this.T_stuff = stuff;
            this.V_modal = true;
            this.M_title = stuff.name;
            this.M_max = stuff.showNum;
        },
        addToShopCartList() {
            const tempStuff = this.shopCartList.filter(item => item.id === this.T_stuff.id);
            if (tempStuff.length > 0) {
                tempStuff[0].number += this.M_value;
                tempStuff[0].totalPrice = tempStuff[0].number * this.T_stuff.price;
            } else {
                this.shopCartList.push({
                    id: this.T_stuff.id,
                    name: this.T_stuff.name,
                    price: `${this.T_stuff.price}元/${this.T_stuff.type}`,
                    number: this.M_value,
                    totalPrice: this.M_value * this.T_stuff.price,
                });
            }
            this.resetStuffListNumber();
        },
        handleRemoveShopCartItem(rows) {
            console.log(rows);
            this.shopCartList = this.shopCartList.filter(item => item.id !== rows.id);
            this.resetStuffListNumber();
        },
        cancel() {
        },
        resetStuffListNumber() {
            for (let i = 0; i < this.stuffList.length; i++) {
                this.stuffList[i].showNum = this.stuffList[i].num;
                for (let j = 0; j < this.shopCartList.length; j++) {
                    if (this.stuffList[i].id === this.shopCartList[j].id) {
                        this.stuffList[i].showNum = this.stuffList[i].num - this.shopCartList[j].number;
                    }
                }
            }
        },
        handleGetStuff(v) {
            const res = this.data.filter(item => item.name === v);
            if (res.length > 0) {
                this.stuff.name = res[0].name;
                this.stuff.type = res[0].type;
                this.stuff.num = res[0].num;
                this.stuff.price = res[0].price;
            }
        },
        handleSubmit() {
            if (this.shopCartList.length > 0 && this.submitFlag === false) {
                this.submitFlag = true;
                const tempStuffList = [];
                for (let i = 0; i < this.shopCartList.length; i++) {
                    tempStuffList.push({
                        id: this.shopCartList[i].id,
                        quantity: this.shopCartList[i].number,
                    });
                }
                this.$axios
                    .post('/stock/stuff', {
                        action: 'remove',
                        accountDepartmentId: this.form.accountDepartment,
                        departmentId: this.form.department,
                        financialType: this.form.financialType,
                        date: this.form.date,
                        stuffList: tempStuffList,
                    })
                    .then((res) => {
                        this.submitFlag = false;
                        console.log(res);
                        if (res.data.code === '2000') {
                            alert('出库成功');
                            this.shopCartList = [];
                            this.stuffList = [];
                        } else {
                            alert('出库失败');
                        }
                    }).catch((err) => {
                        this.submitFlag = false;
                        console.log(`请求失败：${err}`);
                    });
            } else {
                alert('出库失败:不能提交空数据');
            }
        },
        handleAddTable() {
            console.log(this.stuff);
            console.log(Number(this.stuff.num));
            this.stuffList.push({
                name: this.stuff.name,
                type: this.stuff.type,
                num: Number(this.stuff.num),
                price: Number(this.stuff.price),
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
    .mr_l_20 {
        margin-left: 20px;
    }
</style>
