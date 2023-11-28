<script setup lang='ts'>

</script>

<template>
  <div class="jjim-prod-container">
    <div class="container-title">찜한 상품</div>
    <div class="basket-top-button-container">
      <div class="top-button">전체 선택</div>
      <div class="top-button">선택 삭제</div>
      <div class="top-button">전체 삭제</div>
    </div>
    <div class="container-line"></div>
    <table>
      <col width="80px" />
      <col width="150px" />
      <col width="350px" />
      <col width="400px" />
      <tr class="wish-table-data1">
        <td class="left-margin">선택</td>
        <td class="left-align"></td>
        <td class="left-align">상품명</td>
        <td class="center-text">판매 가격</td>
      </tr>
      <tr class="wish-table-data2">
        <td class="left-margin">
          <input
            class="basket-checkbox"
            type="checkbox"
          />
        </td>
        <td class="left-align">
          <img
            class="basket-img"
            src="@/assets/images/prod-img.png"
            alt=""
          />
        </td>
        <td class="left-align">
          <div class="basket-column">
            <h1>상품명</h1>
          </div>
        </td>

        <td class="center-text">
          <span class="prod-price">판매 가격</span>
        </td>
      </tr>
      <tr class="wish-table-data2">
        <td class="left-margin">
          <input
            class="basket-checkbox"
            type="checkbox"
          />
        </td>
        <td class="left-align">
          <img
            class="basket-img"
            src="@/assets/images/prod-img.png"
            alt=""
          />
        </td>
        <td class="left-align">
          <div class="basket-column">
            <h1>상품명</h1>
          </div>
        </td>

        <td class="center-text">
          <span class="prod-price">판매 가격</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
@import "@/assets/css/wish.css";
</style>