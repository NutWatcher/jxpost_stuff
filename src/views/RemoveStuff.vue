<template>
  <div class="add_stuff">
    <Form inline>
      <FormItem>
        <Select filterable placeholder="领料单位">
          <Option v-for="item in cityList" :key="item.value" :value="item.value">
            {{ item.label }}
          </Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select filterable placeholder="列账单位">
          <Option v-for="item in cityList" :key="item.value" :value="item.value">
            {{ item.label }}
          </Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select filterable placeholder="会计科目">
          <Option v-for="item in cityList" :key="item.value" :value="item.value">
            {{ item.label }}
          </Option>
        </Select>
      </FormItem>
      <FormItem>
        <DatePicker type="date" placeholder="日期" style="width: 200px" />
      </FormItem>
    </Form>
    <Table :columns="shopCart" :data="shopCartList" />
    <div>
      <Button type="primary" @click="handleSubmit('formInline')">
        出库
      </Button>
      <span>合计：200元</span>
    </div>
    <Divider orientation="center" />
    <div>
      <Select v-model="stuff.name" style="width:200px" filterable placeholder="物品名称" @on-change="handleGetStuff">
        <Option v-for="item in cityList" :key="item.value" :value="item.value">
          {{ item.label }}
        </Option>
      </Select>
      <Button type="primary" @click="handleSubmit('formInline')">
        搜索库存
      </Button>
    </div>
    <Table :columns="columns1" :data="stuffList" />
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
            data: [{
                name: 'New York',
                type: '盒',
                num: 18,
                price: 30,
            },
            {
                name: 'Sydney',
                type: '盒s',
                num: 10,
                price: 33,
            },
            ],
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
                render: (h, params) => h('InputNumber', {
                    props: {
                        max: 10,
                        min: 1,
                        value: params.row.number,
                    },
                    on: {
                        'on-change': (event) => {
                            console.log(event);
                            this.handleChangeCartNumber(params.row.id, event);
                        },
                    },
                }),
            },
            {
                title: '总价',
                key: 'totalPrice',
            },
            {
                title: 'Action',
                key: 'action',
                width: 150,
                align: 'center',
                render: h => h('div', [
                    h(
                        'Button', {
                            props: {
                                type: 'error',
                                size: 'small',
                            },
                            on: {
                                click: () => {
                                    alert(1);
                                },
                            },
                        },
                        '删除',
                    ),
                ]),
            },
            ],
            shopCartList: [{
                id: 3,
                name: '捆钞绳',
                price: '3元/个',
                number: '3',
                totalPrice: '9',
            },
            {
                id: 4,
                name: '捆钞绳',
                price: '2元/个',
                number: '5',
                totalPrice: '10',
            },
            {
                id: 5,
                name: '笔',
                price: '13元/盒',
                number: '1',
                totalPrice: '13',
            },
            ],
            stuff: {
                name: '',
                type: '',
                price: 0,
                num: 0,
            },
            cityList: [{
                value: 'New York',
                label: 'New York',
            },
            {
                value: 'London',
                label: 'London',
            },
            {
                value: 'Sydney',
                label: 'Sydney',
            },
            {
                value: 'Ottawa',
                label: 'Ottawa',
            },
            {
                value: 'Paris',
                label: 'Paris',
            },
            {
                value: 'Canberra',
                label: 'Canberra',
            },
            ],
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
            stuffList: [{
                name: 'John Brown',
                type: '盒',
                num: 18,
                price: 30,
            },
            {
                name: 'Joe Black',
                type: '捆',
                num: 30,
                price: 30,
            },
            ],
        };
    },
    methods: {
        handleChangeCartNumber(id) {
            console.log(id);
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
            alert(1);
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
</style>
