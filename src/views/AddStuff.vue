<template>
  <div class="add_stuff">
    <Form inline>
      <FormItem>
        <Select filterable placeholder="结算单位">
          <Option v-for="item in cityList" :key="item.value" :value="item.value">
            {{ item.label }}
          </Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select filterable placeholder="结算方式">
          <Option v-for="item in cityList" :key="item.value" :value="item.value">
            {{ item.label }}
          </Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select filterable placeholder="器材用途">
          <Option v-for="item in cityList" :key="item.value" :value="item.value">
            {{ item.label }}
          </Option>
        </Select>
      </FormItem>
      <FormItem>
        <DatePicker type="date" placeholder="日期" style="width: 200px" />
      </FormItem>

      <br>
      <FormItem label="物品名称">
        <Select v-model="stuff.name" filterable placeholder="物品名称" @on-change="handleGetStuff">
          <Option v-for="item in cityList" :key="item.value" :value="item.value">
            {{ item.label }}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="单位">
        <Input v-model="stuff.type" placeholder="单位" />
      </FormItem>
      <FormItem label="数量">
        <InputNumber v-model="stuff.num" placeholder="数量">
          数量
        </InputNumber>
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
      <Button type="primary" @click="handleSubmit('formInline')">
        入库
      </Button>
    </div>
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
            data: [
                {
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
            stuff: {
                name: '',
                type: '',
                price: 0,
                num: 0,
            },
            cityList: [
                {
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
            ],
            stuffList: [
                {
                    name: 'John Brown',
                    type: '盒',
                    num: 18,
                    price: 30,
                },
                {
                    name: 'Joe Black',
                    type: '捆1',
                    num: 30,
                    price: 30,
                },
            ],
        };
    },
    methods: {
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
