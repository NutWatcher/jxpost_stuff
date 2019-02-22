<style scoped lang="less">
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
        <Menu
          mode="horizontal"
          theme="dark"
          active-name="1"
        >
          <div class="layout-logo" />
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate" />
              <router-link to="/about">
                Home
              </router-link>
              Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad" />
              Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics" />
              Item 3
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper" />
              Item 4
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider
          hide-trigger
          :style="{background: '#fff'}"
        >
          <Menu
            active-name="1-0"
            theme="light"
            width="auto"
            :open-names="['1']"
          >
            <router-link
              to="/"
              class="route"
            >
              <MenuItem name="1-0">
                主页
              </MenuItem>
            </router-link>
            <router-link
              to="/addstuff"
              class="route"
            >
              <MenuItem name="11">
                物品入库
              </MenuItem>
            </router-link>
            <router-link
              to="/removestuff"
              class="route"
            >
              <MenuItem name="12">
                物品出库
              </MenuItem>
            </router-link>

            <MenuItem name="13">
              <Icon type="ios-keypad" />参数管理
            </MenuItem>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics" />
                Item 3
              </template>
              <MenuItem name="3-1">
                Option 1
              </MenuItem>
              <MenuItem name="3-2">
                Option 2
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px' }">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <router-view />
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
    name: 'LayoutMain',
};

</script>

<style>
.route{
    color:#515a6e;
}
</style>
