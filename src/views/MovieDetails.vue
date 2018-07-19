<template>
  <div class="container">
    <div class='scene'>
      <div class='screen'>
        <div class='movie'>
          <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/h8Gif.gif' alt=''>
        </div>
      </div>
      <div class='seats-container'>
        <div class='seats' v-for="(item, propertyName) in seats" :key="propertyName">
          <p>
            {{ propertyName }}
          </p>
          <span v-for="(seat, index) in item" :key="index+100" @click="takeSeat(propertyName, index)" :class="{available: seat, ordered: seat === 'ordered'}">
            {{ index + 1 }}
          </span>
        </div>
        <div class='order' v-if="order.length">
          <p>
            Выбранные места:
          </p>
          <p v-for="(item, index) in order" :key="index">
            Ряд: {{ item.row }},
            Место: {{ item.seat }}
          </p>
          <p>
            Стоимость заказа: {{ order.length * 100 }} ₽
          </p>
        </div>
        <div class='actions' v-if="order.length">
          <button class='btn' @click="onBuy">Купить</button>
          <button class='btn' @click="onCancel">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      seats: {
        1: [true, true, true, false, true, false, true, false, false, true],
        2: [true, true, true, true, true, false, true, false, false, true],
        3: [false, true, false, false, true, false, true, false, true, true],
        4: [true, false, true, false, true, true, true, false, false, true],
        5: [true, true, false, true, true, false, true, true, false, true],
        6: [true, true, true, false, true, false, true, false, false, true],
        7: [true, true, true, true, true, false, true, false, false, true],
        8: [false, true, false, false, true, false, true, false, true, true],
        9: [true, false, true, false, true, true, true, false, false, true],
        10: [true, true, false, true, true, false, true, true, false, true]
      },
      order: [],
      beforeEditCach: null
    }
  },
  created () {
    this.beforeEditCach = JSON.parse(JSON.stringify(this.seats))
  },
  methods: {
    takeSeat (propertyName, index) {
      if (this.seats[propertyName][index] || this.seats[propertyName][index] === 'ordered') {
        this.$set(this.seats[propertyName], index, 'ordered')
        if (this.order.length) {
          let temp = this.order.filter(item => {
            return item.seat === index + 1 && +item.row === +propertyName
          })
          if (temp.length) {
            let targetIndex = this.order.findIndex(item => item.row === temp[0].row && item.seat === temp[0].seat)
            this.order.splice(targetIndex, 1)
            this.seats[propertyName][index] = true
          } else {
            this.order.push({
              'row': propertyName,
              'seat': index + 1
            })
          }
        } else {
          this.order.push({
            'row': propertyName,
            'seat': index + 1
          })
        }
      }
    },
    onBuy () {
      this.order.forEach(item => {
        this.$set(this.seats[item.row], item.seat - 1, false)
        this.order = []
      })
    },
    onCancel () {
      this.seats = JSON.parse(JSON.stringify(this.beforeEditCach))
      this.order = []
    }
  }
}
</script>

<style lang="stylus">
  .screen
    margin-top -20%
    perspective 800px
  .movie
    border-radius 5px
    transform rotateX(-74deg) scale(0.7)
    transform-origin 50%
    box-shadow 0px 110px 290px 0px rgba(0, 0, 0, 0.29)

    img
      border-radius 5px
      width 100%

  .seats-container
    position relative
    margin-top -20%
    z-index 9

  .seats
    margin-bottom 20px
    height 50px
    display grid
    grid-template-columns repeat(auto-fit, minmax(50px, 1fr))
    grid-gap 20px

    p
      margin 0
      display flex
      align-items center

    span
      display flex
      justify-content center
      align-items center
      border 1px solid #000
      border-radius 3px
      cursor pointer
      background-color red
      color #fff
      pointer-events none
      cursor not-allowed

      &.available
        background-color green
        cursor pointer
        pointer-events auto

        &.ordered
          background-color yellow
          color #000

  .btn
    display inline-block
    font-weight 400
    text-align center
    white-space nowrap
    vertical-align middle
    user-select none
    border 1px solid
    padding .375rem .75rem
    font-size 1rem
    line-height 1.5
    border-radius .25rem
    color #007bff
    transition color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out
    background-color #ffffff
    cursor pointer
    outline none
    & + &
      margin-left 5px

</style>
