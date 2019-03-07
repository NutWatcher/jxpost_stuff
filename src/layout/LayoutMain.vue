<style lang="less" scoped>
    .layout {
        height: 100%;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav {
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
</style>

<template>
  <div class="layout">
    <Layout :style="{height: '100%'}">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo" />
          <div class="layout-nav">
            <MenuItem name="4">
              <Icon type="ios-paper" />管理员
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-0" theme="light" width="auto" :open-names="['1']">
            <router-link to="/" class="route">
              <MenuItem name="1-0" @click.native="handleChangePage('主页')">
                主页
              </MenuItem>
            </router-link>
            <router-link to="/addstuff" class="route">
              <MenuItem name="11" @click.native="handleChangePage('物品入库')">
                物品入库
              </MenuItem>
            </router-link>
            <router-link to="/removestuff" class="route">
              <MenuItem name="12" @click.native="handleChangePage('物品出库')">
                物品出库
              </MenuItem>
            </router-link>
            <router-link to="/records" class="route">
              <MenuItem name="13" @click.native="handleChangePage('记录查询')">
                记录查询
              </MenuItem>
            </router-link>
            <router-link to="/reports" class="route">
              <MenuItem name="14" @click.native="handleChangePage('报表管理')">
                报表管理
              </MenuItem>
            </router-link>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px' }">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>{{ pageName }}</BreadcrumbItem>
          </Breadcrumb>
          <router-view />
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'LayoutMain',
    components: {},
    data() {
        return { pageName: '主页' };
    },
    methods: {
        handleChangePage(v) {
            this.pageName = v;
        },
    },
});
</script>

<style>
    .route {
        color: #515a6e;
    }
</style>
