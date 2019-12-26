<template>
  <div class="_map">
    <a-tag
      v-if="address?true:false"
      style="margin-bottom:10px;max-width:377px;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;">{{ address }}</a-tag><a-icon v-if="message&&address" type="check" style="float:right;margin-top:5px;cursor:pointer" @click="show"/>
    <div class="amap-page-container">
      <el-amap-search-box
        class="search-box"
        :search-option="searchOption"
        :on-search-result="onSearchResult"
      ></el-amap-search-box>
      <el-amap
        ref="map"
        vid="amapDemo"
        :plugin="plugin"
        :zoom="zoom"
        :center="center"
        class="amap-demo"
        :events="events"
      >
        <el-amap-marker
          vid="component-marker"
          :position="makerConf.position"
          :content="makerConf.content"
        ></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

  <style>
.amap-page-container {
  height: 300px;
  position: relative;
}
.search-box {
  position: absolute !important;
  top: 25px;
  left: 20px;
  z-index: 200 !important;
}
.amap-demo {
  height: 300px;
}
.amap-logo {
  display: none;
}
.amap-copyright {
  bottom: -100px;
  display: none;
}
.amap-scalecontrol {
  bottom: 4px !important;
}
.amap-geolocation-con {
  bottom: 30px !important;
  z-index: 199 !important;
}
ul li.active {
  color: deeppink;
}
</style>

<script>
export default {
  name: 'Amap',
  components: {},
  props: ['address', 'message'],
  data () {
    var me = this
    return {
      list: [],
      currIndex: 0,
      zoom: 16,
      center: [114.397169, 30.50576],
      events: {
        init: o => {
          o.setCity(me.city, result => {
            console.log('----------setCity', result)
            if (result && result.length > 0) {
              me.zoom = 16
              me.makerConf.position = result
              me.getList(result)
            }
          })
          // 去掉logo
          document.getElementsByClassName('amap-logo')[0].style.display = 'none'
        },
        dragend: function (e) {
          // console.log("dragging",e,this.getCenter());
          var point = this.getCenter()
          var pos = [point.lng, point.lat]
          me.makerConf.position = [point.lng, point.lat]
          me.getList(pos)
        },
        click (e) {
          const { lng, lat } = e.lnglat
          me.lng = lng
          me.lat = lat

          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                me.address = result.regeocode.formattedAddress
                me.$emit('fun', me.address)
                me.$nextTick()
              }
            }
          })
        } },
      lng: 0,
      lat: 0,
      makerConf: {
        position: [114.397169, 30.50576],
        content: ''
      },
      searchOption: {
        city: me.city,
        citylimit: true
      },
      plugin: [
        'ToolBar',
        'Scale',
        {
          pName: 'Geolocation',
          events: {
            init (o) {},
            complete: function (result) {
              // 定位成功
              var address = result.formattedAddress
              var point = result.position
              var obj = {
                address: address,
                name: '',
                location: point
              }
              me.list = [obj]
              me.makerConf.position = [point.lng, point.lat]
            },
            error: function () {}
          }
        }
      ]
    }
  },
  created () {
    var me = this
  },
  mounted () {},
  methods: {
    show () { this.$emit('ok', this.address) },
    select: function (item, index) {
      var me = this
      me.currIndex = index
      var point = item.location
      me.makerConf.position = [point.lng, point.lat]
      me.center = [point.lng, point.lat]
    },
    // this.$refs.map.$$getCenter()
    getList: function (result) {
      // 获取列表
      var me = this
      me.$Geocoder({
        lnglatXY: result,
        success: function (res) {
          if (res.regeocode && res.regeocode.pois) {
            me.list = res.regeocode.pois
          } else {
            me.list = []
          }
        },
        error: function (res) {
          me.list = []
        }
      })
    },
    onSearchResult (pois) {
      // 搜索
      const latSum = 0
      const lngSum = 0
      var me = this

      var mymap = me.$refs.map.$$getInstance()

      if (pois && pois.length > 0) {
        // 如果长度为1则无需转化
        var poi = pois[0]
        var lng = poi['lng']
        var lat = poi['lat']
        me.center = [lng, lat]
        me.makerConf.position = [lng, lat]
        // me.makerConf.content = poi.name;
        me.list = pois
      } else {
        me.list = []
      }
    },

    $Geocoder (options) {
      // 将坐标点转化为，详细地址
      options = options || {}
      if (AMap) {
        AMap.plugin(['AMap.Geocoder'], () => {
          const geocoder = new AMap.Geocoder({
            radius: options.radius || 1000,
            extensions: options.extensions || 'all'
          })
          var lnglatXY = options.lnglatXY || [114.397169, 30.50576] // 已知点坐标
          geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              options.success && options.success(result)
            } else {
              options.error && options.error(status, result)
            }
          })
        })
      }
    }
  },
  watch: {
    list: function () {
      this.currIndex = 0
    }
  }
}

/*
      me.$Geocoder({
                    lnglatXY:[center.lng, center.lat],
                    success:function(res){
                        console.log(res);
                    }
        });
     *
     * */
</script>
